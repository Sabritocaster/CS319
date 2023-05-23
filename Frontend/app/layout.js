'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '../components/navbar'
import { MdAccountCircle } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import Link from 'next/link';
import { AuthContextProvider } from '@/context/AuthContext';
import Footer from '@/components/footer';
import logOut from '@/firebase/auth/logout';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {

  const router = useRouter()

  const handleClick = async ()=> {

    const { result, error } = await logOut();

    if (error) {
        return console.log(error)
    }

    // else successful
    return router.push("/auth")
}
  
  return (
    
    <html lang="en">
      <body>
      <AuthContextProvider>
      <div className="navbar bg-[#00529f] text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#00529f] rounded-box w-52">
              <li><Link href="/documents">DOCUMENTS</Link></li>
              <li><Link href="/profile">PROFILE</Link></li>
              <li onClick={handleClick} className="btn bg-cumrep-300">Log Out</li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">CUMREP</a>
        </div>
        <div className="navbar-center">
          <a className="btn ">Page</a>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/documents">DOCUMENTS</Link></li>
            <li><Link href="/profile">PROFILE</Link></li>
            <li onClick={handleClick} className="btn bg-cumrep-300 rounded-xl">Log Out</li>
          </ul>
        </div>
        
      </div>
            <div className='flex flex-row justify-center'>

                <div className='w-full lg:w-4/6 xl:mx-64 border-cumrep-300 rounded-lg xl:border-2 xl:shadow-xl mb-28'>{children}</div>

                <NavBar active={"profile"} className="lg:hidden"/>
                
                 </div>
                 <Footer/>
       
        </AuthContextProvider>
      </body>
    </html>
  )
}
