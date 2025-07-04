import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginScreen from '../components/Mobile/LoginScreen';
import HomeScreen from '../components/Mobile/HomeScreen';
import MobileFindAccount from '../components/Mobile/MobileFindAccount';
import MobileLocalClasses from '../components/Mobile/MobileLocalClasses';

import JoyDetailPage from '../components/jsx/JoyDetailPage';
import SadDetailPage from '../components/jsx/SadDetailPage';
import AngryDetailPage from '../components/jsx/AngryDetailPage';
import FearDetailPage from '../components/jsx/FearDetailPage';

import PaymentPage from '../pages/PaymentPage';

import BottomNav from "../components/jsx/BottomNav";

export default function MobileLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="mobile-wrapper">
      <Routes>
        <Route path="/" element={<LoginScreen setUser={setUser} />} />
        <Route
          path="/home"
          element={user ? <HomeScreen user={user} /> : <Navigate to="/" />}
        />
        <Route path="/find-account" element={<MobileFindAccount />} />
        <Route path="/local-class-slide" element={<MobileLocalClasses />} />
        <Route path="/detail/happy" element={<JoyDetailPage />} />
        <Route path="/detail/sad" element={<SadDetailPage />} />
        <Route path="/detail/aggro" element={<AngryDetailPage />} />
        <Route path="/detail/awe" element={<FearDetailPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {user && <BottomNav />}
    </div>
  );
}
