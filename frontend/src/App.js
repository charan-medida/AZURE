import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import './App.css';
 
export function App() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const updateFormData = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
    error:''
  });
  const validateForm = () => {
    let valid = true;
    const newFormErrors = { ...formErrors };

    if (formData.username.trim() === '') {
      newFormErrors.username = 'Username is required';
      valid = false;
    } 

    if (formData.password.trim() === '') {
      newFormErrors.password = 'Password is required';
      valid = false;
    }
    setFormErrors(newFormErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if(formData.username === 'user' && formData.password === '1234')
        navigate('/Te')
      else if(formData.username === 'admin' && formData.password === '1234')
      {
        navigate('/admin');
      }
      else
      {
        formData.error = 'Enter correct username and password';
      }
    }
  };

  return (
    <div className="App">
      <h2 style={{color : "blue"}}>Login page</h2><br/><br/>
      
      <div class="container">
        <h5>Username  <FaUserAlt className='icon'/> <Form.Control id="username" type="text"  
        onChange={(e) => updateFormData('username', e.target.value)} placeholder="Enter username"/></h5>  
       <span style={{ color: 'red' }}> {formErrors.username}</span>
      </div>
     
      <br/>
      <div class="container">
        <h5>Password <FaLock/> <Form.Control id="password" type="password"
        onChange={(e) => updateFormData('password', e.target.value)} placeholder="Enter Password"/></h5>
        <span style={{ color: 'red' }}> {formErrors.password}</span>
      </div>
     
      <br/><br/>
      <div>
        <button
          value="submit"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          login
        </button>
      </div><br/>
      <span style={{ color: 'red' }}>{formData.error}</span>
    </div>
  );
}