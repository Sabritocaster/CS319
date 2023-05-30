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




export default function Done() {
    const [done,setDone] = useState()

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
            
          }
        
        getDone()
        
        
    },[])
    
    return (
      <>
      <div className="flex justify-center text-xl font-bold mb-5">
      <p>Completed Evaluations</p>
      </div>
     
     <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center xl:mx-40">
                {done?.map((data) => {
                return(
                <div key={data.uid} className="rounded-xl w-72 h-44 shadow-2xl m-7 flex flex-col items-center justify-evenly p-5 border-menuvar-400 border-2">
                    <p>Student Name: {data.name}</p>
                    <p>Department: {data.department}</p>
                    <p>Role: {data.type}</p>
                    <p>Grade: {data.grade}</p>
                </div>)})}
            </div>
       
        
      
      </>
    )
  }
  