import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Header from "./Header";
import Main from "./Main";
import MainTitle from "./MainTitle";
import IntroReveal from "./IntroReveal";
import Footer from "./Footer";
import FooterPages from "./FooterPages";
import JoyDetailPage from "./JoyDetailPage";
import SadDetailPage from "./SadDetailPage";
import AngryDetailPage from "./AngryDetailPage";
import FearDetailPage from "./FearDetailPage";
import PaymentPage from "../../pages/PaymentPage";
import About from "../../pages/About";
import Terms from "../../pages/Terms";
import Privacy from "../../pages/Privacy";
import Contact from "../../pages/Contact";
import AuthSwitch from "./AuthSwitch"; // 로그인 모달 전용

function LayoutWrapper({ children, showTitle, setShowTitle }) {
  const location = useLocation();

  const isEmotionPage = ['/joy', '/sad', '/angry', '/fear'].some(path =>
    location.pathname.startsWith(path)
  );
  const noTitlePaths = ['/payment', '/about', '/terms', '/privacy', '/contact', '/footer-pages'];
  const isNoTitlePage = noTitlePaths.some(path => location.pathname.startsWith(path));
  const isIntroPage = !isEmotionPage && !isNoTitlePage;
  const isMainPage = location.pathname === '/';

  return (
    <div className="app-container">
      <Header onLoginClick={() => setShowTitle(true)} /> {/* 예시: 헤더에서 로그인 아이콘 클릭 */}
      {isIntroPage && !showTitle && (
        <IntroReveal onDone={() => setShowTitle(true)} />
      )}
      {isMainPage && <MainTitle />}
      {(!isIntroPage || showTitle) && children}
    </div>
  );
}

export default function DesktopLayout() {
  const [showTitle, setShowTitle] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <LayoutWrapper showTitle={showTitle} setShowTitle={setShowTitle}>
      <main className="main-content">
        <Routes>
          <Route path="/" element={showTitle ? <Main /> : null} />
          {/* 로그인 관련 경로 전부 삭제 */}
          <Route path="/joy" element={<JoyDetailPage />} />
          <Route path="/sad" element={<SadDetailPage />} />
          <Route path="/angry" element={<AngryDetailPage />} />
          <Route path="/fear" element={<FearDetailPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/footer-pages" element={<FooterPages />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />

      {/* 로그인 모달 */}
      {isLoginOpen && (
        <div className="modal-overlay" onClick={() => setIsLoginOpen(false)}>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <AuthSwitch isModal={true} onClose={() => setIsLoginOpen(false)} />
          </div>
        </div>
      )}
    </LayoutWrapper>
  );
}
