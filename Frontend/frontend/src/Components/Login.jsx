import React, { useState } from "react";

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background:
      "radial-gradient(1200px 600px at 80% -10%, rgba(255,140,60,0.18), transparent 60%)," +
      "radial-gradient(900px 500px at -10% 110%, rgba(255,90,40,0.15), transparent 60%)," +
      "linear-gradient(160deg, #0b0b0d 0%, #111014 55%, #0a0a0c 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px",
    fontFamily:
      "'Inter', 'Segoe UI', system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif",
    color: "#f5ecd9",
    position: "relative",
    overflow: "hidden",
  },
  glowOrb: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,140,60,0.35) 0%, rgba(255,80,40,0.08) 50%, transparent 70%)",
    filter: "blur(40px)",
    top: -120,
    right: -120,
    pointerEvents: "none",
  },
  glowOrb2: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(212,170,90,0.25) 0%, transparent 70%)",
    filter: "blur(50px)",
    bottom: -120,
    left: -100,
    pointerEvents: "none",
  },
  card: {
    width: "100%",
    maxWidth: 440,
    padding: "36px 32px 32px",
    borderRadius: 24,
    background:
      "linear-gradient(160deg, rgba(28,24,22,0.85) 0%, rgba(18,16,15,0.9) 100%)",
    border: "1px solid rgba(212,170,90,0.18)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow:
      "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.02) inset, 0 0 40px rgba(255,120,60,0.08)",
    position: "relative",
    zIndex: 2,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 22,
  },
  brandDot: {
    width: 34,
    height: 34,
    borderRadius: 12,
    background:
      "linear-gradient(135deg, #f6d486 0%, #e2a55a 45%, #ff6a3d 100%)",
    boxShadow: "0 8px 24px rgba(255,120,60,0.35)",
  },
  brandText: {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 0.4,
    background: "linear-gradient(90deg, #f6e2b6, #e9b878)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    margin: 0,
    letterSpacing: -0.4,
    background:
      "linear-gradient(90deg, #fff6e0 0%, #f0c98a 60%, #ff8a5b 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    margin: "8px 0 26px",
    fontSize: 14,
    color: "rgba(245,236,217,0.6)",
  },
  field: { marginBottom: 16 },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: "rgba(245,236,217,0.55)",
    marginBottom: 8,
  },
  input: (focused) => ({
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    border: focused
      ? "1px solid rgba(255,140,60,0.55)"
      : "1px solid rgba(212,170,90,0.18)",
    background: "rgba(255,255,255,0.03)",
    color: "#f5ecd9",
    fontSize: 15,
    outline: "none",
    transition: "all 0.25s ease",
    boxShadow: focused
      ? "0 0 0 4px rgba(255,120,60,0.12), 0 0 24px rgba(255,120,60,0.18)"
      : "inset 0 1px 0 rgba(255,255,255,0.03)",
    boxSizing: "border-box",
  }),
  error: {
    minHeight: 18,
    fontSize: 12,
    color: "#ff8a5b",
    marginTop: 6,
    letterSpacing: 0.2,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "4px 0 22px",
    fontSize: 13,
  },
  remember: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "rgba(245,236,217,0.7)",
    cursor: "pointer",
  },
  link: {
    color: "#f0c98a",
    cursor: "pointer",
    fontWeight: 500,
    textDecoration: "none",
  },
  button: (hover) => ({
    width: "100%",
    padding: "14px 18px",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 0.3,
    color: "#1a0f08",
    background:
      "linear-gradient(135deg, #f6d486 0%, #e9a45a 50%, #ff6a3d 100%)",
    boxShadow: hover
      ? "0 14px 36px rgba(255,120,60,0.45), 0 0 24px rgba(255,140,60,0.35)"
      : "0 10px 28px rgba(255,120,60,0.3)",
    transform: hover ? "translateY(-1px)" : "translateY(0)",
    transition: "all 0.25s ease",
  }),
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: "22px 0 18px",
    color: "rgba(245,236,217,0.4)",
    fontSize: 12,
  },
  hr: {
    flex: 1,
    height: 1,
    background:
      "linear-gradient(90deg, transparent, rgba(212,170,90,0.25), transparent)",
    border: "none",
  },
  switchText: {
    textAlign: "center",
    fontSize: 14,
    color: "rgba(245,236,217,0.65)",
  },
};

export default function Login({ onSwitch, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState("");
  const [hover, setHover] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!email) next.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = "Enter a valid email";
    if (!password) next.password = "Password is required";
    else if (password.length < 6) next.password = "Minimum 6 characters";
    setErrors(next);
    if (Object.keys(next).length === 0 && onSubmit) {
      onSubmit({ email, password });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.glowOrb} />
      <div style={styles.glowOrb2} />

      <form style={styles.card} onSubmit={handleSubmit} noValidate>
        <div style={styles.brand}>
          <div style={styles.brandDot} />
          <span style={styles.brandText}>EXPENSE VAULT</span>
        </div>

        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.subtitle}>
          Sign in to track your spending and keep your finances glowing.
        </p>

        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocus("email")}
            onBlur={() => setFocus("")}
            placeholder="you@example.com"
            style={styles.input(focus === "email")}
          />
          <div style={styles.error}>{errors.email || ""}</div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocus("password")}
            onBlur={() => setFocus("")}
            placeholder="••••••••"
            style={styles.input(focus === "password")}
          />
          <div style={styles.error}>{errors.password || ""}</div>
        </div>

        <div style={styles.row}>
          <label style={styles.remember}>
            <input type="checkbox" style={{ accentColor: "#e9a45a" }} />
            Remember me
          </label>
          <span style={styles.link}>Forgot password?</span>
        </div>

        <button
          type="submit"
          style={styles.button(hover)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Sign In
        </button>

        <div style={styles.divider}>
          <hr style={styles.hr} />
          <span>or</span>
          <hr style={styles.hr} />
        </div>

        <div style={styles.switchText}>
          New here?{" "}
          <span style={styles.link} onClick={onSwitch}>
            Create an account
          </span>
        </div>
      </form>
    </div>
  );
}