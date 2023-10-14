import React from 'react'

const AddText = ({isAddingText,setWatermarkHTML, watermarkHTML}) => {
  return (
    <div>
        <div
                // contentEditable={isAddingText}
                placeholder="Enter Text Here"
                style={{
                  display: isAddingText ? 'block' : 'none',
                  padding: '4px',
                  position: 'absolute',
                  top: '10%',
                  width: '50%',
                  height:'100%',
                  direction: 'ltr',
                  resize: 'both',
                  cursor: 'grab',
                  zIndex:'1',
                  color:'white',
                }}
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: watermarkHTML }}
                onInput={(event) => setWatermarkHTML(event.target.innerHTML)}
              ></div>
    </div>
  )
}

export default AddText