import React, { useEffect } from 'react';
import './EditingImage.css'
import RightNav from './RightNav';

const EditingImage = () => {
  const encodedImage = localStorage.getItem('selectedImage');
  
  
  useEffect(() => {
      return () => {
          localStorage.removeItem('selectedImage');
        };
    }, []);

  
if (!encodedImage) {
  window.location.replace('http://localhost:5173')
    }

  return (
    <div className="main">
      <div className='left'>
        <img src={encodedImage} alt="Selected" className='edit-img' />
      <div className="para">
        <p>Watermark will be applied to this images</p>
      </div>
      <div className="small-img">
        <img src={encodedImage} alt="" />
      </div>
      </div>
      
      <RightNav />
    </div>
  );    
};

export default EditingImage;
