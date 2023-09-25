import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css'
import React, { useState } from 'react'
import BioDataForm from './Components/BioDataForm';
// import DispData from './Components/DispData';

const App = () => {

  return (

    <div className='app-component'>
        <BioDataForm />
      {/* <DispData /> */}
    </div>
  )
}

export default App