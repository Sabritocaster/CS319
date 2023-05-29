
export default function Footer() {
    
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content pl-96">
            <div>
                <h1 className="font-bold text-xl">Contact Information: </h1>
                <p>
                +(90) (312) 266 4133
                <br />
                +(90) (312) 266 4248
                <br />
                +(90) (312) 290 1208</p>
                
            </div> 

            <div>
            <h1 className="font-bold text-xl">
                Address:                 
                </h1>
                <p>
                Faculty of Engineering 
                <br />Rectorate Building, 2nd Floor 
                <br />Bilkent University 
                <br />TR-06800 Ankara, Turkey
                </p>
                
            </div>
            <div>

                <h1 className="font-bold text-xl">For more information: </h1><a href="http://mf.bilkent.edu.tr/?page_id=844" target="_blank" className="text-blue-500 underline">mf.bilkent.edu.tr</a>
            </div>
            </footer>
    )
  }