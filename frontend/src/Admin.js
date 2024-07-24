import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './App.css';


export function Admin() {
  const [formData, setFormData] = useState({
    Key: '',
    Value: '',
  });

  const [formErrors, setFormErrors] = useState({
    Key: '',
    Value: '',
  });

  const [fetchedData, setFetchedData] = useState([]);

  
  const updateFormData = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

 
  const validateForm = () => {
    let valid = true;
    const newFormErrors = { Key: '', Value: '' };

    if (formData.Key.trim() === '') {
      newFormErrors.Key = 'Key is required';
      valid = false;
    }

    if (formData.Value.trim() === '') {
      newFormErrors.Value = 'Value is required';
      valid = false;
    }

    setFormErrors(newFormErrors);
    return valid;
  };

  
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5001/sub', formData);
        console.log('Data added successfully:', response.data);

        fetchUpdatedData();
      } catch (error) {
        console.error('Error adding data:', error);
      }
    } else {
      console.log('Form validation failed. Please correct errors.');
    }
  };

  const fetchUpdatedData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/sub');
      console.log('Updated data:', response.data);
      setFetchedData(response.data);
      setFormData({
        Key: '',
        Value: ''
      });
    } catch (error) {
      console.error('Error fetching updated data:', error);
    }
  };

  useEffect(() => {
    fetchUpdatedData();
    setFormData({
      Key: '',
      Value: ''
    });
  }, []);

  return (
    <div className="App">
      <h2 style={{ color: 'blue' }}>Hello Admin</h2>
      <br /><br />
      


      <div class="container">
        <h5>Key <Form.Control id="username" type="text"  
        onChange={(e) => updateFormData('Key', e.target.value)} placeholder="Enter Key"/></h5>
       <span style={{ color: 'red' }}> {formErrors.Key}</span>
      </div>
      <br />

      <div class="container">
        <h5>Value <Form.Control id="username" type="text"  
        onChange={(e) => updateFormData('Value', e.target.value)} placeholder="Enter Value"/></h5>
       <span style={{ color: 'red' }}> {formErrors.Value}</span>
      </div>

      <br /><br />
      <div>
        <button
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
      <br />

      <div>
        <h2>Config Data</h2><br/>
        <table className="table">
     
        <tr>
          <th className="th">Key</th>
          <th className="th">Value</th>
        </tr>
     
      <tbody>
        {fetchedData.map((item, index) => (
          <tr key={index}>
            <td className="td">{item.key}</td>
            <td className="td">{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    </div>
  );
}
