import Link from 'next/link'
import { useEffect,useState } from 'react'
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { reauthenticateWithCredential, deleteUser } from "firebase/auth";
import { useAuthContext } from '@/context/AuthContext';



export default function List({type, assigned_reports, isApproved}) {

    const [data,setData] = useState([])
    const { user } = useAuthContext()

    const getData = async () => {
      var docs = [];
      //var q;
      if(type=='Teaching Assistant') {
        const q = query(collection(db, "Users"), where("type", "==", "Student"),where("isAssigned", "==", true),where("uid", "in", assigned_reports)); 
        const querySnapshot = await getDocs(q); //process: 0 no file uploads, 1 all files uploaded, 2 preevaluated, 3 evaluated, 4 done       
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          docs.push(doc.data())
        });
        setData(docs)
      }
      else if(type=='Evaluator') {
        const q = query(collection(db, "Users"), where("type", "==", "Student"),where("isAssigned2", "==", true),where("uid", "in", assigned_reports));
        const querySnapshot = await getDocs(q); //process: 0 no file uploads, 1 all files uploaded, 2 preevaluated, 3 evaluated, 4 done       
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          docs.push(doc.data())
        });
        setData(docs)
      }
      else if(type=='Department Secretary') {
        const q = query(collection(db, "Users"), where("type", "in", ["Teaching Assistant","Evaluator"]),where("isApproved", "==", false)); 
        const querySnapshot = await getDocs(q); //process: 0 no file uploads, 1 all files uploaded, 2 preevaluated, 3 evaluated, 4 done       
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          docs.push(doc.data())
        });
        setData(docs)
      }
      
    }


    const handleApprove = async (uid,approved) => {
            if(approved) {
                const ref = doc(db, "Users", uid);
                await updateDoc(ref, {
                isApproved: true
                });


            }
            else {
                try {
                    await deleteDoc(doc(db, "Users", uid)); //ERROR ONN USER ACCOUNT DELETION, DOCUMENT GET DELETED FINE
                                                            //USE SESSION EXPIRE
                
                    deleteUser(user).then(() => {
                      console.log("user deleted")
                    }).catch((error) => {
                      // An error ocurred
                      alert("Please re-login your account, deletion session expired")
                      // ...
                    });
                    await deleteDoc(doc(db, "Users", uid));
                }
                catch (error) {
                    console.log(error)
                }
                
            }
            getData()
        }
        
     
      

    useEffect(() => {
        
        
            getData()
            
        
        
    }, [type]) //type


    return (
        <>
            {type=="Department Secretary" &&(
                <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center xl:mx-40">
                {data.map((data) => {
                return(
                <div key={data.uid} className="rounded-xl w-72 h-44 shadow-2xl m-7 flex flex-col items-center justify-evenly p-5 border-menuvar-400 border-2 hover:-translate-y-2 transition-all hover:scale-105">
                    <p>Name: {data.name}</p>
                    <p>Department: {data.department}</p>
                    <p>Role: {data.type}</p>
                    <div className="flex justify-center">
                        <btn onClick={() => handleApprove(data?.uid,true)} className="btn w-24 h-8 place-self-center m-2 bg-cumrep-300 border-none">Approve</btn>
                        <btn onClick={() => handleApprove(data?.uid,false)} className="btn w-24 h-8 place-self-center m-2 bg-cumrep-300 border-none">Decline</btn>
                    </div>
                    </div>)})}
            </div>
            )}
            {type!="Department Secretary" && isApproved &&(
                <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center xl:mx-40">
                {data.map((data) => {
                return(
                <div key={data.uid} className="rounded-xl w-72 h-44 shadow-2xl m-7 flex flex-col items-center justify-evenly p-5 border-menuvar-400 border-2 hover:-translate-y-2 transition-all hover:scale-105">
                    <p>Student Name: {data.name}</p>
                    <p>Department: {data.department}</p>
                    <p>Role: {data.type}</p>
                    <Link className="flex justify-center" href={"/documents/"+data.uid}><button className="btn w-24 h-8 place-self-center m-2 bg-cumrep-300 border-none">Evaluate</button></Link>
                </div>)})}
            </div>
            )}
            {type!="Department Secretary" && !isApproved &&(
                <p className='m-10 text-center'>Waiting for Approval...</p>
            )}
        </>
    )}
