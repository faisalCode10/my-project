import React, { useState } from 'react'
import { BiText } from 'react-icons/bi';
import { AiOutlinePicture } from 'react-icons/ai';
import { AiFillSetting } from 'react-icons/ai'
import './rightNav.css'
const Rightnav = ({ addText, handleImageUpload, handleSaveText }) => {
    const [toggle, setToggle] = useState(false)

    

    const toggleRightnav = () => {
        if (window.innerWidth <= 830 ) {
            setToggle(!toggle );
        } else if(window.innerWidth>830){
            setToggle(toggle)
        }
    };

    return (

        <div>
            
            <AiFillSetting
                onClick={toggleRightnav}
               style={{cursor: 'pointer',  color:'black'}}
               className='setting-icon'
            />
            <div className="right"   style={{ display: toggle ? 'none' : 'block' }}>
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
                            <p>  Watermark Image</p>
                        </button>
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default Rightnav