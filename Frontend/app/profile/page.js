'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image"
import logOut from "@/firebase/auth/logout";
import { useState } from "react";
import { storage } from "@/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import View from '@/components/view';
import Process from '@/components/process';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { getStorage } from "@firebase/storage";


export default function Profile() {
    const { user } = useAuthContext()
    const router = useRouter()
    const [url,setUrl] = useState()
    const [data,setData] = useState()
    //Logout starts
    const handleClick = async (event) => {
        event.preventDefault()

        const { result, error } = await logOut();

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/auth")
    }
    //Logout Ends

    React.useEffect(() => {
        if (user == null) router.push("/auth")
    }, [user])

    React.useEffect(() => {
        const getData = async (key) => {
            const docRef = doc(db, "Users", key);
            const docSnap = await getDoc(docRef);  
            setData(docSnap.data())
        }
        if(user!=null) {
            getData(user.uid)
            const storage = getStorage();
            const starsRef = ref(storage, '/files/'+user.uid);
            var docURL;

            // Get the download URL
            getDownloadURL(starsRef)
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'
                //console.log(url)
                setUrl(url)
                
            })
        }
        
    }, [])


    //Storage
    const [file, setFile] = useState("");
 
    // progress
    const [percent, setPercent] = useState(0);
 
    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }
 
    const handleUpload = () => {
        if (!file) {
            alert("Please upload a file first!");
        }
        else {
        const storageRef = ref(storage, `/files/${user.uid}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUrl(url)
                });
            }
        );
        }
    };






    return (
      <>
        <div className="flex flex-col lg:flex-row justify-evenly items-center m-5 mb-20">
            <div className="avatar">
                <div className="rounded bg-slate-400">
                    <Image src="/images/bilkent_logo.png"
                        alt="Avatar"
                        width={175}
                        height={175}
                        priority />
                </div>
            </div>
            <div className="flex flex-col">
                <p>Student Name: {data?.name}</p>
                <p>Internship Place:</p>
                <div className="flex items-center">
                    <p>Evaluation Process: </p>
                    <Process process={data?.process}/>
                </div>

            </div>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-evenly items-center m-5">
            <div className="flex flex-col items-center lg:w-1/2">
                <p>Upload Internship Report</p>
                <input type="file" onChange={handleChange} className="file-input file-input-bordered w-full max-w-xs" />
                <div>
                    <button onClick={handleUpload} className="btn m-5">Confirm</button>
                    <p>{percent} "% done"</p>
                </div>
                
            </div>
            <View url={url}/>
        </div>
        <btn onClick={handleClick} className="btn">Log out</btn>
      
      </>
    )
  }
  