import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage'
import RequestsPage from './pages/RequestsPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from "./Navigation";

const NavPage = () => {
  return (
    <>

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>

    </>
  );
};

export default NavPage;