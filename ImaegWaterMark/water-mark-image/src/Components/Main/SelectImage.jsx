import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './SelectImage.css';

const SelectImage = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSelectImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    // Encode the selected image data as a Base64 string
    const encodedImage = URL.createObjectURL(selectedFile);

    // Store the encoded image data in localStorage
    localStorage.setItem('selectedImage', encodedImage);

    // Navigate to the editing route
    navigate('/editing');
  };

  return (
    <>

    <div className='wrapper'>
      <div className="container">
        <h1>Watermark IMAGE</h1>
        <p>Watermark JPG, PNG, or GIF images.</p>
        <p>Stamp images or text over your images at once.</p>
        <button className='btn' onClick={handleSelectImageClick}>
          <h1>Select Image</h1>
        </button>
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
        <span>or drop images here</span>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default SelectImage;
