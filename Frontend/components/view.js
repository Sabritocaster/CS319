

export default function View({url}) {
    
    
    return (
        <>
        {url && (
            <div className="flex flex-col items-center my-5">
            <p>Student Internship Report</p>
            <a href={url} target="_blank"><button className="btn m-2">View</button></a>
        </div>
        )}
    </>
      
    )
  }