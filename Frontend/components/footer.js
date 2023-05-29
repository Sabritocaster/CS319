import Image from "next/image"
export default function Footer() {
    
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content lg:pl-96">
            <div>
            <Image
                src="/images/bilkent_logo.png"
                width={70}
                height={70}
                alt="Bilkent Logo"
              />
                <p>Bilkent University<br/><a href="http://mf.bilkent.edu.tr/?page_id=844" target="_blank" className="text-blue-500 underline">mf.bilkent.edu.tr</a></p>
            </div> 
            <div>
                <span className="footer-title">Address</span> 
                <p>
                Faculty of Engineering 
                <br />Rectorate Building, 2nd Floor 
                <br />Bilkent University 
                <br />TR-06800 Ankara, Turkey
                </p>
                
            </div>
            <div>
                <span className="footer-title">Contact</span> 
                <div className="grid grid-flow-col gap-4">
                <p>
                +(90) (312) 266 4133
                <br />
                +(90) (312) 266 4248
                <br />
                +(90) (312) 290 1208</p>
                </div>
                
            </div>
            </footer>
    )
  }