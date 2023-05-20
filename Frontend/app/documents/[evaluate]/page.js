'use client';

export default function Evaluate({params}) {
    return (
      <>
      <div className="m-10 mb-0">
            <p>Student Name:{params.evaluate}</p>
            <p>Company Name:</p>
        </div>
      <div className="flex flex-col lg:flex-row-reverse"> 

        <div className="lg:w-1/3 flex flex-col items-center mt-10">
            <div className="flex flex-col items-center my-5">
                <p>Student Internship Report</p>
                <button className="btn m-2">View</button>
            </div>
            <div className="flex flex-col items-center my-5">
                <p>Company Internship Report</p>
                <button className="btn m-2">View</button>
            </div>
        </div>

        <div className="lg:w-2/3 bg-menuvar-200 rounded-xl flex flex-col items-center p-5 m-10 lg:mr-0">
            
            <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Student Internship Report</span>
                </label>
                <label className="input-group">
                    <span>Grade</span>
                    <input type="text" id="student" placeholder="" className="input input-bordered w-14" />
                    <span>/10</span>
                </label>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Company Internship Report</span>
                </label>
                <label className="input-group">
                    <span>Grade</span>
                    <input type="text" id="company" placeholder="" className="input input-bordered w-14" />
                    <span>/10</span>
                </label>
            </div>
            </div>

            <textarea className="textarea textarea-bordered mt-5" placeholder="Your Feedback"></textarea>

            <p className="mt-5 mb-2">Overall Grade:</p>
            <button className="btn">Submit</button>

        </div>

      </div>
      
      </>
    )
  }
  