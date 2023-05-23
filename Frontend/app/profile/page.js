'use client'
import React from "react";
import Image from "next/image"
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import {doc, getDoc} from "@firebase/firestore"
import { getStorage, ref,uploadBytesResumable, getDownloadURL  } from "@firebase/storage";
import { storage } from "@/firebase/config";
import View from "@/components/view";
import Process from "@/components/process";

export default function Profile() {
    
    const { user } = useAuthContext()
    const router = useRouter()
    const [data,setData] = useState()
    const [url, setUrl] = useState()

    const[isVisible,setVisible] = useState(false)
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    // Handles input change event and updates state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }
    function handleUpload() {
        if (!file) {
            alert("Please choose a file first!")
        }
        else {
        setVisible(true)
        const storageRef = ref(storage, `/files/${user.uid}`)
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
                            
                        });
                    }
                ); 
            window.location.reload(false)
    }
    }

    React.useEffect(() => {
        if (user == null) router.push("/auth")
        

    }, [user])

    React.useEffect(() => {
        if (user != null) {
        const storage = getStorage();
        const starsRef = ref(storage, '/files/'+user.uid);

        // Get the download URL
        getDownloadURL(starsRef)
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            //console.log(url)
            setUrl(url)
        
        })
        }

    }, [url])
 


    
    useEffect(() => {
        const getData = async () => {
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data())
            setData(docSnap.data())

        }
        if(user != null) {
            getData()
        }
            
        
    },[])

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
                    {isVisible &&(<p>{percent == 100 ? "Upload Successful": (percent+"% Done") }</p>)} 
                    <button onClick={handleUpload} className="btn m-5">Upload</button>
                </div>
                
            </div>
            <View url={url}/>
        </div>
      
      </>
    )
  }

