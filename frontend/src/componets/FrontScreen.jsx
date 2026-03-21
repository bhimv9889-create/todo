import { useEffect, useRef } from "react";
import "./FrontScreen.css"

export default function FrontScreen({ onFinish }) {

    useEffect(() => {
        const timer = setTimeout(() => onFinish(), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="splash-wrapper">

            {/* Floating particles */}
            {[...Array(18)].map((_, i) => (
                <div key={i} className="particle" style={{
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 6 + 3}px`,
                    height: `${Math.random() * 6 + 3}px`,
                    animationDuration: `${Math.random() * 4 + 3}s`,
                    animationDelay: `${Math.random() * 4}s`,
                    opacity: Math.random() * 0.6 + 0.2,
                    background: ['#8b5cf6', '#6366f1', '#a78bfa', '#c4b5fd', '#e9d5ff'][Math.floor(Math.random() * 5)]
                }} />
            ))}

            {/* Pulse rings */}
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ring ring-3" />

            {/* Main content */}
            <div className="splash-content">

                {/* Logo */}
                <div className="logo-float">
                    <div className="logo-circle">
                        <svg width="64" height="64" viewBox="0 0 1024 1024">
                            <defs>
                                <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                            <rect width="1024" height="1024" rx="220" fill="url(#lg)" />
                            <g transform="translate(512,480) rotate(-40)">
                                <rect x="-52" y="-270" width="104" height="62" rx="16" fill="#fde68a" />
                                <rect x="-52" y="-210" width="104" height="28" rx="4" fill="#fff" opacity=".4" />
                                <rect x="-52" y="-182" width="104" height="320" rx="10" fill="#fff" />
                                <rect x="-52" y="-182" width="28" height="320" rx="10" fill="#e0e7ff" opacity=".5" />
                                <polygon points="-52,138 52,138 0,250" fill="#fde68a" />
                                <polygon points="-16,200 16,200 0,250" fill="#6b7280" />
                            </g>
                            <circle cx="720" cy="290" r="90" fill="#fff" />
                            <polyline points="676,290 706,322 766,258" stroke="#6366f1" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                    </div>
                </div>

                <h1 className="splash-title">TODO</h1>
                <p className="splash-tagline">organize your life</p>

                <div className="splash-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>
        </div>
    );
}