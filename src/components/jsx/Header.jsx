import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import SearchModal from '../jsx/SearchModal';
import AuthSwitch from '../jsx/AuthSwitch';
import logo from '../img/logo.png';

const Header = () => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <header>
        <nav>
          <h2><li><Link to="/" className="block"><img src={logo} alt="기분상점로고" /></Link></li></h2>
          <ul>
            <li><Link to="/" className="block">홈</Link></li>
            <li>
              <a
                href="#"
                className="block btn-search"
                onClick={e => { e.preventDefault(); setSearchOpen(true); }}
              />
            </li>
            <li><a href="#" className="block">위치</a></li>
            <li>
              <a
                href="#"
                className="block"
                onClick={e => {
                  e.preventDefault();
                  toggleTheme();
                }}
              >
                {theme === 'light' ? '🌙 다크모드' : '☀️ 라이트모드'}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block"
                onClick={e => {
                  e.preventDefault();
                  setLoginOpen(true);
                }}
              >
                로그인
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {isSearchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

      {/* 로그인 모달 */}
      {isLoginOpen && (
        <div className="modal-overlay" onClick={() => setLoginOpen(false)}>
          <div className="modal-wrapper" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setLoginOpen(false)}>×</button>
            <AuthSwitch onClose={() => setLoginOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
