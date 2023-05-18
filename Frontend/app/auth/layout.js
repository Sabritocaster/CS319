import './../globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/components/navbar';
import { MdHome } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CUMREP',
  description: 'SWALLOW IT',
}

export default function AuthLayout({ children }) {
  
  return (
    <html lang="en">
      <body>
        <div className='xl:hidden fixed flex px-4 py-1  items-center bottom-16 right-8 z-50 bg-menuvar-500 rounded-xl text-white drop-shadow-2xl'>
                
            </div>
            <div className='flex bg-slate-700 h-16 fixed w-screen text-4xl text-white justify-center items-center z-50 lg:pl-16 lg:justify-between'>
                
                <h1 className='hidden lg:block'><Link href='/'>CUMREP</Link></h1>
                <h1 className='lg:hidden text-3xl text-center lg:-ml-96 xl:-ml-52'>cu</h1>
                <span className='fixed right-8 top-0 text-menuvar-500 hidden lg:block'>hello</span>
                <span className='hidden lg:block'></span>
            </div>
            <div className='flex flex-row justify-center'>

          

                <div className="top-16 hidden p-2 lg:block fixed flex flex-col w-64 h-full bg-slate-700 border-r-xl border-stone-700 text-center text-3xl text-white left-0">
                    
                    <div className='flex flex-row p-3 rounded-2xl justify-center items-center mb-1 bg-menuvar-300 mx-5 transition-all'>
                        <MdHome/>
                        <h2 className=''><Link href='/auth'> Auth</Link></h2>
                    </div>


                    <div className='flex flex-row rounded-2xl justify-center p-3 items-center hover:bg-menuvar-300 mx-5 transition-all'>
                        <MdFormatListBulleted/>
                        <h2 className=''><Link href="/evaluate"> Evaluate</Link></h2>
                    </div>
                    
                

                </div>
                
                

                <div className='w-full lg:w-5/6 xl:w-4/6 lg:ml-64 xl:mx-64 border-menuvar-300 rounded-lg xl:border-2 xl:shadow-xl mt-16 mb-28'>{children}</div>



                <div className=" hidden fixed xl:block flex flex-col w-64 top-16 pt-24 h-full bg-slate-700 border-l-lg border-stone-700 text-center right-0">
                
                <div className='flex flex-row mt-10 flex-wrap text-white text-sm justify-evenly'>
                    <Link href='/auth' >Auth</Link>
                    <Link href='/evaluate'>Evaluate</Link>
                  
                    <a href='https://cuneytarkininbilinmeyenleri.blogspot.com/2019/01/selamlar-bu-yazmzda-cuneyt-arknn.html' target="_blank">Blog</a>
                </div>

                <div className='text-sm text-white mt-16'>
                    
                </div>

                


                    
                </div>

                <NavBar active={"auth"} className="lg:hidden"/>
        </div>
      </body>
    </html>
  )
}
