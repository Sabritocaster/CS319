'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import List from "@/components/list";

export default function Document() {
  const { user } = useAuthContext()
    const router = useRouter()
    const [data,setData] = useState([])
   
    
    React.useEffect(() => {
        if (user == null) router.push("/auth")
    }, [user])

    var userType;
    useEffect(() => {
      const getData = async () => {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);  
          setData(docSnap.data())
      }
      const getType = async (key) => {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);  
          setData(docSnap.data())
      }
      if(user!=null) {
          getData()
          userType = getType(user.type);
          userType.then(value => {
            alert(value);
          })
          
      }
      
  }, [])

    React.useEffect(() => {
        const getData = async () => {
          var docs = [];
          var q;
          
          
          if( userType == "Student"){
            q = query(collection(db, "Users"), where("uid", "==", user.uid));
          }
          else {
            q = query(collection(db, "Users"), where("type", "==", "Student"));
          }
          

          //q = query(collection(db, "Users"), where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);          
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


    return (
      <>
        <div className="flex justify-center m-10">
        <div className="form-control">
        <div className="input-group">
            <input type="text" placeholder="Search…" className="input input-bordered" />
            <button className="btn btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
        </div>
        </div>
        </div>
        <List arr={data}/>
      
      </>
    )
  }
  
