import React, { useState, useRef } from 'react';
import { BiText } from 'react-icons/bi';
import { AiOutlinePicture } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import html2canvas from 'html2canvas';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable'; // Import the Resizable component
import 'react-quill/dist/quill.snow.css';
import './EditingImage.css';
import './RightNav.css';

const EditingImage = () => {
  const encodedImage = localStorage.getItem('selectedImage');
  const [watermarkHTML, setWatermarkHTML] = useState('');
  const [isAddingText, setIsAddingText] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // State to store the uploaded image
  const containerRef = useRef(null);
  const imageRef = useRef(null); // Reference for the resizable image

  const addText = () => {
    if (!encodedImage) {
      console.log('No selected image to add text to.');
    } else {
      setIsAddingText(true);
    }
  };

  const handleSaveText = async () => {
    setIsAddingText(false);

    // Force a redraw of the React Quill component
    setWatermarkHTML(watermarkHTML);

    if (containerRef.current) {
      try {
        const canvas = await html2canvas(containerRef.current);

        const watermarkedImageUrl = canvas.toDataURL('image/png');

        const a = document.createElement('a');
        a.href = watermarkedImageUrl;
        a.download = 'watermarked_image.png';
        a.click();
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    }
  };

  // Function to handle changes in the React Quill editor
  const handleEditorChange = (htmlContent) => {
    setWatermarkHTML(htmlContent);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Set the uploaded image to state
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="main">
      <div className="left">
        <div className="quill-container">
          {isAddingText && (
            <ReactQuill
              value={watermarkHTML}
              onChange={handleEditorChange}
              className="ReactQuill"
            />
          )}
          <div className="image-container" ref={containerRef}>
            <Draggable>
              <div
                // contentEditable={isAddingText}
                placeholder="Enter Text Here"
                style={{
                  display: isAddingText ? 'block' : 'none',
                  padding: '4px',
                  height: 'auto',
                  position: 'absolute',
                  top: '10%',
                  width: '50%',
                  color: 'white',
                  direction: 'ltr',
                  resize: 'both',
                  cursor: 'grab',
                }}
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: watermarkHTML }}
                onInput={(event) => setWatermarkHTML(event.target.innerHTML)}
              ></div>
            </Draggable>
            <Resizable
              width={100} // Set an appropriate initial width
              height={100} // Set an appropriate initial height
              onResize={(e, { size }) => {
                // Handle resize here
                imageRef.current.style.width = `${size.width}px`;
                imageRef.current.style.height = `${size.height}px`;
              }}
            >
              <div className="img" ref={imageRef}>
                <img
                  src={encodedImage}
                  alt=""
                  
                />
              </div>
            </Resizable>
            {uploadedImage && (
              <div className="upload-img">
                    
                <Resizable
                  width={100}
                  height={100}
                  onResize={(e, { size }) => {
                    // Handle resize here
                    imageRef.current.style.width = `${size.width}px`;
                    imageRef.current.style.height = `${size.height}px`;
                  }}
                >
                  <div ref={imageRef}>
                    <img src={uploadedImage} alt="Uploaded" style={
                      {
                        cursor:'grab'
                      }
                    } />
                  </div>
                </Resizable>
              </div>
            )}
          </div>
        </div>
        <div className="para">
          <p>Watermark will be applied to this image</p>
        </div>
        <Draggable>
          <div className="small-img">
            <img src={encodedImage} alt="" />
          </div>
        </Draggable>
      </div>

      <div className="right">
        <div className="right-nav">
          <h1>Watermark Images</h1>
          <div className="buttons">
            <div className="btn-first">
              <BiText className="icon" />
              <button onClick={addText}>Add Text</button>
            </div>
            <div className="btn-second">
              <button>
                <label htmlFor="imageInput" className="icon-label">
                  <AiOutlinePicture className="icon" />
                  Add Image
                </label>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </button>
            </div>
          </div>
          <div className="save-btn">
            <button className="btn-active" onClick={handleSaveText}>
              <p> Download Watermark Image</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditingImage;
