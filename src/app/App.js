import React from 'react';
import Routes from '../routes';

import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../hooks/auth';

import './App.scss';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
      <ToastContainer />
    </AuthProvider>
  );
}