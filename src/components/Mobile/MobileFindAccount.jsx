// src/components/Mobile/FindAccountWrapper.jsx
import React from 'react';
import FindAccount from '../jsx/FindAccount'; // PC용
import MobileFindAccount from './MobileFindAccount'; // 모바일용
import "../css/MobileFindAccount.css";

const isMobile = window.innerWidth <= 767;

export default function FindAccountWrapper(props) {
  return isMobile ? (
    <MobileFindAccount {...props} />
  ) : (
    <FindAccount {...props} />
  );
}
