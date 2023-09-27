import React from 'react';
import { useLocation } from 'react-router-dom';

const EditingImage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedImage = queryParams.get('image');

  // Decode the image data and create an img element
  const selectedImageElement = encodedImage ? (
    <img src={encodedImage} alt="Selected" />
  ) : null;

  return (
    <div>
      <h2>Editing Image</h2>
      {selectedImageElement}
      {/* Additional editing components go here */}
    </div>
  );
};

export default EditingImage;
