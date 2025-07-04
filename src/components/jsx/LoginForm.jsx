import React, { useState } from "react";
import "../css/LoginForm.css";

const LoginForm = ({ isModal, onNavigate, onLoginSuccess, onClose }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userId.trim() || !password.trim()) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId: userId.trim(), password: password.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        if (onLoginSuccess) onLoginSuccess(data.nickname);
        alert("로그인 성공!");
      } else {
        alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다.");
      console.error("로그인 오류:", error);
    }
  };

  return (
    <div className={isModal ? "login-modal" : "login-page"}>
      {isModal && onClose && (
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
      )}

      <form className="login-form" onSubmit={handleLogin} autoComplete="off">
        <h2>로그인</h2>

        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          autoComplete="off"
          name="username"
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          name="password"
        />

        <div className="login-links triple-links">
          <button
            type="button"
            className="text-button"
            onClick={() => onNavigate && onNavigate("find-id")}
          >
            아이디 찾기
          </button>
          <button
            type="button"
            className="text-button"
            onClick={() => onNavigate && onNavigate("find-pw")}
          >
            비밀번호 찾기
          </button>
          <button
            type="button"
            className="text-button"
            onClick={() => onNavigate && onNavigate("signup")}
          >
            회원가입
          </button>
        </div>

        <button type="submit" className="main-button">
          로그인
        </button>

        <div className="sns-divider">― SNS 간편 로그인 ―</div>

        <div className="social-login">
          <img
            src="/img/kakao_login.png"
            alt="카카오 로그인"
            onClick={() =>
              window.open(
                "https://kauth.kakao.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code",
                "_blank"
              )
            }
          />
          <img
            src="/img/naver_login.png"
            alt="네이버 로그인"
            onClick={() =>
              window.open(
                "https://nid.naver.com/oauth2.0/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&state=STATE_STRING",
                "_blank"
              )
            }
          />
          <img
            src="/img/google_login.png"
            alt="구글 로그인"
            onClick={() =>
              window.open(
                "https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email profile",
                "_blank"
              )
            }
          />
        </div>

        <button
          type="button"
          className="guest-button"
          onClick={() => onLoginSuccess && onLoginSuccess("Guest")}
        >
          게스트로 입장하기
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
