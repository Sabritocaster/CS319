'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image"
import logOut from "@/firebase/auth/logout";
import { useState, useEffect } from "react";
import { storage } from "@/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import View from '@/components/view';
import Process from '@/components/process';
import { doc, getDoc, getDocs,collection, query ,where} from "firebase/firestore";
import { db } from "@/firebase/config";
import autoAssign from "@/script/autoassign";
import addReport from "@/script/addReport";
import getSub from "@/script/getsub";
import Done from "@/components/done";
//!url = url.length = 0 = data?.process =0
export default function Profile() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [docdata,setDocdata] = useState()
    const [done, setDone] = useState([])


    const { user } = useAuthContext()
    const router = useRouter()
    const [url,setUrl] = useState([])
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
        return router.push("/")
    }
    //Logout Ends

    

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    React.useEffect(() => {
        const getData = async (key) => {
            const docRef = doc(db, "Users", key);
            const docSnap = await getDoc(docRef);  
            setData(docSnap.data())
        }
        
        if(user!=null) {
            getData(user.uid)
            getSub(setUrl,user.uid)
            
        }
        
    }, [])

    React.useEffect(() => {
      
        const getDone = async () => {
            var docs = [];
            //var q;
    
              const q = query(collection(db, "Users"), where("type", "==", "Student"),where("process", "==", 3))
              const querySnapshot = await getDocs(q); //process: 0 no file uploads, 1 all files uploaded, 2 preevaluated, 3 evaluated, 4 done       
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                docs.push(doc.data())
              });
              setDone(docs)
              console.log(docs)
            
          }
        
        if(user!=null) {
            if(data?.type == "Department Secretary") {               
                getDone()
                }
            
        }
        
    },[])

    //Storage
    const [file, setFile] = useState("");
 
    // progress
    const [percent, setPercent] = useState(0);
 
    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    
        setSelectedFile(file);

    }

    
 
    const handleUpload = () => {
        if (!file) {
            alert("Please upload a file first!");
            setFileUploaded(false);
        }
        else {
        const storageRef = ref(storage, `/files/${user.uid}/${(new Date()).getTime()}`);
        
        setFileUploaded(true);
 
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
                    //const docRef = doc(db, "Users", user.uid, "Documents", user.uid);
                    addReport(user.uid,url)
                    getSub(setUrl,user.uid)
                });
            }
        );
        autoAssign(user.uid)
        }
    };
    console.log(done)
    return (
      <>
        <div className="flex flex-col lg:flex-row justify-evenly items-center m-5 mb-20">
            <div className="avatar">
                <div className="rounded">
                    <Image src="/images/bilkent_logo.png"
                        alt="Avatar"
                        width={150}
                        height={150}
                        priority />

                </div>
            </div>

            <div className="flex flex-col">
                <p>Name: {data?.name}</p>
                <p>Role: {data?.type}</p>
                {data?.type == "Student" && (<div className="flex items-center">
                    <p>Evaluation Process: </p>
                    <Process process={data?.process}/>
                </div>)}
                {data?.type != "Student" && (<div className="flex items-center">
                    <p>Total Assigned Documents: </p>
                    { data?.assigned_reports.length}
                </div>)}

            </div>
        </div>
        
        {data?.type=="Student" && (<div className="flex flex-col lg:flex-row justify-evenly items-center m-5">
            { url.length > 0 && (<View url={url} setDocdata={setDocdata} type={data?.type}/>)}
            <div className="flex flex-col items-center">
            { url.length >0 && <p className="bg-green-600 p-3 text-white font-medium rounded-lg" >You already submitted your document</p>}
            {url.length==0 && <p className="p-3 bg-red-500 text-white rounded-lg" >No file uploaded yet.</p>}
                { !url && <p className="m-3">Upload Internship Report</p> }
                <div>
                    {url.length==0 && <p className="m-2"> You can upload your document below </p>}
                    {url.length>0 && <p className="m-2"> You can reupload your document below </p>}
                    {url.length==0 &&<input type="file" accept="application/pdf" onChange={handleChange} className="file-input file-input-bordered w-full max-w-xs" /> }
                    {url.length>0 &&<input type="file" accept="application/pdf" onChange={handleChange} className="file-input file-input-bordered w-full max-w-xs" /> }
                </div>

                <div className="flex flex-col items-center">
                    <button onClick={handleUpload} className="btn m-5">Confirm</button>
                    { url.length==0 && percent!=0 && <p > %{percent} Done</p> }

                    {(percent === 100) && fileUploaded && <div className="alert alert-success shadow-lg text-white bg-green-400">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>File uploaded successfully</span>
                                    </div>
                                    </div>}
                    
                </div>
            </div>

            
                
                
        </div>)}

        {data?.type == "Department Secretary" &&(<Done/>)}

        
      
      </>
    )
  }
  