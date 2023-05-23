'use client';
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import {doc, getDoc, updateDoc} from "@firebase/firestore"
import { getStorage, ref, getDownloadURL  } from "@firebase/storage";
import { useForm } from "react-hook-form";


export default function Evaluate({params}) {


    const { user } = useAuthContext()
    const router = useRouter()
    const [data,setData] = useState()
    const [url, setUrl] = useState()
    
    const { register, handleSubmit } = useForm();




    React.useEffect(() => {
        if (user == null) router.push("/auth")
        else {
        const storage = getStorage();
        const starsRef = ref(storage, '/files/'+params.evaluate);

        // Get the download URL
        getDownloadURL(starsRef)
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            //console.log(url)
            setUrl(url)
        
        })
        }
    }, [user])
 
    const onSubmit = async (value) => {
        const docRef = await updateDoc(doc(db, "Users", params.evaluate), {
            process:1, //0-initial 1-both reports uploaded, 2-preevaluated, 3-evaluated, 4-done
            studentGrade:value.student,
            internGrade:value.intern,
            feedback1:value.feedback,
          });

        alert("Submission Success")

    }



    
    useEffect(() => {
        const getData = async () => {
            const docRef = doc(db, "Users", params.evaluate);
            const docSnap = await getDoc(docRef);
            setData(docSnap.data())

        }
        if(user != null) {
            getData()
        }
            
        
    },[])
    return (
      <>
      <div className="m-10 mb-0">
            <p>Student Name: {data?.name}</p>
            <p>Company Name:</p>
        </div>
      <div className="flex flex-col lg:flex-row-reverse"> 

        <div className="lg:w-1/3 flex flex-col items-center mt-10">
            <div className="flex flex-col items-center my-5">
                <p>Student Internship Report</p>
                <a href={url} target="_blank"><button className="btn m-2">View</button></a>
            </div>
            <div className="flex flex-col items-center my-5">
                <p>Company Internship Report</p>
                <button className="btn m-2">View</button>
            </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="lg:w-2/3 shadow-xl bg-cumrep-100 rounded-xl flex flex-col items-center p-5 m-10 lg:mr-0">
            
            <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Student Internship Report</span>
                </label>
                <label className="input-group">
                    <span>Grade</span>
                    <input {...register("student")} type="number" max="10" id="student" placeholder={data?.studentGrade} className="input input-bordered w-14" />
                    <span>/10</span>
                </label>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Company Internship Report</span>
                </label>
                <label className="input-group">
                    <span>Grade</span>
                    <input {...register("intern")} type="number" max="10" id="company" placeholder={data?.internGrade} className="input input-bordered w-14" />
                    <span>/10</span>
                </label>
            </div>
            </div>

            <textarea {...register("feedback")} className="textarea textarea-bordered mt-5" placeholder={data?.feedback1}></textarea>

            <button type="submit" className="btn">Submit</button>

        </form>

      </div>
      
      </>
    )
  }
  