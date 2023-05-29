'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { doc, getDocs,collection,where,query } from "firebase/firestore";
import { db } from "@/firebase/config";
import {  updateDoc, arrayUnion } from "firebase/firestore";



export default function Assign() {


    const { user } = useAuthContext()
    const router = useRouter()
    const [students,setStudents] = useState()
    const [evaluators,setEvaluators] = useState()
    const [select,setSelected] = useState([])
    const [evalu,setEval] = useState()

    const handleClick = (element) => {
      setSelected(select => select.includes(element) ? select.filter(n => n !== element) : [element, ...select])
      
    }

    const handleAssign = () => {
      const ref = doc(db, "Users", evalu?.uid);

      // Atomically add a new region to the "regions" array field.
      select.forEach(myFunction);

      async function myFunction(value) {
        await updateDoc(ref, {
          assigned_reports: arrayUnion(value?.uid)

      });

      const reff = doc(db, "Users", value?.uid);

        await updateDoc(reff, {
          isAssigned2:true
      });
      }
      getStudents()
      alert("Assigned succesfully")
    
    }



    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    const getStudents = async () => {
      var docs = [];
      //var q;
        const q = query(collection(db, "Users"), where("type", "==", "Student"),where("process", "==", 2),where("isAssigned2", "==", false)); 
        const querySnapshot = await getDocs(q); //process: 0 no file uploads, 1 all files uploaded, 2 preevaluated, 3 evaluated, 4 done       
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          docs.push(doc.data())
        });
        setStudents(docs)

    }

    const getEvaluators = async () => {
      var docs = [];
      //var q;
        const q = query(collection(db, "Users"), where("type", "==", "Evaluator")); 
        const querySnapshot = await getDocs(q); //process: 0 no file uploads, 1 all files uploaded, 2 preevaluated, 3 evaluated, 4 done       
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          docs.push(doc.data())
        });
        setEvaluators(docs)

    }

    React.useEffect(() => {
      getStudents()
      getEvaluators()

      }, [])

    return (
      <>
     
        
        <div className="flex flex-col lg:flex-col justify-between items-center m-5">
        
        
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-col items-center lg:mr-10">
                  <p className="font-bold m-5">Students {" ("+students?.length+")"}</p>
                  <div className="h-80 w-64 lg:w-96 bg-menuvar-200 rounded-lg border-2 border-menuvar-600 overflow-scroll p-2 mb-2">
                      {students?.map((data) => {
                        var container
                        if(select.includes(data)) {
                          container = (
                              <div key={data?.uid} onClick={()=> handleClick(data)} className="w-full relative flex flex-col bg-white border-2 border-menuvar-300 rounded-xl my-3 shadow-lg items-center justify-evenly p-4 transition-all hover:cursor-pointer">
                              <p>Name: {data?.name}</p>
                              <p>Department: {data?.department}</p>
                          </div>
                          )
                        }
                        else {
                          container = (
                            <div key={data?.uid} onClick={()=> handleClick(data)} className="w-full relative flex flex-col bg-white border-2 border-menuvar-100 rounded-xl my-3 shadow-lg items-center justify-evenly p-4 transition-all hover:cursor-pointer">
                            <p>Name: {data?.name}</p>
                            <p>Department: {data?.department}</p>
                        </div>
                        )
                        }
                        return(
                        container
                        )})}
                  </div>
                  <p>Selected {select.length} students</p>
              </div>
                
              <div className="flex flex-col items-center lg:mr-10">
                  <p className="font-bold m-5">Evaluators {" ("+evaluators?.length+")"}</p>
                  <div className="h-80 w-64 lg:w-96 bg-menuvar-200 rounded-lg border-2 border-menuvar-600 overflow-scroll p-2 mb-2">
                      {evaluators?.map((data) => {
                        var container
                        if(data?.uid == evalu?.uid) {
                          container = (
                              <div key={data?.uid} onClick={()=> setEval(data)} className="w-full relative flex flex-col bg-white border-2 border-menuvar-300 rounded-xl my-3 shadow-lg items-center justify-evenly p-4 transition-all hover:cursor-pointer">
                              <p>Name: {data?.name}</p>
                              <p>Department: {data?.department}</p>
                              <p>Assigned {data?.assigned_reports?.length} reports so far.</p>
                          </div>
                          )
                        }
                        else {
                          container = (
                            <div key={data?.uid} onClick={()=> setEval(data)} className="w-full relative flex flex-col bg-white border-2 border-menuvar-100 rounded-xl my-3 shadow-lg items-center justify-evenly p-4 transition-all hover:cursor-pointer">
                              <p>Name: {data?.name}</p>
                              <p>Department: {data?.department}</p>
                              <p>Assigned {data?.assigned_reports?.length} reports so far.</p>
                        </div>
                        )
                        }
                        return(
                        container
                        )})}
                  </div>
              </div>

            </div>
            <div className="flex items-center text-center mt-16">
                <ul>
                  <li>Assign Student(s): {select?.map((data) => {return <p>{data?.name}</p>})}</li>
                  <li>to</li>
                  <li>Evaluator {evalu?.name}</li>
                </ul>
                
                <btn onClick={handleAssign}className="btn m-5">Confirm</btn>

            </div>
        </div>
       

        
      
      </>
    )
  }
  