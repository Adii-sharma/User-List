import React, { useState } from 'react';
import { User } from '../types';
import '../styles/form.css';

interface AddUserProps {
  onAddUser: (user: User) => boolean;
  onCancel: () => void;
}

const AddUser: React.FC<AddUserProps> = ({ onAddUser, onCancel }) => {
  const [formData, setFormData] = useState<User>({
    username: '',
    first_name: '',
    last_name: '',
    age: 0,
    marital_status: '',
    is_employed: false,
    is_founder: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' 
          ? Number(value) 
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddUser(formData);
  };

  return (
    <form className="userForm" onSubmit={handleSubmit}>
      <div className="inputGroup">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          required
          min="0"
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="marital_status">Marital Status</label>
        <input
          type="text"
          id="marital_status"
          name="marital_status"
          value={formData.marital_status}
          onChange={handleInputChange}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="is_employed">Employment Status</label>
        <input
          type="checkbox"
          id="is_employed"
          name="is_employed"
          checked={formData.is_employed}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancelButton">
          Cancel
        </button>
        <button type="submit" className="submitButton">
          Add User
        </button>
      </div>
    </form>
  );
};

export default AddUser;