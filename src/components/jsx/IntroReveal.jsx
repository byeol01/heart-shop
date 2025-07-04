import React from 'react';
import { motion } from 'framer-motion';
import '../css/IntroReveal.css';

const IntroReveal = ({ onDone }) => {
  return (
    <div className="intro-reveal">
      <motion.div
        className="door left-door"
        initial={{ x: 0 }}
        animate={{ x: '-100%' }} // 자신의 크기만큼 이동 = 뷰포트 밖
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <motion.div
        className="door right-door"
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        onAnimationComplete={onDone}
      />
    </div>
  );
};

export default IntroReveal;
