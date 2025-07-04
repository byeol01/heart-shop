// ModalOverlay.jsx
import React, { useEffect } from "react";

const ModalOverlay = ({ onClose, children }) => {
  useEffect(() => {
    // 모달 열면 바디 스크롤 잠금
    document.body.style.overflow = "hidden";
    return () => {
      // 모달 닫으면 스크롤 복구
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button onClick={onClose} className="modal-close">
          ×
        </button>
      </div>
    </div>
  );
};

export default ModalOverlay;
