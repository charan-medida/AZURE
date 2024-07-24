import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { FadeLoader } from 'react-spinners';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Te() {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dragging, setDragging] = useState(false);

  const headingStyle = { color: 'blue', marginLeft: 'em' };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'X-User-Name': 'Charan',
          'Content-Type': 'multipart/form-data',
        },
      });
      setExtractedText(response.data.text);
      setErrorMessage('');
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage(error.response ? error.response.data.message : 'Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <br />
      <h2 style={headingStyle}>Text extraction from image</h2>
      <br />
      <img src="./images/text.png" alt="TE" style={{ width: '200px', height: 'auto', marginLeft: 'em' }} />
      <br />
      <div className="App container mt-5">
        <div
          className={`repo-file-upload-container ${dragging ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <label htmlFor="file-upload" className="repo-file-upload-label">
            <span className="repo-file-upload-text">Drag and drop an image here or click here</span>
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            id="file-upload"
            className="form-control-file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <br />
          {selectedFile && <p>Selected File: {selectedFile.name}</p>}
          <br />
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </form>
        <br />
        <br/>
        {loading ? (
          <FadeLoader color={'blue'} loading={loading} size={50} />
        ) : (
          <>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {extractedText && <p className="alert alert-success">Extracted Text: {extractedText}</p>}
          </>
        )}
      </div>
    </>
  );
}

export default Te;
