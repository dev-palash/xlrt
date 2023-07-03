import React, { useEffect, useState } from 'react';
import './Fileupload.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material';
import {getDocuments, uploadFile} from '../../ApiConfig/documentApi/doumentApi'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { addDocuments } from '../../redux/slices/documentApiSlice';
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const handleFileChange = (event) => {
    console.log(event.target.files[0], 'event');
    setSelectedFile(event.target.files[0]);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log(selectedFile, 'formdata');

      uploadFile(selectedFile)
      .then((response) => {
        console.log(response.data);
        if(response.data){
          toast.success('document uploaded successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        else{
          toast.warn('documents is not uploaded');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('cannot upload document');
      });
    }
  };


  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className='upload_container'
    >
      <div>
        {selectedFile ? (
          <p>{selectedFile?.name}</p>
        ) :
          (
            <p className='drag_txt'>Drag and drop a file here, or click to select a file.</p>
          )

        }
        <input type="file" id="fileInput" onChange={handleFileChange} />
        <label for="fileInput" id="fileInputLabel">
          <CloudUploadIcon color='primary' sx={{ fontSize: '3rem' }} />
        </label>
      </div>
      <div className='upload_button'>
        {/* <button onClick={handleFileUpload}>Upload</button> */}
        <Button variant="contained" onClick={handleFileUpload} sx={{ padding: '0.5rem 2rem', fontSize: '1.2rem' }}>Upload</Button>
      </div>
    </div>
  );

};

export default FileUpload;
