'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import List from "@/components/list";
import Assign from "@/components/assign";
export default function Document() {
  const { user } = useAuthContext()
    const router = useRouter()
    const [userData, setUserData] = useState()
    const [isAssign,setAssign] = useState(false)

   
    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    React.useEffect(() => {
      const getUser = async (key) => {
          const docRef = doc(db, "Users", key);
          const docSnap = await getDoc(docRef);  
          setUserData(docSnap.data())
      }
      if(user!=null) {
          getUser(user.uid)
      }
      
  }, [])

      React.useEffect(() => {
        if (userData?.type == "Student") router.push("/profile")
    }, [userData])

    


    return (
      <>
        <div className="flex flex-col lg:flex-row justify-center items-center m-10">
        {userData?.type == "Department Secretary" && (<>
        {isAssign && (<div className="flex flex-row w-full justify-center">
                        <button onClick={() => setAssign(false)} className="btn w-28 border-none bg-menuvar-600 mr-2">Accounts</button>
                        <button onClick={() => setAssign(true)} className="btn w-28 border-none bg-menuvar-300 ml-2">Assign</button>
                        </div>)}
        {!isAssign && (<div className="flex flex-row w-full justify-center">
                        <button onClick={() => setAssign(false)} className="btn border-none bg-menuvar-300 mr-2">Accounts</button>
                        <button onClick={() => setAssign(true)} className="btn border-none bg-menuvar-600 ml-2">Assign</button>
                    </div>)}
                    </> )}
        <div className="form-control m-5 lg:mr-32">
        <div className="input-group">
            <input type="text" placeholder="Search…" className="input input-bordered" />
            <button className="btn btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
        </div>
        </div>
        </div>
        {isAssign &&(
          <Assign />
        )}
        {!isAssign &&(
          <List type={userData?.type} assigned_reports={userData?.assigned_reports} isApproved={userData?.isApproved}/>
        )}
        
      
      </>
    )
  }
  