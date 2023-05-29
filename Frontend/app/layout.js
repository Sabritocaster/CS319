'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '../components/navbar'
import { MdAccountCircle } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import Link from 'next/link';
import { AuthContextProvider } from '@/context/AuthContext'
import logOut from "@/firebase/auth/logout";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import React from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import firebase_app from '@/firebase/config';
import Footer from '@/components/footer';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Process from '@/components/process';




const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const router = useRouter()
  const [data,setData] = useState()

  const [user, setUser] = React.useState(null);
  const auth = getAuth(firebase_app);

  const pathname = usePathname();
  var path = pathname.substring(
    pathname.indexOf("/") + 1
  );
  //Upper Case
  path = path.charAt(0).toUpperCase() + path.slice(1);
  if(/\d/.test(path)) {
    path = path.substring(0,path.lastIndexOf("/"));
  }

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);


  useEffect(() => {
    const getData = async (key) => {
        const docRef = doc(db, "Users", key);
        const docSnap = await getDoc(docRef);  
        setData(docSnap.data())
        
    }
    if(user?.uid!=null) {
        getData(user?.uid)
    }
    
    
    }, [user])


  //Logout starts
  const handleClick = async (event) => {
    event.preventDefault()

    const { result, error } = await logOut();

    if (error) {
        return console.log(error)
    }

    // else successful
    console.log(result)
    return router.push("/")
}
//Logout Ends

  
  return (
    <html lang="en">
      <body>
      <AuthContextProvider>
        
      <div className="navbar fixed bg-menuvar-100 text-white z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-menuvar-100 rounded-box w-52">
              {data?.type!="Student" && (<li><Link href={"/documents"}>Documents</Link></li>)}
              <li><Link href={"/profile"}>Profile</Link></li>
              <btn onClick={handleClick} className="btn">Log out</btn>
            </ul>
          </div>
          <Link href={"/"} className="btn btn-ghost normal-case text-xl hidden lg:flex"><Image
                src="/images/bilkent_logo.png"
                width={70}
                height={70}
                alt="Bilkent Logo"
              /><p className='ml-5 text-2xl'>CUMREP</p></Link>
        </div>
        <div className="navbar-center text-lg font-medium">
          <ul className="menu menu-horizontal px-1">
            <li className='text-2xl'>{path}</li>
          </ul>
        </div>
        <div className="navbar-end">
        {path!="" &&(<btn onClick={handleClick} className="btn hidden lg:flex">Log out</btn>)}

        </div>
      </div>
          <div className='flex flex-row justify-center'>

            <div className="top-16 hidden p-2 lg:block fixed flex flex-col w-64 h-full bg-menuvar-100 border-r-xl border-stone-700 text-center text-3xl text-white left-0 pt-8">
                    
                {(path=="Documents" && data?.type!="Student" && path!="")  && (<div className='flex flex-row p-3 rounded-2xl justify-center mb-1 items-center bg-menuvar-300 mx-5 transition-all'>
                        <MdFormatListBulleted/>
                        <h2 className=''><Link href='/documents'> Documents</Link></h2>
                    </div>)}
                {path!="Documents" && data?.type!="Student"&& path!="" && (<div className='flex flex-row p-3 rounded-2xl justify-center mb-1 items-center hover:bg-menuvar-300 mx-5 transition-all'>
                        <MdFormatListBulleted/>
                        <h2 className=''><Link href='/documents'> Documents</Link></h2>
                    </div>)}

                {path=="Profile"&& path!="" && (<div className='flex flex-row rounded-2xl justify-center p-3 items-center bg-menuvar-300 mx-5 transition-all'>
                        <MdAccountCircle/>
                        <h2 className=''><Link href="/profile"> Profile</Link></h2>
                    </div>)}
                {path!="Profile"&& path!="" && (<div className='flex flex-row rounded-2xl justify-center p-3 items-center hover:bg-menuvar-300 mx-5 transition-all'>
                        <MdAccountCircle/>
                        <h2 className=''><Link href="/profile"> Profile</Link></h2>
                    </div>)}

                    <div className='bg-menuvar-600 text-lg p-3 left-0 fixed bottom-0 h-64 flex flex-col w-64'>
                    {path!="" &&(<ul>
                      <li>{data?.name}</li>
                      <li>{data?.type}</li>
                      <li>{data?.email}</li>
                      {data?.type == "Student" && (<li>
                          <p>Evaluation Process: <Process process={data?.process}/></p> </li>)}
                      {data?.type != "Student" && (<li>
                          <p>Total Assigned Documents:{ data?.assigned_reports.length} </p></li>)}</ul>)}
                    </div>
                    
                   

                </div>

               
                
                <div className='w-full lg:w-5/6 lg:ml-64 border-menuvar-300 xl:border-2 xl:shadow-xl mt-16 pb-64'>{children}</div>

               





                
                
                {data?.type!="Student" && (<NavBar active={null} className="lg:hidden"/>)}
                
        </div>
        <Footer/>
        </AuthContextProvider>
      </body>
    </html>
  )
}
