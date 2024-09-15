import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Header from './Header';
import SignUp from './User/SignUp';
import LandingPage from './LandingPage';
import Navbar from './User/Navbar';
import AdminNavbar from './Admin/AdminNavbar';
import AdminDashboard from './Admin/AdminDashboard';
import CenteredNotification from './CenteredNotification';
import UserDashboard from './Admin/UserDashboard';
import HomePage from './User/HomePage';
import UserNavbar from './User/UserNavbar';
import MaterialsPage from './Admin/MaterialsPage';
import UpdateMaterialPage from './Admin/UpdateMaterialPage';
import SuppliersPage from './Admin/SuppliersPage';
import InventoryPage from './Admin/InventoryPage';
import AboutPage from './User/AboutPage';
import ContactPage from './User/ContactPage';
import Banner from './User/Banner';
import PaymentPage from './User/PaymentPage';
import CartPage from './User/CartPage';
import MaterialDetailsPage from './User/MaterailDetailsPage';
import PurchaseSummaryPage from './User/PurchaseSummary';
import OrdersPage from './User/OrdersPage';
import ProfilePage from './Admin/ProfilePage';
import UserProfilePage from './User/UserProfile';
import SupplierHome from './Supplier/SupplierHome';

function AppRouter() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/navbar" element={<Navbar/>}/>
            <Route path="/adminnavbar" element={<AdminNavbar/>}/>
            <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/header" element={<Header/>}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/CenteredNotification" element={<CenteredNotification/>}/>
            <Route path="/user-details" element={<UserDashboard/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/usernavbar" element={<UserNavbar/>}/>
            <Route path="/material-details" element={<MaterialsPage/>}/>
            <Route path="/materials/update/:id" element={<UpdateMaterialPage />} />
            <Route path="/supplier-details" element={<SuppliersPage/>}/>
            <Route path="/inventory" element={<InventoryPage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
            <Route path="/banner" element={<Banner/>}/>
            <Route path="/checkout" element={<PaymentPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/material/:id" element={<MaterialDetailsPage/>}/>
            <Route path="/purchase-summary" element={<PurchaseSummaryPage/>}/>
            <Route path="/orders" element={<OrdersPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/userprofile-page" element={<UserProfilePage/>}/>
            <Route path="/supplierHome" element={<SupplierHome/>}/>



        </Routes>
    </Router>
  )
}

export default AppRouter
