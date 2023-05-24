import Link from 'next/link'


export default function List({arr}) {

    const firstBatch = (

        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center">
            {arr.map((data) => {
            return(
            <div key={data.uid} className="bg-cumrep-100 rounded-xl w-72 h-44 drop-shadow-xl m-10 flex flex-col justify-evenly p-5">
                <p>Student Name: {data.name}</p>
                <p>Department: {data.department}</p>
                <p>Company:</p>
                <p>Internship Period:</p>
                <Link href={"/documents/"+data.uid}><button className="btn w-24 h-8 place-self-center m-2 bg-cumrep-300 border-none">Evaluate</button></Link>
            </div>)})}
        </div>)





    
    return (
        <>
            {firstBatch}
          
        </>
    )}
