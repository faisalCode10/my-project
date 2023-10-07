import React, { useEffect, useState } from 'react';
import { BiText } from 'react-icons/bi';
import { AiOutlinePicture } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import html2canvas from 'html2canvas';
import 'react-quill/dist/quill.snow.css';
import './EditingImage.css';
import './RightNav.css';

const EditingImage = () => {
  const encodedImage = localStorage.getItem('selectedImage');
  const [watermarkHTML, setWatermarkHTML] = useState('');
  const [isAddingText, setIsAddingText] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const addText = () => {
    if (!encodedImage) {
      console.log('No selected image to add text to.');
    } else {
      setIsAddingText(true);
    }
  };


  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, offset]);





  const handleSaveText = () => {
    setIsAddingText(false);

    const imageContainer = document.querySelector('.image-container');

    html2canvas(imageContainer).then((canvas) => {
      // Convert the canvas to a data URL
      const watermarkedImageUrl = canvas.toDataURL('image/png');

      const a = document.createElement('a');
      a.href = watermarkedImageUrl;
      a.download = 'watermarked_image.png';
      a.click();
    });
  };

  // Function to handle changes in the React Quill editor
  const handleEditorChange = (htmlContent) => {
    setWatermarkHTML(htmlContent);
  };

  // Function to convert HTML to plain text (strip HTML tags)
  // const htmlToPlainText = (html) => {
  //   const text = parse(html);
  //   return text;
  // };

  useEffect(() => {
    if (window.location.reload === true) {
      window.location.replace('/');
    }
  }, [encodedImage]);

  return (
    <div className="main">
      <div className='left'>
        <div className="quill-container">
          {isAddingText && (
            <ReactQuill
              value={watermarkHTML}
              onChange={handleEditorChange}
              className='ReactQuill'
            />
          )}
          <div className="image-container">
            <div
              contentEditable
              cols="30"
              rows="10"
              placeholder='Enter Text Here'
              style={{
                display: isAddingText ? 'block' : 'none',
                border: 'none',
                padding: '4px',
                height: '10%',
                position: 'absolute',
                top: '10%',
                width: '50%',
                color: 'white',
                direction: 'ltr',
                resize: 'both',
                overflow: 'auto',
                cursor: 'grab'
              }}
              className='ql-editor'
              dangerouslySetInnerHTML={{ __html: watermarkHTML }}
              onInput={(event) => setWatermarkHTML(event.target.innerHTML)}
              onMouseDown={(e) => {
                setIsDragging(true);
                setOffset({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
              }}
            ></div>
            <div className="img">
              <img src={encodedImage} alt="" />
            </div>
          </div>
        </div>
        <div className="para">
          <p>Watermark will be applied to this image</p>
        </div>
        <div className="small-img">
          <img src={encodedImage} alt="" />
        </div>
      </div>

      <div className="right">
        <div className="right-nav">
          <h1>Watermark Images</h1>
          <div className="buttons">
            <div className="btn-first">
              <BiText className='icon' />
              <button onClick={addText}>Add Text</button>
            </div>
            <div className="btn-second">
              <AiOutlinePicture className='icon' />
              <button>Add Image</button>
            </div>
          </div>

          <div className="save-btn">
            <button className='btn-active' onClick={handleSaveText}><p>Watermark Image</p></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditingImage;
