import { useState, useEffect } from "react"

export default function Process({process}) {
    const [text,setText] = useState()
    useEffect(() => {
        //0-initial 1-both reports uploaded, 2-preevaluated, 3-evaluated, 4-done
        if(process == 0) {
            setText("Upload Report")
        }
        else if(process== 1) {
            setText("Reports Uploaded")

        }
        else if(process== 2) {
            setText("Pre-evaluated")

        }
        else if(process== 3) {
            setText("Evaluated")

        }
        else {
            setText("Done")

        }
    }, [text])
    
    return (
        <div className="badge ml-2">{text}</div>
      
    )
  }