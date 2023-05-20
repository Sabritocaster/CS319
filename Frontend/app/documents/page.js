'use client';
import Link from "next/link";
export default function Document() {
    return (
      <>
        <div className="flex justify-center m-10">
        <div className="form-control">
        <div className="input-group">
            <input type="text" placeholder="Search…" className="input input-bordered" />
            <button className="btn btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
        </div>
        </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center">
            <div className="bg-menuvar-200 rounded-xl w-72 h-44 drop-shadow-xl m-10 flex flex-col justify-evenly p-5">
                <p>Student Name:</p>
                <p>Department:</p>
                <p>Company:</p>
                <p>Internship Period:</p>
                <Link href="/documents/1"><button className="btn w-24 h-8 place-self-center m-2">Evaluate</button></Link>
            </div>
        </div>
      
      </>
    )
  }
  