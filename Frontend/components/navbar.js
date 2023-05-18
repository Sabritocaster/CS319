import { MdHome } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import Link from 'next/link'


export default function NavBar({active}) {
    
    return (
        <div className="bg-white flex flex-row h-12 justify-evenly fixed w-full bottom-0 lg:hidden z-50">
            {active=="evaluate" && (<>
                <Link href="/auth"><MdHome className="text-menuvar-400 hover:text-menuvar-300 text-3xl m-2 transition-all"/></Link>
                <Link href="/evaluate"><MdFormatListBulleted className="text-menuvar-300 text-3xl m-2"/></Link>
                </>)}

            {active=="auth" && (<>
                <Link href="/auth"><MdHome className="text-menuvar-300  text-3xl m-2"/></Link>
                <Link href="/evaluate"><MdFormatListBulleted className="text-menuvar-400 hover:text-menuvar-300 text-3xl m-2 transition-all"/></Link>
                </>)}
            {active==null && (<>
                <Link href="/auth"><MdHome className="text-slate-600 hover:text-menuvar-300 text-3xl transition-all m-2"/></Link>
                <Link href="/evaluate"><MdFormatListBulleted className="text-menuvar-400 hover:text-menuvar-300 text-3xl m-2 transition-all"/></Link>
                </>)}
        </div>
      
    )
  }