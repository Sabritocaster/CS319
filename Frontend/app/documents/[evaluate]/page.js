'use client' 
import { useAuthContext } from "@/context/AuthContext"; 
import { useRouter } from "next/navigation"; 
import { useState, useEffect } from "react"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { doc, getDoc, updateDoc,arrayRemove } from "firebase/firestore"; 
import { db } from "@/firebase/config"; 
import { storage } from "@/firebase/config"; 
import getSub from "@/script/getsub";
import autoAssign from "@/script/autoassign"; 
import { getStorage } from "@firebase/storage"; 
import View from "@/components/view"; 
import { useForm } from "react-hook-form"; 
import updateReport from "@/script/updateReport";
 
 
export default function Evaluate({params}) { 
    //Storage 
    const [file, setFile] = useState(""); 
 
    const [percent, setPercent] = useState(0); 
 
 
    const { user } = useAuthContext() 
    const router = useRouter() 
    const [data,setData] = useState([]) 
    const [url,setUrl] = useState() 
    const { register, handleSubmit, setValue } = useForm(); 
    const [type,setType] = useState() 
    const [feed, setFeed] = useState()
    const [docdata,setDocdata] = useState()
 
    
    useEffect(() => { 
        if (user == null) router.push("/") 

    }, [user]) 
 
    useEffect(() => { 
        const getData = async () => { 
            const docRef = doc(db, "Users", params.evaluate); 
            const docSnap = await getDoc(docRef);   
            setData(docSnap.data()) 
        } 
        const getType = async (key) => { 
            const docRef = doc(db, "Users", key); 
            const docSnap = await getDoc(docRef);   
            setType(docSnap.data()) 
        } 
        if(user!=null) { 
            getData() 
            getType(user.uid) 
            getSub(setUrl,params.evaluate)
        } 
         
    }, []) 
 
    const handleForm = async (value) => { 
        const ref = doc(db, "Users", params.evaluate); 
        // Set the "capital" field of the city 'DC' 
        handleUpload()
        if(type.type=="Teaching Assistant") { 
            

            await updateDoc(ref, { 
                process:value.process 
                }); 
                console.log(feed)
                updateReport(params.evaluate,feed,"Teaching Assistant",docdata,value?.feedback)

                if(value.process==1) {
                    alert("Feedback Submitted") 
                }
                else {

                    const userRef = doc(db, "Users", user.uid);
                    await updateDoc(userRef, {
                        assigned_reports: arrayRemove(params.evaluate),
                        process:2
                    });
                    alert("File Accepted") 
                    router.push("/documents")
                }

        } 
        else if(type.type=="Evaluator") { 
            await updateDoc(ref, { 
                process:value.process 
                }); 
                console.log(feed)
                updateReport(params.evaluate,feed,"Evaluator",docdata,value?.feedback)

                if(value.process==2) {
                    alert("Feedback Submitted") 
                }
                else {

                    const userRef = doc(db, "Users", user.uid);
                    await updateDoc(userRef, {
                        assigned_reports: arrayRemove(params.evaluate),
                        process:3
                    });
                    alert("Student Graded") 
                    router.push("/documents")
                }
                
 
        } 
 
    } 
 
    // Handle file upload event and update state 
    function handleChange(event) { 
        setFile(event.target.files[0]); 
    } 
         
    const handleUpload = () => { 
        if (!file) { 
            alert("Please upload a file first!"); 
        } 
         
        else { 
            const storageRef = ref(storage, `/files/${params.evaluate}/${(new Date()).getTime()}`); 
                 
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
                        setFeed(url) 
                    }); 
                } 
                ); 
                if(type=="Student") {autoAssign(user.uid)}
        } 
         
    }; 
 
 
    return ( 
      <> 
      <div className="m-10 mb-0"> 
            <p>Student Name:{data.name}</p> 
            <p>Email:{data.email}</p> 
        </div> 
      <div className="flex flex-col lg:flex-row-reverse justify-around">  
 
        <div className=" flex flex-col items-center mt-10"> 
            {url && (<View url={url} setDocdata={setDocdata} type={type}/> )}
            <div className="flex flex-col items-center my-5"> 
                <p>Company Internship Report</p> 
                <button className="btn m-2">View</button> 
            </div> 
        </div> 
 
        {type?.type=="Evaluator" &&( 
            <form onSubmit={handleSubmit((value) => handleForm(value))} className=" border-menuvar-400 border-2 rounded-xl flex flex-col items-center p-5 m-10 lg:mr-0"> 
                        
                <div> 
                    
                        </div> 
                        <p>Finalization</p> 

                        <textarea {...register("feedback")} className="textarea textarea-bordered mt-5 bg-menuvar-200" cols={30} rows={10} placeholder="Final Comments"></textarea> 
                        <div className="flex flex-col justify-center items-center "> 
                            <p className="text-center items-center">Upload Feedback</p> 
                            <input type="file" onChange={handleChange} className="file-input file-input-bordered w-full max-w-xs" /> 
                            <div> 
                            <p className="text-center items-center"> {percent}% </p> 
                            {percent===100 &&( 
                                <p className="text-center items-center">File is Uploaded</p> 
                            )} 

                        </div> 
                    </div> 
                        
                        <div className="flex p-4 space-x-6"> 
                            <button {...register("process")} onClick={()=> setValue("process", 2)} onSubmit={handleSubmit((value) =>handleForm(value))} type='submit' className="btn">Decline</button> 
                            <button {...register("process")} onClick={()=> setValue("process", 3)} onSubmit={handleSubmit((value) => handleForm(value))} type="submit" className="btn">Accept</button> 
                        </div> 
                        

            </form>
 
        )} 
 
 
        {type?.type=="Teaching Assistant" &&( 
 
             
            <form onSubmit={handleSubmit((value) => handleForm(value))} className=" border-menuvar-400 border-2 rounded-xl flex flex-col items-center p-5 m-10 lg:mr-0"> 
                     
                <div> 
                     
                        </div> 
                        <p>Feedback</p> 
 
                        <textarea {...register("feedback")} className="textarea textarea-bordered mt-5 bg-menuvar-200" cols={30} rows={10} placeholder="Final Comments"></textarea> 
                        <div className="flex flex-col justify-center items-center "> 
                            <p className="text-center items-center">Upload Feedback</p> 
                            <input type="file" onChange={handleChange} className="file-input file-input-bordered w-full max-w-xs" /> 
                            <div> 
                            <p className="text-center items-center"> {percent}% </p> 
                            {percent===100 &&( 
                                <p className="text-center items-center">File is Uploaded</p> 
                            )} 
 
                        </div> 
                     </div> 
                         
                        <div className="flex p-4 space-x-6"> 
                            <button {...register("process")} onClick={()=> setValue("process", 1)} onSubmit={handleSubmit((value) =>handleForm(value))} type='submit' className="btn">Decline</button> 
                            <button {...register("process")} onClick={()=> setValue("process", 2)} onSubmit={handleSubmit((value) => handleForm(value))} type="submit" className="btn">Accept</button> 
                        </div> 
                         
 
            </form> 
                     
                )} 
         
         
      
      </div> 
      </> 
    ) 
  } 