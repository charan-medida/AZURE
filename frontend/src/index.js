import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import {App} from './App';
import {Admin} from './Admin';
import { Te } from './Te';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path ="/" element={<App />} />
    <Route path ="admin" element={<Admin />}/>
    <Route path ="Te" element={<Te/>}/>
  </Routes>
</BrowserRouter>
);


