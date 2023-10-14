import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import './RightNav.css'
import "./UploadImgContainer.css"
const UploadImage = ({ uploadedImage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (uploadedImage) {
      const canvas = new fabric.Canvas(canvasRef.current);

      fabric.Image.fromURL(uploadedImage, (img) => {
        img.set('stackingOrder', canvas.getObjects().length + 1);
        canvas.add(img);
      });

      canvas.on('mouse:wheel', (event) => {
        const img = canvas.getActiveObject();
        if (img) {
          const delta = event.e.deltaY;
          const zoom = img.getScaleX() + delta / 200;
          img.set({ scaleX: zoom, scaleY: zoom });
          canvas.renderAll();
        }
      });
    }
  }, [uploadedImage]);

  return (
    <div className='uploadImg-container'>
      {uploadedImage && (
        <div className="upload-img">
          <canvas ref={canvasRef} width={800} height={1000} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;

