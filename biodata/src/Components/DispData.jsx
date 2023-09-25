import 'bootstrap/dist/css/bootstrap.min.css';
import { useState} from 'react';
import Img from '../assets/profile-picture.jpeg'
import '../App.css';

function DispData({ dataEntries, setDataEntries, setDataToEdit, handleEditDataReceived }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editedEmail, setEditedEmail] = useState('');

  // Edit Button
  const handleEdit = (index, name, dateOfBirth) => {
    const dataToEdit = { index, name, dateOfBirth };
    setDataToEdit(dataToEdit);
  };
  
  
// Save Button
  const handleSave = (index) => {
    // Update the name in dataEntries directly
    dataEntries[index].name = editedEmail;
    dataEntries[index].name = editedEmail;
    setEditIndex(null);
  };

  // Update local storage whenever dataEntries change


  // Delete Button
  const handleDelete = (indexToRemove) => {
    const updatedDataEntries = dataEntries.filter((item, index) => index !== indexToRemove);
    setDataEntries(updatedDataEntries);
  };

  // Calculate Age
  function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();

    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    return Math.floor(ageInYears);
  }

 

  // Clear All button
  const clearAll = ()=>{
    setDataEntries([])
  }

  return (
    <>
      <h1 className='text-center'>Birthday List</h1>
      <ul>
        {dataEntries.map((data, index) => (
          <li key={index}>
          <div className='main'>
            <div className="image">
            {
              data.profileUrl? <img src={data.profileUrl} alt="Profile Image" className='mt-2' /> : <img src={Img} alt="" />
            }
            </div>
            <div className="data mt-2">
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
                <button onClick={() => handleSave(index)}>Save</button>
              </div>
            ) : (
              <div className='p-info'>
                <p>Name: {data.name}</p>
                <p>{calculateAge(data.dateOfBirth)} years</p>
              </div>
            )}
            </div>
            <div className='e-button '> 

            <button onClick={() => {
        handleEdit(index, data.name, data.dateOfBirth);
        handleEditDataReceived(data); // Send the data to Comp A
      }} className='me-1 mt-2'>
        Edit
      </button>
          <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
          </div>
         
           
          </li>
        ))}
        {dataEntries.length > 0 ? <button onClick={clearAll} className='mt-3'>Clear All</button> : ''}
      </ul>
    </>
  );
}

export default DispData;
