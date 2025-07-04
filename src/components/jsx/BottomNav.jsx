import React, { useState, useEffect } from "react";
import "../css/BottomNav.css";
import HomeIcon from "../img/svg/home.svg";
import DarkModeIcon from "../img/svg/darkmode.svg";
import SearchIcon from "../img/svg/search.svg"; // ✅ 검색 아이콘 추가
import HeartIcon from "../img/svg/heart.svg";
import LoginIcon from "../img/svg/login.svg";
import SearchModal from "../jsx/SearchModal"; // ✅ 검색 모달 import

const BottomNav = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [isSearchOpen, setSearchOpen] = useState(false); // ✅ 검색 모달 상태

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (e) => {
    e.preventDefault();
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <div className="bottom-nav">
        <a href="/"><img src={HomeIcon} alt="홈" /></a>
        <a href="#" onClick={(e) => { e.preventDefault(); setSearchOpen(true); }}>
          <img src={SearchIcon} alt="검색" />
        </a>
        <a href="#" onClick={toggleTheme}><img src={DarkModeIcon} alt="다크모드" /></a>
        <a href="/heart"><img src={HeartIcon} alt="찜" /></a>
        <a href="/login"><img src={LoginIcon} alt="로그인" /></a>
      </div>

      {/* ✅ 검색 모달 */}
      {isSearchOpen && (
        <SearchModal onClose={() => setSearchOpen(false)} />
      )}
    </>
  );
};

export default BottomNav;
