import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return <Button variant='contained' onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
