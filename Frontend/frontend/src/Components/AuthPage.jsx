import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

// Wrapper that smoothly switches between Login and Signup.
// Drop <AuthPage /> into your app wherever you want the auth screen.
export default function AuthPage({ onAuth }) {
  const [mode, setMode] = useState("login");

  const wrapperStyle = {
    animation: "authFade 0.45s ease",
  };

  return (
    <>
      <style>{`
        @keyframes authFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div key={mode} style={wrapperStyle}>
        {mode === "login" ? (
          <Login
            onSwitch={() => setMode("signup")}
            onSubmit={(data) => onAuth && onAuth("login", data)}
          />
        ) : (
          <Signup
            onSwitch={() => setMode("login")}
            onSubmit={(data) => onAuth && onAuth("signup", data)}
          />
        )}
      </div>
    </>
  );
}