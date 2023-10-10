import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/api-docs" element={
          <div className="my_frame_container">
            <iframe src="http://localhost:3000/api-docs" title="/Product Docs" className='my_frame'></iframe>
         </div>
        }/>
        <Route path="/" element={<App/>}/>
      </Routes>
   </BrowserRouter>
  </React.StrictMode>
);





