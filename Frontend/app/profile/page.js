"use client"; 
import React, { useState } from 'react';

function ProfilePage() {
  const [name, setName] = useState('Ananin ami');
  const [email, setEmail] = useState('ananin.ami.com');
  const [photo, setPhoto] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(URL.createObjectURL(file));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

  };

  return (
    <div>
      <p>
          <span style={{ color: 'blue', fontWeight: 'bold', fontSize: '30px' }}>Profile</span> 
        </p>
        
        <div>
          <label>Name: </label>
          
        </div>
        <div>
          <label>Email: </label>
          
        </div>
        
        <div>
          <button style={{
            border: '1px solid black',
            borderRadius: '5px',
            backgroundColor: 'darkblue',
            color: 'white',
            padding: '10px',
            }}
            >
                <a href="./fileexchange">Upload a Report</a>
            </button>
        </div>

        <div className="downloadButton">
            
            <a style={{ color: 'white', backgroundColor: 'darkblue', border: '2px solid black' }} href={""} download="myFile">Download The Report Outline</a>

        </div>
        
    </div>
  );
}

export default ProfilePage;
