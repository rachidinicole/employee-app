import React, { useState } from 'react';
import './App.css';
import './assets/my logo-background.png'

import data from "./data/db.json"

function EmployeeRegistration() {
  const [employees, setEmployees] = useState(data);
  const [inputValues, setInputValues] = useState({
    id: '',
    name: '',
    email: '',
    position: '',
    image: '',
    phonenumber:'',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleAddEmployee = () => {
    const { id, name, email, position, image, phonenumber } = inputValues;
    if (id.trim() !== '' && name.trim() !== '' && email.trim() !== '' && position.trim() !== '') {
      const newEmployee = {
        id: id.trim(),
        name: name.trim(),
        email: email.trim(),
        position: position.trim(),
        image: image.trim(),
        phonenumber: phonenumber.trim()
      };
      setEmployees([...employees, newEmployee]);
      setInputValues({ id: '', name: '', email: '', position: '' });
    }
  };

  const handleDeleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== employeeId);
    setEmployees(updatedEmployees);
  };

  const handleEditEmployee = (employee) => {
    setInputValues(employee);
    setEditMode(true);
    setEditEmployeeId(employee.id);
  };

  const handleUpdateEmployee = () => {
    const { id, name, email, position, image, phonenumber } = inputValues;
    if (id.trim() !== '' && name.trim() !== '' && email.trim() !== '' && position.trim() !== '' && image.trim() !=='' && phonenumber.trim() !=='') {
      const updatedEmployees = employees.map((employee) => {
        if (employee.id === editEmployeeId) {
          return { ...inputValues };
        }
        return employee;
      });
      setEmployees(updatedEmployees);
      setInputValues({ id: '', name: '', email: '', position: '', image: '', phonenumber: '' });
      setEditMode(false);
      setEditEmployeeId(null);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='App-header'>
      <h2>Employee Registration</h2>
      <input
        type="text"
        name="id"
        value={inputValues.id}
        onChange={handleInputChange}
        placeholder="Employee ID"
      />
      <input
        type="text"
        name="name"
        value={inputValues.name}
        onChange={handleInputChange}
        placeholder="Employee Name"
      />
      <input
        type="text"
        name="email"
        value={inputValues.email}
        onChange={handleInputChange}
        placeholder="Employee Email"
      />
      <input
        type="text"
        name="position"
        value={inputValues.position}
        onChange={handleInputChange}
        placeholder="Employee Position"
      />
      <input
        type="text"
        name="image"
        value={inputValues.image}
        onChange={handleInputChange}
        placeholder="image"
        />
        <input
        type="text"
        name="phonenumber"
        value={inputValues.phonenumber}
        onChange={handleInputChange}
        placeholder="phonenumber"
        />
      {!editMode ? (
        <button onClick={handleAddEmployee}>Add Employee</button>
      ) : (
        <button onClick={handleUpdateEmployee}>Update Employee</button>
      )}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search employee"
      />
      {/* <ul> */}
        <table>
          <thead>
           <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>position</th>
            <th>image</th>
            <th>phonenumber</th>
            <th>actions</th>
           </tr>

          </thead>
          <tbody>
        {filteredEmployees.map((employee) => (
          <tr key={employee.id}>
             <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.image}</td>
              <td>{employee.phonenumber}</td>
              <td>
                <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                <button onClick={() => handleEditEmployee(employee)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* </ul> */}
    </div>
  );
}

export default EmployeeRegistration;
