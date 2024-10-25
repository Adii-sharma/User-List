import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../types';
import AddUser from './AddUser';
import EditUser from './EditUser';
import Modal from './Modal';
import '../styles/user.css';

interface UserListProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserList: React.FC<UserListProps> = ({ users, setUsers }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://mocki.io/v1/a6a0fb6b-a84a-4934-b3f2-5c92cc77c44e');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (users.length === 0) {
      fetchUsers();
    }
  }, [setUsers, users.length]);

  const handleDelete = (username: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prevUsers => prevUsers.filter(user => user.username !== username));
    }
  };

  const handleAddUser = (newUser: User) => {
    if (users.some(user => user.username === newUser.username)) {
      alert('Username already exists! Please choose a different username.');
      return false;
    }
    setUsers(prevUsers => [...prevUsers, newUser]);
    setShowAddModal(false);
    return true;
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.username === updatedUser.username ? updatedUser : user
      )
    );
    setShowEditModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="userTable">
      <h2 className="header">User Management App</h2>
      <button onClick={() => setShowAddModal(true)} className="addButton">
        Add User
      </button>
      
      <table className="userTable-content">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Marital Status</th>
            <th>Employment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='userTable-tbody' >
          {users.map((user, index) => (
            <tr key={user.username}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.age}</td>
              <td>{user.marital_status}</td>
              <td>{user.is_employed ? 'Employed' : 'Unemployed'}</td>
              <td className="actionButtons">
                <button 
                  className="editButton"
                  onClick={() => handleEditClick(user)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button 
                  className="deleteButton" 
                  onClick={() => handleDelete(user.username)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Add New User"
      >
        <AddUser 
          onAddUser={handleAddUser} 
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      <Modal 
        isOpen={showEditModal} 
        onClose={() => {
          setShowEditModal(false);
          setSelectedUser(null);
        }}
        title="Edit User"
      >
        {selectedUser && (
          <EditUser 
            user={selectedUser}
            onUpdateUser={handleUpdateUser} 
            onCancel={() => {
              setShowEditModal(false);
              setSelectedUser(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default UserList;
