import React from 'react';
import { motion } from 'framer-motion';
import '../css/MainTitle.css';

const MainTitle = () => {
  return (
    <div className="main-title-wrapper">
      <motion.h2
        className="main-title-line"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      >
        오늘 하루, 어떤 기분이셨나요?
      </motion.h2>

      <motion.h3
        className="main-title-line"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.5 }}
      >
        기분상점에서 마음에 드는 클래스를 골라보세요.
      </motion.h3>

      <div className="scroll-indicator">
        <span className="scroll-text">SCROLL</span>
        <div className="mouse">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default MainTitle;
