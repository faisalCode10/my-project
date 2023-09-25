import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import DispData from './DispData';
import '../App.css';

function BioDataForm() {
  const [dataToEdit, setDataToEdit] = useState(null);


  const [formData, setFormData] = useState({
    name: '',
    profileUrl: null,
    dateOfBirth: '',
  });

  // Save value in local storage
  const [dataEntries, setDataEntries] = useState(() => {
    // Initialize from localStorage on component mount, or as an empty array if no data is stored.
    const savedDataEntries = JSON.parse(localStorage.getItem('dataEntries'));
    return savedDataEntries;
  });

  useEffect(() => {
    localStorage.setItem('dataEntries', JSON.stringify(dataEntries));
  }, [dataEntries]);



  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData({
            ...formData,
            [name]: e.target.result,
          });
        };
        reader.readAsDataURL(file);
      }
    } else {
      if (dataToEdit !== null) {
        // If dataToEdit is not null, it means you're in edit mode, so update dataToEdit
        setDataToEdit({
          ...dataToEdit,
          [name]: value,
        });
  
        // Also update formData so that the date input reflects the edited date
        setFormData({
          ...formData,
          [name]: value,
        });
  
      } else {
        // If dataToEdit is null, set formData to empty / Null
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name && !formData.profileUrl && !formData.dateOfBirth) {
      return;
    }
    if (dataToEdit !== null) {
      const updatedDataEntries = [...dataEntries];
      updatedDataEntries[dataToEdit.index] = {
        name: dataToEdit.name,
        profileUrl: formData.profileUrl,
        dateOfBirth: formData.dateOfBirth,
      };
      setDataEntries(updatedDataEntries);
      setDataToEdit(null);
    } else {
      setDataEntries([...dataEntries, formData]);
    }

    setFormData({
      name: '',
      profileUrl: null,
      dateOfBirth: '',
    });
  }


  const handleEditDataReceived = (dataToEdit) => {
    setFormData({
      name: dataToEdit.name,
      dateOfBirth: dataToEdit.dateOfBirth,
      // You may need to handle the profileUrl here if needed
    });
  };
  



  return (
    <div className='flex-item mt-3 p-4'>
      <div className='col-md-10  left-flex overflow-hidden '>
        <h1>Please Add your Data</h1>
        <Form className='w-100 m-4' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              value={
                dataToEdit !== null
                  ? dataToEdit.name
                  : formData.name
              }
              onChange={handleChange}
            />


          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Profile Url</Form.Label>
            <Form.Control
              type="file"
              name="profileUrl"
              placeholder="Upload Picture"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Date Of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              placeholder="Date of birth"
              value={
                dataToEdit !== null && dataToEdit.dateOfBirth
                  ? dataToEdit.dateOfBirth 
                  : formData.dateOfBirth
              }

              onChange={handleChange}
            />

          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className='col-md-10  w-50 right-flex  overflow-auto  '>
        <DispData dataEntries={dataEntries} setDataEntries={setDataEntries} setDataToEdit={setDataToEdit} handleEditDataReceived={handleEditDataReceived}  />
      </div>
    </div>
  );
}

export default BioDataForm;
