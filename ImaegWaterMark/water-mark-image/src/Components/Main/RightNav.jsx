import React from 'react'
import { AiOutlinePicture } from 'react-icons/ai'
import { BiText } from 'react-icons/bi'
import './RightNav.css'
const RightNav = () => {
  return (
    <div>
      <div className="right-nav">
        <h1>Water Mark Images</h1>
        <div className="buttons">
          <div className="btn-first">
            <AiOutlinePicture className='icon' />
            <button>ADD IMAGE</button>
          </div>
          <div className="btn-second">
            <BiText className='icon' />
            <button>ADD Text</button>
          </div>
        </div>

          <div className="save-btn">
            <button className='btn'><p>WaterMark Image</p></button>
          </div>

      </div>
    </div>
  )
}

export default RightNav