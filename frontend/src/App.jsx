import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import CreateEmployee from './pages/employee/CreateEmployee';
import EmployeeList from './pages/employee/employeeList';
import EditEmployee from './pages/employee/EditEmployee';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path='employee/create' element={<CreateEmployee/>}/>
            <Route path='employee/manage' element={<EmployeeList/>}/>
            <Route path='employee/edit/:id' element={<EditEmployee/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;