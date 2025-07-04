import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Signup from "./Signup";
import FindAccount from "./FindAccount";

const AuthSwitch = ({ onClose }) => {
  const [view, setView] = useState("login");

  const handleNavigate = (to) => {
    console.log("handleNavigate 호출됨, to:", to);
    setView(to); // 'signup', 'find-id', 'find-pw'
  };

  const handleBack = () => {
    console.log("handleBack 호출됨");
    setView("login");
  };

  console.log("AuthSwitch 렌더링, 현재 view:", view);

  return (
    <div>
      {view === "login" && (
        <LoginForm
          onNavigate={handleNavigate}
          onLoginSuccess={onClose}
          isModal={true}
        />
      )}
      {view === "signup" && (
        <Signup
          onBack={handleBack}
          isModal={true}
          onClose={onClose}
        />
      )}
      {(view === "find-id" || view === "find-pw") && (
        <FindAccount
          initialTab={view}
          isModal={true}
          onClose={onClose}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default AuthSwitch;
