'use client'
import { useState, useEffect } from "react"

export default function View(params) {
   
    const url = params.url
    const [data, setData] = useState(url[url.length-1])
    const handleChange = (e) => {
        setData(url[document.getElementById("mySelect").selectedIndex]);
        params.setDocdata(data?.uid)
      }

      useEffect(() => { 
        params.setDocdata(data?.uid)
    }, [data]) 

    return (
        <>
        {url && (
        <>
        <div className="rounded-lg border-2 p-5 border-menuvar-600 flex flex-col items-center mb-10 px-10">
            <div className="form-control w-full max-w-xs">
                <label className="label">
                <span className="label-text">Pick the date of uploaded document</span>
                </label>
                <select id="mySelect" onChange={handleChange} defaultValue={(new Date(url[url.length-1]?.createdAt)).toLocaleString('tr-TR')} className="select select-bordered">
                {url.map((data) => {
                        return(<option>{(new Date(data.createdAt)).toLocaleString('tr-TR')}</option>)})}
                </select>
            </div>
                <div className="flex flex-col items-center my-5">
                    <p>Student Internship Report</p>
                    <a href={data?.report} target="_blank"><button className="btn m-2">View</button></a>
                </div>
                {params.type == "Student" && data?.feedback_url != "" &&(<div className="flex flex-col items-center mb-5">
                    <p>Feedback file</p>
                    <a href={data?.feedback_url} target="_blank"><button className="btn m-2">View</button></a>
                </div>)}
                {params.type == "Student" && data?.feedback != "" &&(<p className="mt-5 bg-menuvar-200 w-64 h-72 rounded-lg p-4 lg:w-72 xl:w-96">{data?.feedback}</p>)}
                {params.type == "Student" && data?.grade != 0 &&(<div className="m-4">
                        <div className="form-control">
                            <label className="input-group">
                                <span>Grade</span>
                                <p className="input input-bordered w-14 pt-3 font-bold" >{data?.grade}</p>
                                <span>/10</span>
                            </label>
                        </div>

                       
                        </div>)}

        </div>

       
        </>
        )}
    </>
      
    )
  }