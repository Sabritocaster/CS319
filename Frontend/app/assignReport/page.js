'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import Evaluators from "@/components/evaluators";
import ListEva from "@/components/listEva";

export let chosenDocId = null;


export default function assignReport() {
  const { user } = useAuthContext()
    const router = useRouter()
    const [data,setData] = useState([])
    const [data2,setData2] = useState([])

    const [chosenDocId, setChosenDocId] = useState(null);

    const handleDocSelection = (id) => {
      setChosenDocId(id);
    };

   
    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    React.useEffect(() => {
        const getData = async () => {
          var docs = [];
          const q = query(collection(db, "Users"), where("type", "==", "Student")); 
          const querySnapshot = await getDocs(q); //process: 0 no file uploads, 1 all files uploaded, 2 preevaluated, 3 evaluated, 4 done       
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            docs.push(doc.data())
          });
          setData(docs)
        }
        if(user!=null) {
            getData()
            
        }
        
    }, [])

    React.useEffect(() => {
      const getData = async () => {
        var docs = [];
        const q = query(collection(db, "Users"), where("type", "==", "Evaluator")); 
        const querySnapshot = await getDocs(q); //process: 0 no file uploads, 1 all files uploaded, 2 preevaluated, 3 evaluated, 4 done       
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          docs.push(doc.data())
        });
        setData2(docs)
      }
      if(user!=null) {
          getData()
          
      }
      
  }, [])


    return (
      <>
        <div className="flex justify-center m-10">
            <div className="form-control">
                <div className="input-group ">
                <div className="grid grid-cols gap-4">

                  <div>
                    <h1 className="flex items-center justify-center font-bold py-2 px-4 rounded bg-blue-800 text-white items-center" >Students</h1>
                    <ListEva arr={data} onDocSelect={handleDocSelection}/>
                  </div>
                  
                  <div>
                  <h1 className="flex items-center justify-center font-bold py-2 px-4 rounded bg-blue-800 text-white items-center" >Evaluators</h1>
                    <Evaluators arr={data2}/>
                  </div>

                  <div className="flex items-center justify-center">
                    <button className="justify-center btn w-24 h-8 place-self-center m-2 bg-cumrep-300 border-none">Confirm</button>
                  </div>

                </div>


              </div>
            </div>
        </div>
      </>
    )
}
  