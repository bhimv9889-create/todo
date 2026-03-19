
import React, { useState } from "react";
import './Auth.css'
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom";

export default function LoginAuth({ setIsLoggedIn }) {
    const [rightPanel, setRightPanel] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const url = rightPanel
                ? "http://localhost:8000/api/users/register"
                : "http://localhost:8000/api/users/login";

            const bodyData = rightPanel
                ? {
                    name: form.name,
                    email: form.email,
                    username: form.username,
                    password: form.password,
                }
                : {
                    username: form.username,
                    password: form.password,
                };

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            if (!rightPanel) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.user.username);
                setIsLoggedIn(true);
                navigate("/")
            } else {

                setRightPanel(false);
            }
        } catch (err) {
            setError(err.message);
        }
    };




    return (
        <div className="auth-page">
            <div className={` container ${rightPanel ? "right-panel-active" : ""}`}>

                <div className="form-container sign-up-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Create Account</h1>

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />

                        <input
                            type="text"
                            placeholder="Username"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />

                        <button type="submit">Register</button>
                        <p className="auth-link">
                            Already have an account?{" "}
                            <span onClick={() => setRightPanel(false)}>Login</span>
                        </p>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <input
                            type="text"
                            placeholder="Username"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />

                        <button type="submit">Login</button>
                        <p className="auth-link">
                            Don't have an account?{" "}
                            <span onClick={() => setRightPanel(true)}>Register</span>
                        </p>
                    </form>
                </div>


                <div className="overlay-container">
                    <div className="overlay">

                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>Login with your username and password</p>
                            <button
                                className="ghost"
                                onClick={() => setRightPanel(false)}
                            >
                                Login
                            </button>
                            <div className="google-login">
                                <GoogleLogin
                                    onSuccess={async (credentialResponse) => {

                                        const decoded = jwtDecode(credentialResponse.credential)

                                        const res = await fetch("http://localhost:8000/api/users/google-login", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(decoded)
                                        })

                                        const data = await res.json()


                                        localStorage.setItem("token", data.token)
                                        localStorage.setItem("username", data.name)

                                        setIsLoggedIn(true)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register and start managing your notes</p>
                            <button
                                className="ghost"
                                onClick={() => setRightPanel(true)}
                            >
                                Register
                            </button>
                            <div className="google-login">
                                <GoogleLogin

                                    onSuccess={async (credentialResponse) => {

                                        const decoded = jwtDecode(credentialResponse.credential)

                                        const res = await fetch("http://localhost:8000/api/users/google-login", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(decoded)
                                        })

                                        const data = await res.json()


                                        localStorage.setItem("token", data.token)
                                        localStorage.setItem("username", data.name)

                                        setIsLoggedIn(true)
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}