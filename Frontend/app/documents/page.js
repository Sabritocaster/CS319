'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, orderBy, where, limit, getDoc, doc } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import List from "@/components/list";


export default function Document() {
  const [data,setData] = useState([])
  const { user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
      if (user == null) router.push("/auth")
  }, [user])

  useEffect(() => {
    const getData = async () => {
      var arr = []
      const dbi = collection(db, 'Users');
      var queryy

      //Authenticated User
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      const userType = docSnap.data().type
      if(userType == "Admin") {
        queryy = query(dbi, where("isApproved", "==", false));
      }
      else if(userType == "Evaluator") {
        queryy = query(dbi, where("isApproved", "==", true), where("type", "==", "Student"));
      }

      
      const querySnap = await getDocs(queryy);
      querySnap.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          arr.push(JSON.parse(JSON.stringify(doc.data())))
        });
      setData(arr)

    }
    if(user != null) {
        getData()
    }
        
    
  },[])
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
  