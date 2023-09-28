import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar'
import SelectImage from './Components/Main/SelectImage';
import EditingImage from './Components/Main/EditingImage';

function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
        <Route path="/" element={<SelectImage />} />
        <Route path="/editing" element={<EditingImage />} />
      </Routes>
      
    </Router>
  );
}

export default App;
