import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import './RightNav.css';
import './UploadImgContainer.css';

const UploadImage = ({ uploadedImage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
    });

    if (uploadedImage) {
      fabric.Image.fromURL(uploadedImage, (img) => {
        img.scaleToWidth(200); // Set the desired width
        img.scaleToHeight(200); // Set the desired height

        // Center the image on the canvas
        img.set({
          left: (canvas.width - img.width) / 2,
          top: (canvas.height - img.height) / 2,
        });

        canvas.add(img);
      });

      // Disable selection of the image
      canvas.selection = false;

      // Ensure the canvas is not resized when the window is resized
      canvas.setDimensions({
        width: 800,
        height: 600,
      });
    }
  }, [uploadedImage]);

  return (
    <div className='uploadImg-container'>
      {uploadedImage && (
        <div className="upload-img">
          <canvas ref={canvasRef} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
