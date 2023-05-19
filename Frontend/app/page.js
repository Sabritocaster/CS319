"use client"; 
import React, { useState } from "react";

export default function Main(){
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();

  return (
    <>
    

    <div className="App">
      <form>
        <input type="text" />

        <input type="file" />
      </form>
    </div>

    <div className="downloadButton">
      <a href={""} download="myFile">Download The Report Outline</a>

    </div>
    </>
  );
};

const FileUploader = () => {
  const handleFileInput = () => {}

  return (
      <div className="file-uploader">
          <input type="file" onChange={handleFileInput} />
      </div>
  )
}

