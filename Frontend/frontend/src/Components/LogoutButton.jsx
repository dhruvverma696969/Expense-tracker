import React, { useState } from "react";

export default function LogoutButton({ onLogout }) {
  const [hover, setHover] = useState(false);

  const style = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 18px",
    borderRadius: 12,
    cursor: "pointer",
    fontFamily:
      "'Inter', 'Segoe UI', system-ui, -apple-system, Roboto, sans-serif",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.3,
    color: hover ? "#1a0f08" : "#f6d486",
    background: hover
      ? "linear-gradient(135deg, #f6d486 0%, #e9a45a 50%, #ff6a3d 100%)"
      : "rgba(255,255,255,0.03)",
    border: "1px solid rgba(212,170,90,0.35)",
    boxShadow: hover
      ? "0 12px 30px rgba(255,120,60,0.4), 0 0 22px rgba(255,140,60,0.3)"
      : "inset 0 1px 0 rgba(255,255,255,0.04)",
    transition: "all 0.25s ease",
    transform: hover ? "translateY(-1px)" : "translateY(0)",
  };

  const iconStyle = {
    width: 16,
    height: 16,
    display: "inline-block",
  };

  return (
    <button
      type="button"
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onLogout}
    >
      <svg
        style={iconStyle}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      Logout
    </button>
  );
}