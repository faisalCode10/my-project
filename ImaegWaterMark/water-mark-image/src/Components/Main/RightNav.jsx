import React from 'react'
import {AiOutlinePicture} from 'react-icons/ai'
import {BiText} from 'react-icons/bi'
import './RightNav.css'
const RightNav = () => {
  return (
    <div>
    <div className="right-nav">
        <h1>Water Mark Images</h1>
        <div className="buttons">
  <AiOutlinePicture style={{ fontSize: '32px' }} />
  <button>ADD IMAGE</button>
  <BiText style={{ fontSize: '32px' }} />
  <button>ADD Text</button>
</div>

      </div>
    </div>
  )
}

export default RightNav