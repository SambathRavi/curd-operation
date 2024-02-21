// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addUser = async () => {
    try {
      const response = await axios.post(API_URL, formData);
      setUsers([...users, response.data]);
      setFormData({ name: '', email: '', username: '' });
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  };

  const editUser = async (id, newData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, newData);
      const updatedUsers = users.map((user) =>
        user.id === id ? response.data : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error editing user: ', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  return (
    <div className="container-fluid bg-light">
      <div className="container mt-5">
        <h1 className="text-center mb-4">User Management System</h1>
        <div className="mb-4">
          <h2>Add User</h2>
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control mb-2"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control mb-2"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control mb-2"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>
            <div className="col-md-3">
              <button className="btn btn-primary" onClick={addUser}>Add User</button>
            </div>
          </div>
        </div>
        <div>
          <h2>Users</h2>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>
                    <button className="btn btn-warning me-2" onClick={() => editUser(user.id, formData)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
