import React from 'react';
import { useAuth } from '../context/auth';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import '../dashboard.css'
const Dashboard = () => {
  const { getUser, isLoading, signout, getAccessToken } = useAuth(); // Asegúrate de que también revisas isLoading

  const user = getUser()
  
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  switch (user.rol) {
    case 'admin':
      return <AdminDashboard user={user}  signout={signout} getAccessToken={getAccessToken}/>;
    case 'manager':
      return <ManagerDashboard user={user} signout={signout} getAccessToken={getAccessToken}/>;
    case 'employee':
      return <EmployeeDashboard user={user} signout={signout} getAccessToken={getAccessToken} />;
    default:
      return <div>Role not recognized</div>;
  }
};

export default Dashboard;
