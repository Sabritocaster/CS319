'use client'
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { getStorage } from "@firebase/storage";
import View from "@/components/view";
import { useForm } from "react-hook-form";


export default function Evaluate({params}) {
    const { user } = useAuthContext()
    const router = useRouter()
    const [data,setData] = useState([])
    const [url,setUrl] = useState()
    const { register, handleSubmit } = useForm();


   
    useEffect(() => {
        if (user == null) router.push("/auth")
    }, [user])

    useEffect(() => {
        const getData = async (key) => {
            const docRef = doc(db, "Users", params.evaluate);
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

    const handleForm = async (value) => {
        const ref = doc(db, "Users", params.evaluate);

        // Set the "capital" field of the city 'DC'
        await updateDoc(ref, {
        internGrade: value.internGrade,
        studentGrade: value.studentGrade,
        feedback1: value.feedback
        });

        alert("Grades Submitted")
        
    }

    return (
      <>
      <div className="m-10 mb-0">
            <p>Student Name:{data.name}</p>
            <p>Company Name:</p>
        </div>
      <div className="flex flex-col lg:flex-row-reverse"> 

        <div className="lg:w-1/3 flex flex-col items-center mt-10">
            <View url={url}/>
            <div className="flex flex-col items-center my-5">
                <p>Company Internship Report</p>
                <button className="btn m-2">View</button>
            </div>
        </div>

        <form onSubmit={handleSubmit((value) => handleForm(value))} className="lg:w-2/3 bg-menuvar-200 rounded-xl flex flex-col items-center p-5 m-10 lg:mr-0">
            
            <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Student Internship Report</span>
                </label>
                <label className="input-group">
                    <span>Grade</span>
                    <input {...register("studentGrade")} type="number" max={10} id="student" placeholder="" className="input input-bordered w-14" />
                    <span>/10</span>
                </label>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Company Internship Report</span>
                </label>
                <label className="input-group">
                    <span>Grade</span>
                    <input {...register("internGrade")} type="number" max={10} id="company" placeholder="" className="input input-bordered w-14" />
                    <span>/10</span>
                </label>
            </div>
            </div>

            <textarea {...register("feedback")} className="textarea textarea-bordered mt-5" placeholder="Your Feedback"></textarea>

            <p className="mt-5 mb-2">Overall Grade:</p>
            <button type="submit" className="btn">Submit</button>

        </form>

      </div>
      
      </>
    )
  }
  