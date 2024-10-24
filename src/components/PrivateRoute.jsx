import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth';

const PrivateRoute = () => {
  const auth = useAuth();

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
