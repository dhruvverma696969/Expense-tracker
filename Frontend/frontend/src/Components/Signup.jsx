import React, { useState } from "react";

const styles = {
    page: {
        minHeight: "100vh",
        width: "100%",
        background:
            "radial-gradient(1200px 600px at 10% -10%, rgba(255,140,60,0.18), transparent 60%)," +
            "radial-gradient(900px 500px at 110% 110%, rgba(255,90,40,0.15), transparent 60%)," +
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
        left: -120,
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
        right: -100,
        pointerEvents: "none",
    },
    card: {
        width: "100%",
        maxWidth: 460,
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
    brand: { display: "flex", alignItems: "center", gap: 10, marginBottom: 22 },
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
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 0,
    },
    field: { marginBottom: 14 },
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
        marginTop: 8,
    }),
    switchText: {
        textAlign: "center",
        fontSize: 14,
        color: "rgba(245,236,217,0.65)",
        marginTop: 22,
    },
    link: {
        color: "#f0c98a",
        cursor: "pointer",
        fontWeight: 500,
    },
    terms: {
        fontSize: 12,
        color: "rgba(245,236,217,0.5)",
        marginTop: 14,
        textAlign: "center",
        lineHeight: 1.5,
    },
};

export default function Signup({ onSwitch, onSubmit }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
    });
    const [errors, setErrors] = useState({});
    const [focus, setFocus] = useState("");
    const [hover, setHover] = useState(false);

    const handleChange = (k) => (e) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const next = {};
        if (!form.name.trim()) next.name = "Name is required";
        if (!form.email) next.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email))
            next.email = "Enter a valid email";
        if (!form.password) next.password = "Password is required";
        else if (form.password.length < 6) next.password = "Minimum 6 characters";
        if (form.confirm !== form.password)
            next.confirm = "Passwords do not match";
        setErrors(next);
        if (Object.keys(next).length === 0 && onSubmit) onSubmit(
            
            {
            name: form.name,
            email: form.email,
            password: form.password
        });
    };

    const fields = [
        { key: "name", label: "Full Name", type: "text", placeholder: "Alex Carter" },
        { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
        { key: "password", label: "Password", type: "password", placeholder: "••••••••" },
        { key: "confirm", label: "Confirm Password", type: "password", placeholder: "••••••••" },
    ];

    return (
        <div style={styles.page}>
            <div style={styles.glowOrb} />
            <div style={styles.glowOrb2} />

            <form style={styles.card} onSubmit={handleSubmit} noValidate>
                <div style={styles.brand}>
                    <div style={styles.brandDot} />
                    <span style={styles.brandText}>EXPENSE VAULT</span>
                </div>

                <h1 style={styles.title}>Create your account</h1>
                <p style={styles.subtitle}>
                    Start mastering your money with a premium expense experience.
                </p>

                <div style={styles.grid}>
                    {fields.map((f) => (
                        <div key={f.key} style={styles.field}>
                            <label style={styles.label}>{f.label}</label>
                            <input
                                type={f.type}
                                value={form[f.key]}
                                onChange={handleChange(f.key)}
                                onFocus={() => setFocus(f.key)}
                                onBlur={() => setFocus("")}
                                placeholder={f.placeholder}
                                style={styles.input(focus === f.key)}
                            />
                            <div style={styles.error}>{errors[f.key] || ""}</div>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    style={styles.button(hover)}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    Create Account
                </button>

                <div style={styles.terms}>
                    By signing up, you agree to our{" "}
                    <span style={styles.link}>Terms</span> and{" "}
                    <span style={styles.link}>Privacy Policy</span>.
                </div>

                <div style={styles.switchText}>
                    Already a member?{" "}
                    <span style={styles.link} onClick={onSwitch}>
                        Sign in
                    </span>
                </div>
            </form>
        </div>
    );
}