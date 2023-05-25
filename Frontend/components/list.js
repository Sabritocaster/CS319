import Link from 'next/link'


export default function List({arr}) {

    const firstBatch = (

        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center xl:mx-40">
            {arr.map((data) => {
            return(
            <div key={data.uid} className="rounded-xl w-72 h-44 shadow-2xl m-7 flex flex-col items-center justify-evenly p-5 border-menuvar-400 border-2 hover:-translate-y-2 transition-all hover:scale-105">
                <p>Student Name: {data.name}</p>
                <p>Department: {data.department}</p>
                <p>Company:</p>
                <p>Internship Period:</p>
                <Link className="flex justify-center" href={"/documents/"+data.uid}><button className="btn w-24 h-8 place-self-center m-2 bg-cumrep-300 border-none">Evaluate</button></Link>
            </div>)})}
        </div>)





    
    return (
        <>
            {firstBatch}
          
        </>
    )}
