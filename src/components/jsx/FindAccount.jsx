import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FindAccount.css";

const FindIdForm = ({ onBack }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleVerification = () => {
    if (!phone) return alert("휴대폰 번호를 입력하세요");
    alert("인증번호가 발송되었습니다.");
    setIsVerified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return alert("모든 정보를 입력해주세요.");
    if (!isVerified) return alert("휴대폰 인증을 해주세요.");
    alert("입력하신 정보로 등록된 아이디를 이메일로 발송했습니다.");
    // 실제 아이디 찾기 로직 추가 가능
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <p className="find-description">
        회원가입 시 사용한 이름과 휴대폰 번호를<br /> 입력해 주세요.
        <br />
        인증 후 아이디를 이메일로 알려드립니다.
      </p>

      <div className="input-group">
        <label>이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          required
        />
      </div>

      <div className="input-group">
        <label>휴대폰 번호</label>
        <div className="input-with-button">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010-1234-5678"
            required
          />
          <button
            type="button"
            className="verify-button"
            onClick={handleVerification}
          >
            인증번호 받기
          </button>
        </div>
      </div>

      <button type="submit" className="main-button">
        아이디 찾기
      </button>

      <button type="button" className="back-button" onClick={onBack}>
        뒤로가기
      </button>
    </form>
  );
};

const FindPasswordForm = ({ onBack }) => {
  const [userId, setUserId] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleVerification = () => {
    if (!phone) return alert("휴대폰 번호를 입력하세요");
    alert("인증번호가 발송되었습니다.");
    setIsVerified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId || !phone) return alert("아이디와 휴대폰 번호를 입력해주세요.");
    if (!isVerified) return alert("휴대폰 인증을 해주세요.");

    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      alert("비밀번호는 최소 8자 이상, 영문과 숫자를 포함해야 합니다.");
      return;
    }

    alert("비밀번호가 성공적으로 변경되었습니다.");
    // 실제 비밀번호 변경 로직 추가 가능
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label>아이디</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디를 입력하세요"
          required
        />
      </div>

      <div className="input-group">
        <label>휴대폰 번호</label>
        <div className="input-with-button">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010-1234-5678"
            required
          />
          <button
            type="button"
            className="verify-button"
            onClick={handleVerification}
          >
            인증번호 받기
          </button>
        </div>
      </div>

      <div className="input-group">
        <label>새 비밀번호</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="새 비밀번호를 입력하세요"
          required
        />
      </div>

      <div className="input-group">
        <label>새 비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호를 다시 입력하세요"
          required
        />
      </div>

      <button type="submit" className="main-button">
        비밀번호 변경
      </button>

      <button type="button" className="back-button" onClick={onBack}>
        뒤로가기
      </button>
    </form>
  );
};

const FindAccount = ({ isModal, onClose, onBack, initialTab = "find-id" }) => {
  const [tab, setTab] = useState(initialTab);
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // 이전 페이지로 이동
    } else {
      navigate("/login"); // 없으면 로그인으로
    }
  };

  return (
    <div className={isModal ? "auth-modal" : "auth-page"}>
      <div className="tabs">
        <button
          className={tab === "find-id" ? "tab active" : "tab"}
          onClick={() => setTab("find-id")}
          type="button"
        >
          아이디 찾기
        </button>
        <button
          className={tab === "find-pw" ? "tab active" : "tab"}
          onClick={() => setTab("find-pw")}
          type="button"
        >
          비밀번호 찾기
        </button>
      </div>

      {tab === "find-id" ? (
        <FindIdForm onBack={handleBack} />
      ) : (
        <FindPasswordForm onBack={handleBack} />
      )}
    </div>
  );
};

export default FindAccount;
