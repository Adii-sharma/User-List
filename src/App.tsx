import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import { User } from './types';
import './styles/user.css';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <BrowserRouter>
      <div className="app-container" >
        <Routes>
          <Route path="/*" element={<UserList users={users} setUsers={setUsers} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

