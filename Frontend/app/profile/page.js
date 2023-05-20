import Image from "next/image"
export default function Profile() {
    return (
      <>
        <div className="flex flex-col lg:flex-row justify-evenly items-center m-5 mb-20">
            <div className="avatar">
                <div className="rounded bg-slate-400">
                    <Image src="/images/bilkent_logo.png"
                        alt="Avatar"
                        width={175}
                        height={175}
                        priority />
                </div>
            </div>
            <div className="flex flex-col">
                <p>Student Name:</p>
                <p>Internship Place:</p>
                <div className="flex items-center">
                    <p>Evaluation Process: </p>
                    <div className="badge ml-2">Pending...</div>
                </div>

            </div>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-evenly items-center m-5">
            <div className="flex flex-col items-center lg:w-1/2">
                <p>Upload Internship Report</p>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                <div>
                    <button className="btn m-5">Preview</button>
                    <button className="btn m-5">Confirm</button>
                </div>
                
            </div>
            <p className="lg:w-1/2 p-1 lg:p-5">When preparing your application materials to be uploaded, please note the following:Files must not exceed 10 MB.Only .doc, .docx, PDF and RTF files will be accepted.Files cannot be password protected.PDF files cannot have a digital signature.Each file should be saved separately. Multi-page documents must be saved as one file. For example, a two page transcript from one college must be saved and uploaded as a single document; a three page transcript from another college must be saved and uploaded as a single document.</p>
        </div>
      
      </>
    )
  }
  