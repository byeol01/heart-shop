// Footer.jsx
import { Link } from "react-router-dom";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container wrap">
        <p className="site-name">기분상점 – 박선아 & 이한별 포트폴리오</p>
        <ul className="footer-links">
          <li><Link to="/footer-pages" state={{ page: "about" }}>회사소개</Link></li>
          <li><Link to="/footer-pages" state={{ page: "terms" }}>이용약관</Link></li>
          <li><Link to="/footer-pages" state={{ page: "privacy" }}>개인정보처리방침</Link></li>
          <li><Link to="/footer-pages" state={{ page: "contact" }}>문의하기</Link></li>
        </ul>
        <p className="copyright">
          &copy; 2025 기분상점. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
