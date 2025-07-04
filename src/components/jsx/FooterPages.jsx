import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import About from "../../pages/About";
import Terms from "../../pages/Terms";
import Privacy from "../../pages/Privacy";
import Contact from "../../pages/Contact";
import "../css/FooterPages.css";

const pages = {
  about: <About />,
  terms: <Terms />,
  privacy: <Privacy />,
  contact: <Contact />,
};

const FooterPages = () => {
  const [currentPage, setCurrentPage] = useState("about");

  return (
    <div className="footer-pages-wrapper">
      <div className="footer-nav-buttons">
        <button onClick={() => setCurrentPage("about")}>회사소개</button>
        <button onClick={() => setCurrentPage("terms")}>이용약관</button>
        <button onClick={() => setCurrentPage("privacy")}>개인정보처리방침</button>
        <button onClick={() => setCurrentPage("contact")}>문의하기</button>
      </div>

      <div className="footer-slide-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="footer-slide"
          >
            {pages[currentPage]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FooterPages;
