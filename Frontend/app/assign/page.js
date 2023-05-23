
export default function Assign() {
    return (
      <>
      <div className="m-10 mb-0 lg:hidden">
            <p>Student Name:</p>
            <p>Company Name:</p>
        </div>
      <div className="flex flex-col lg:flex-row-reverse"> 

        <div className="lg:w-1/3 flex flex-col items-center mt-10">
            <p>Evaluators</p>
            <div className="form-control m-5">
                <div className="input-group">
                    <input type="text" placeholder="Search…" className="input input-bordered" />
                    <button className="btn btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center my-5 bg-menuvar-200 rounded-xl p-5">
                <p>Evaluator Name:</p>
                <p>Currently Assigned:</p>
            </div>
        </div>

        <div className="lg:w-2/3 bg-menuvar-200 rounded-xl flex flex-col items-center p-5 m-10 lg:mr-0">
            <div className="m-10 hidden lg:block">
                <p>Student Name:</p>
                <p>Company Name:</p>
            </div>
            <p>Student:</p>
            <p>Will be assigned to</p>
            <p>TA:</p>
            <button className="btn">Confirm</button>

        </div>

      </div>
      
      </>
    )
  }
  