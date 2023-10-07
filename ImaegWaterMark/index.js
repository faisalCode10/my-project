// import React, { useEffect, useState } from 'react';
// import { BiText } from 'react-icons/bi';
// import { AiOutlinePicture } from 'react-icons/ai';
// import ReactQuill from 'react-quill';
// import html2canvas from 'html2canvas';
// import 'react-quill/dist/quill.snow.css';
// import './EditingImage.css';
// import './RightNav.css';

// const EditingImage = () => {
//   const encodedImage = localStorage.getItem('selectedImage');
//   const [watermarkText, setWatermarkText] = useState('');
//   const [isAddingText, setIsAddingText] = useState(false);

//   const addText = () => {
//     if (!encodedImage) {
//       console.log('No selected image to add text to.');
//     } else {
//       setIsAddingText(true);
//     }
//   };

//   const handleSaveText = () => {
//     setIsAddingText(false);

//     const imageContainer = document.querySelector('.image-container');

//     html2canvas(imageContainer).then((canvas) => {
//       // Convert the canvas to a data URL
//       const watermarkedImageUrl = canvas.toDataURL('image/png');

//       const a = document.createElement('a');
//       a.href = watermarkedImageUrl;
//       a.download = 'watermarked_image.png';
//       a.click();
//     });
//   };

//   useEffect(() => {
//     if (window.location.reload === true) {
//       window.location.replace('/');
//     }
//   }, [encodedImage]);

//   return (
//     <div className="main">
//       <div className='left'>
//         <div className="quill-container">
//           {isAddingText && (
//             <ReactQuill
//               value={watermarkText}
//               onChange={setWatermarkText}
//               className='ReactQuill'
//             />
//           )}
//           <div className="image-container">
//             <textarea
//               name=""
//               id=""
//               cols="30"
//               rows="10"
//               placeholder='Enter Text Here'
//               style={{
//                 display: isAddingText ? 'block' : 'none'
//               }}
//             ></textarea>

//             <div className="img">
//               <img src={encodedImage} alt="Selected" className='edit-img' />
//             </div>
//           </div>
//         </div>
//         <div className="para">
//           <p>Watermark will be applied to this image</p>
//         </div>
//         <div className="small-img">
//           <img src={encodedImage} alt="" />
//         </div>
//       </div>

//       <div className="right">
//         <div className="right-nav">
//           <h1>Watermark Images</h1>
//           <div className="buttons">
//             <div className="btn-first">
//               <BiText className='icon' />
//               <button onClick={addText}>Add Text</button>
//             </div>
//             <div className="btn-second">
//               <AiOutlinePicture className='icon' />
//               <button>Add Image</button>
//             </div>
//           </div>

//           <div className="save-btn">
//             <button className='btn-active' onClick={handleSaveText}><p>Watermark Image</p></button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditingImage;







// 2nd method 

// import React, { useEffect, useState } from 'react';
// import { BiText } from 'react-icons/bi';
// import { AiOutlinePicture } from 'react-icons/ai';
// import './EditingImage.css';
// import './RightNav.css';

// const EditingImage = () => {
//   const encodedImage = localStorage.getItem('selectedImage');
//   const [watermarkText, setWatermarkText] = useState('');
//   const [isAddingText, setIsAddingText] = useState(false);
//   const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

//   const addText = () => {
//     if (!encodedImage) {
//       console.log('No selected image to add text to.');
//     } else {
//       if (isAddingText) {
//         // Reset text position and disable dragging when clicking "Add Text" again
//         setTextPosition({ x: 0, y: 0 });
//         setIsDragging(false);
//       }
//       setIsAddingText(!isAddingText); // Toggle isAddingText state
//     }
//   };
  
//   const handleSaveText = () => {
//     setIsAddingText(false);

//     // Create a new canvas element
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');

//     // Create an image element for the selected image
//     const image = new Image();
//     image.src = encodedImage;

//     // Set canvas size to match the image size
//     canvas.width = image.width;
//     canvas.height = image.height;

//     // Draw the image on the canvas
//     context.drawImage(image, 0, 0);

//     // Set text style
//     context.font = '23px Arial';
//     context.fillStyle = 'white';
//     context.textAlign = 'left'; // Change text alignment to left

//     // Draw the text on the canvas at the specified position relative to the image
//     context.fillText(watermarkText, textPosition.x, textPosition.y);

//     // Convert the canvas to a data URL
//     const watermarkedImageUrl = canvas.toDataURL('image/png');

//     // Create a download link for the watermarked image
//     const a = document.createElement('a');
//     a.href = watermarkedImageUrl;
//     a.download = 'watermarked_image.png';
//     a.click();
//   };

//   useEffect(() => {
//     if (window.location.reload === true) {
//       window.location.replace('/');
//     }
//   }, [encodedImage]);

//   const handleMouseDown = (e) => {
//     if (isAddingText) {
//       const offsetX = e.nativeEvent.offsetX;
//       const offsetY = e.nativeEvent.offsetY;
//       setDragStartPos({ x: offsetX, y: offsetY });
//       setIsDragging(true);
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const offsetX = e.nativeEvent.offsetX;
//       const offsetY = e.nativeEvent.offsetY;
//       const newX = offsetX - dragStartPos.x + textPosition.x;
//       const newY = offsetY - dragStartPos.y + textPosition.y;
//       setTextPosition({ x: newX, y: newY });
//     }
//   };

//   return (
//     <div className="main">
//       <div className='left'>
//         <div className="image-container" style={{ position: 'relative' }}>
//           {isAddingText && (
//             <textarea
//               type="text"
//               placeholder="Write your text here"
//               value={watermarkText}
//               onChange={(e) => setWatermarkText(e.target.value)}
//               onMouseDown={handleMouseDown}
//               onMouseMove={handleMouseMove}
//               onMouseUp={handleMouseUp}
//               className='text-input'
//               style={{ position: 'absolute', top: textPosition.y, left: textPosition.x }}
//             />
//           )}
//           <img src={encodedImage} alt="Selected" className='edit-img' />
//         </div>
//         <div className="para">
//           <p>Watermark will be applied to this image</p>
//         </div>
//         <div className="small-img">
//           <img src={encodedImage} alt="" />
//         </div>
//       </div>

//       <div className="right">
//         <div className="right-nav">
//           <h1>Watermark Images</h1>
//           <div className="buttons">
//             <div className="btn-first">
//               <BiText className='icon' />
//               <button onClick={addText}>Add Text</button>
//             </div>
//             <div className="btn-second">
//               <AiOutlinePicture className='icon' />
//               <button>Add Image</button>
//             </div>
//           </div>

//           <div className="save-btn">
//             <button className='btn-active' onClick={handleSaveText}><p>Watermark Image</p></button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditingImage;
