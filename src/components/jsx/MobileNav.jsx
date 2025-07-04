import React, { useState } from "react";
import "../css/MobileNav.css";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-nav">
      <button onClick={() => setOpen(!open)} className="hamburger">☰</button>
      {open && (
        <div className="mobile-menu">
          <a href="/">홈</a>
          <a href="/settings">설정</a>
          <a href="/location">위치</a>
          <a href="/login">로그인</a>
        </div>
      )}
    </div>
  );
};

export default MobileNav;