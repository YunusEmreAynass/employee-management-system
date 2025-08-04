import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import ActivateAccount from './components/ActivateAccount';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AdminDashboard from './components/AdminDashboard';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateUser from './components/UpdateUser';
import CreateUser from './components/CreateUser';
import Profile from './components/Profile';
import { ProtectedRoute, ProtectedAdmin } from './components/ProtectedRoutes';
import ManagerDashboard from './components/ManagerDashboard';
import Company from './components/Company';
import Department from './components/Department';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Departments from './components/Departments';
import Companies from './components/Companies';
import CreateDepartment from './components/createDepartment';
import CreateCompany from './components/createCompany';
import Cities from './components/Cities';
import DepartmentTypes from './components/DepartmentTypes';
import CompanyTypes from './components/CompanyTypes';
import './app.css';



const App = () => {
  const selectedLang = useSelector((state) => state.users.selectedLang);
  const { i18n } = useTranslation("global");

  useEffect(() => {
    i18n.changeLanguage(selectedLang === 'En' ? 'en' : 'tr');
  }, [selectedLang, i18n]);

  return (
  
  <>

  <Routes>
      <Route path="/admin-dashboard" element={<ProtectedAdmin><AdminDashboard /></ProtectedAdmin>} />
      <Route path="/manager-dashboard" element={<ProtectedRoute><ManagerDashboard /></ProtectedRoute>} />
    <Route path="/" element={<HomePage />} />
    <Route path="/signin" element={<SignIn />} />
      <Route path="/activate" element={<ActivateAccount />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/frontend-url/activate" element={<ActivateAccount />} />
      <Route path="/update-user" element={<ProtectedAdmin><UpdateUser /></ProtectedAdmin>} />
      <Route path="/add-user" element={<ProtectedAdmin><CreateUser /></ProtectedAdmin>} />
      <Route path="/user-profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/update-company" element={<ProtectedRoute><Company /></ProtectedRoute>} />
        <Route path="/update-department" element={<ProtectedRoute><Department /></ProtectedRoute>} />
        <Route path="/departments" element={<ProtectedAdmin><Departments /></ProtectedAdmin>} />
        <Route path="/departmanlar" element={<ProtectedAdmin><Departments /></ProtectedAdmin>} />
        <Route path="/companies" element={<ProtectedAdmin><Companies /></ProtectedAdmin>} />
        <Route path="/sirketler" element={<ProtectedAdmin><Companies /></ProtectedAdmin>} />
        <Route path="/add-department" element={<ProtectedAdmin><CreateDepartment /></ProtectedAdmin>} />
        <Route path="/add-company" element={<ProtectedAdmin><CreateCompany /></ProtectedAdmin>} />
        <Route path="/cities" element={<ProtectedAdmin><Cities /></ProtectedAdmin>} />
        <Route path="/sehirler" element={<ProtectedAdmin><Cities /></ProtectedAdmin>} />
        <Route path="/department-types" element={<ProtectedAdmin><DepartmentTypes /></ProtectedAdmin>} />
        <Route path="/departman-tipleri" element={<ProtectedAdmin><DepartmentTypes /></ProtectedAdmin>} />
        <Route path="/company-types" element={<ProtectedAdmin><CompanyTypes /></ProtectedAdmin>} />
        <Route path="/sirket-tipleri" element={<ProtectedAdmin><CompanyTypes /></ProtectedAdmin>} />

    <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

    </>
  );
};

export default App;