import React, { useState, useEffect } from 'react';
import { 
  Zap, Award, Mic, Users, Phone, Mail, MapPin, ChevronDown, Menu, X, 
  CheckCircle, ArrowRight, Star, Briefcase, Camera, Handshake, Sparkles, 
  TrendingUp, Shield, Clock, Trophy 
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// ==========================================
// 🔴 PASTE YOUR FIREBASE CONFIG HERE 🔴
// ==========================================
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE", 
  authDomain: "ss-group-xxxx.firebaseapp.com",
  projectId: "ss-group-xxxx",
  storageBucket: "ss-group-xxxx.appspot.com",
  messagingSenderId: "12345...",
  appId: "1:12345..."
};
// ==========================================

let app, auth, db;
try {
  if (firebaseConfig.apiKey !== "PASTE_YOUR_API_KEY_HERE") {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  }
} catch (e) {
  console.error("Firebase Init Error:", e);
}

// --- ENHANCED STYLES ---
const styles = `
  /* SCROLL & BASIC */
  @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .animate-scroll { animation: scroll 30s linear infinite; }
  
  /* On desktop, pause on hover. On mobile, we disable this to prevent 'stuck' feeling */
  @media (min-width: 768px) {
    .animate-scroll:hover { animation-play-state: paused; }
  }

  /* ENHANCED CINEMATIC EFFECTS */
  @keyframes pulse-glow {
    0%, 100% { 
      box-shadow: 0 0 20px rgba(234, 179, 8, 0.3),
                  0 0 40px rgba(234, 179, 8, 0.2),
                  inset 0 0 20px rgba(234, 179, 8, 0.1);
    }
    50% { 
      box-shadow: 0 0 40px rgba(234, 179, 8, 0.6),
                  0 0 80px rgba(234, 179, 8, 0.4),
                  inset 0 0 30px rgba(234, 179, 8, 0.2);
    }
  }

  @keyframes slide-up {
    0% { transform: translateY(100px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }

  /* MAGICAL TEXT EFFECTS */
  @keyframes text-shimmer {
    0% { background-position: -500px 0; }
    100% { background-position: 500px 0; }
  }

  .text-shimmer {
    background: linear-gradient(90deg, 
      #fff 0%, 
      #fef08a 25%,
      #fbbf24 50%,
      #fef08a 75%,
      #fff 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: text-shimmer 3s linear infinite;
  }

  /* INTRO ANIMATIONS */
  @keyframes come-out { 
    0% { transform: scale(0) rotate(-180deg); opacity: 0; } 
    60% { transform: scale(1.2) rotate(10deg); opacity: 1; } 
    100% { transform: scale(1) rotate(0deg); opacity: 1; } 
  }
  @keyframes zoom-out-exit { 
    0% { transform: scale(1); opacity: 1; } 
    100% { transform: scale(15); opacity: 0; } 
  }
  .animate-come-out { animation: come-out 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  .animate-zoom-out-exit { animation: zoom-out-exit 0.8s ease-in forwards; }
  
  .cursor-blink { animation: blink 1s step-end infinite; }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

  .text-gold-luxury {
    background: linear-gradient(to bottom, 
      #fef9c3 0%, 
      #fbbf24 30%,
      #d97706 60%,
      #92400e 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 2px 8px rgba(251, 191, 36, 0.5));
  }

  /* STARFIELD */
  .hero-stars {
    background-image: 
      radial-gradient(2px 2px at 20% 30%, white, transparent),
      radial-gradient(2px 2px at 60% 70%, white, transparent),
      radial-gradient(1px 1px at 50% 50%, white, transparent),
      radial-gradient(1px 1px at 80% 10%, white, transparent),
      radial-gradient(2px 2px at 90% 60%, white, transparent),
      radial-gradient(1px 1px at 33% 80%, white, transparent);
    background-size: 200% 200%;
    animation: stars-twinkle 8s ease-in-out infinite;
  }

  @keyframes stars-twinkle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* PARTICLE EFFECT */
  @keyframes particle-float {
    0% { transform: translateY(0) translateX(0) scale(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100vh) translateX(50px) scale(1); opacity: 0; }
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, #fbbf24, transparent);
    border-radius: 50%;
    pointer-events: none;
    animation: particle-float 8s linear infinite;
  }

  /* CARD HOVER EFFECTS */
  .card-hover-glow {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-hover-glow:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 20px 60px rgba(234, 179, 8, 0.3),
      0 0 40px rgba(234, 179, 8, 0.2);
  }

  .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
  .animate-float-gentle { animation: float-gentle 4s ease-in-out infinite; }
  .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
  
  @keyframes float-gentle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  /* NUMBER COUNTER ANIMATION */
  @keyframes count-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .stat-number {
    animation: count-up 1s ease-out forwards;
  }
`;

// --- CUSTOM CSS LOGO (Enhanced for Mobile) ---
const CSSLogo = ({ scale = 1, typingText = null, showFullTagline = true, simpleMode = false }) => {
  const tagline = "YOUR REPUTATION IS OUR \"PRIORITY\"";
  const displayTagline = typingText !== null ? typingText : (showFullTagline ? tagline : "");

  return (
    <div className="relative flex flex-col items-center" style={{ transform: `scale(${scale})` }}>
      <div className={`absolute flex flex-col items-center z-10 ${simpleMode ? '-top-9' : '-top-12'}`}>
        <div className="flex space-x-1 mb-1 items-end">
          <Star size={simpleMode ? 8 : 12} className="text-yellow-500 fill-yellow-500 animate-pulse" style={{animationDelay: '0s'}} />
          <Star size={simpleMode ? 12 : 18} className="text-yellow-300 fill-yellow-300 mb-1 animate-pulse" style={{animationDelay: '0.2s'}} />
          <Star size={simpleMode ? 8 : 12} className="text-yellow-500 fill-yellow-500 animate-pulse" style={{animationDelay: '0.4s'}} />
        </div>
        <div className={`relative ${simpleMode ? 'w-16 h-6' : 'w-24 h-8'}`}>
            <div className="absolute bottom-0 w-full h-full bg-gradient-to-b from-gray-200 to-white rounded-b-full rounded-t-[50%] shadow-lg z-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-300 to-transparent opacity-50"></div>
            </div>
            <div className="absolute bottom-3 w-full flex justify-center items-end space-x-0.5 z-10">
              <div className={`${simpleMode ? 'w-2 h-2' : 'w-3 h-3'} bg-white rounded-full shadow-sm`}></div>
              <div className={`${simpleMode ? 'w-3 h-3' : 'w-4 h-4'} bg-white rounded-full shadow-sm mb-1`}></div>
              <div className={`${simpleMode ? 'w-4 h-4' : 'w-5 h-5'} bg-white rounded-full shadow-sm mb-2`}></div>
              <div className={`${simpleMode ? 'w-3 h-3' : 'w-4 h-4'} bg-white rounded-full shadow-sm mb-1`}></div>
              <div className={`${simpleMode ? 'w-2 h-2' : 'w-3 h-3'} bg-white rounded-full shadow-sm`}></div>
            </div>
        </div>
      </div>

      <div className={`relative border-l-4 border-r-4 border-b-4 border-yellow-600 min-w-[300px] ${simpleMode ? 'px-4 pt-4 pb-2 min-w-[220px]' : 'px-10 pt-8 pb-4'} bg-gradient-to-b from-black via-neutral-900 to-black`}>
        <div className="absolute top-0 left-0 w-[32%] h-1 bg-yellow-500 shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
        <div className="absolute top-0 left-0 w-1 h-6 bg-yellow-500"></div>
        <div className="absolute top-0 right-0 w-[32%] h-1 bg-yellow-500 shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
        <div className="absolute top-0 right-0 w-1 h-6 bg-yellow-500"></div>

        <h1 className={`${simpleMode ? 'text-5xl' : 'text-7xl'} font-black tracking-wide text-gold-luxury font-sans leading-none text-center`}>
          SS GROUP
        </h1>
        
        {!simpleMode && (
          <p className="text-center font-serif text-2xl text-yellow-100 tracking-[0.1em] mt-2 italic drop-shadow-[0_2px_10px_rgba(251,191,36,0.5)]">
            The Silent Sage
          </p>
        )}
      </div>

      {!simpleMode && (
        <div className="h-8 mt-4 flex items-center justify-center">
          <p className="text-[0.7rem] md:text-[0.8rem] text-yellow-500 tracking-[0.2em] uppercase font-bold text-center min-w-[300px]">
            {displayTagline}
            {typingText !== null && typingText.length < tagline.length && (
               <span className="cursor-blink text-yellow-200 ml-1">|</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

// --- INTRO ANIMATION ---
const IntroAnimation = ({ onComplete }) => {
  const [text, setText] = useState("");
  const tagline = "YOUR REPUTATION IS OUR \"PRIORITY\"";
  const [phase, setPhase] = useState('logo'); 

  useEffect(() => {
    const typeStartTimer = setTimeout(() => { setPhase('typing'); }, 1500); 
    return () => clearTimeout(typeStartTimer);
  }, []);

  useEffect(() => {
    if (phase === 'typing') {
      if (text.length < tagline.length) {
        const timeout = setTimeout(() => { setText(tagline.slice(0, text.length + 1)); }, 50); 
        return () => clearTimeout(timeout);
      } else {
        const exitTimer = setTimeout(() => { setPhase('exit'); setTimeout(onComplete, 800); }, 1000);
        return () => clearTimeout(exitTimer);
      }
    }
  }, [text, phase, tagline, onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden ${phase === 'exit' ? 'animate-zoom-out-exit' : ''}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/30 via-black to-black pointer-events-none"></div>
      <div className="absolute inset-0 hero-stars opacity-30"></div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className={`animate-come-out`}>
           <CSSLogo scale={1.2} typingText={phase === 'logo' ? "" : text} showFullTagline={true} />
        </div>
      </div>
    </div>
  );
};

// --- FLOATING PARTICLES ---
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 8 + Math.random() * 4
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}
    </div>
  );
};

// --- ENHANCED CINEMATIC HERO (With SVG & FIX for Line 471) ---
const EnhancedCinematicHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full min-h-[70vh] relative flex flex-col items-center justify-center overflow-visible py-12">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-600/10 rounded-full blur-[150px] animate-pulse-glow"></div>

      {/* Main Visual */}
      <div 
        className="relative w-full max-w-6xl transform transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${mousePos.y * 0.1}deg) rotateY(${mousePos.x * 0.1}deg)`
        }}
      >
        <svg className="w-full h-auto" viewBox="0 0 1200 700" style={{filter: 'drop-shadow(0 10px 50px rgba(234, 179, 8, 0.3))'}}>
          <defs>
            <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            
            <linearGradient id="cyanShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cffafe" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <radialGradient id="spotGlow">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* Connection Lines with Glow */}
          <g opacity="0.6">
            <line x1="250" y1="500" x2="600" y2="300" stroke="url(#goldShine)" strokeWidth="3" strokeDasharray="10,5" filter="url(#glow)">
              <animate attributeName="stroke-dashoffset" from="0" to="30" dur="2s" repeatCount="indefinite"/>
            </line>
            <line x1="950" y1="500" x2="600" y2="300" stroke="url(#cyanShine)" strokeWidth="3" strokeDasharray="10,5" filter="url(#glow)">
              <animate attributeName="stroke-dashoffset" from="0" to="30" dur="2s" repeatCount="indefinite"/>
            </line>
          </g>

          {/* LEFT: BUSINESS REALM */}
          <g transform="translate(250, 500)" className="cursor-pointer" style={{transition: 'transform 0.3s'}}>
            {/* Cityscape */}
            <rect x="-80" y="-150" width="30" height="150" fill="#1a1a1a" stroke="#fbbf24" strokeWidth="2"/>
            <rect x="-40" y="-120" width="25" height="120" fill="#262626" stroke="#fbbf24" strokeWidth="2"/>
            <rect x="-10" y="-180" width="35" height="180" fill="#1a1a1a" stroke="#fbbf24" strokeWidth="2"/>
            <rect x="30" y="-140" width="30" height="140" fill="#262626" stroke="#fbbf24" strokeWidth="2"/>
            <rect x="65" y="-110" width="25" height="110" fill="#1a1a1a" stroke="#fbbf24" strokeWidth="2"/>
            
            {/* Windows */}
            {Array.from({length: 20}).map((_, i) => (
              <rect 
                key={i}
                x={-70 + (i % 5) * 30} 
                y={-130 + Math.floor(i / 5) * 30} 
                width="8" 
                height="8" 
                fill="#fbbf24" 
                opacity={0.3 + Math.random() * 0.4}
              >
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + Math.random() * 2}s`} repeatCount="indefinite"/>
              </rect>
            ))}

            {/* Label */}
            <text y="40" className="text-lg font-black uppercase tracking-[0.3em]" fill="url(#goldShine)" textAnchor="middle">
              BRANDS
            </text>
            <text y="65" className="text-xs uppercase tracking-widest opacity-60" fill="#fbbf24" textAnchor="middle">
              Seeking Impact
            </text>
          </g>

          {/* CENTER: SS GROUP HUB */}
          <g transform="translate(600, 300)">
            {/* Pulsing Energy Ring */}
            <circle cx="0" cy="0" r="120" fill="none" stroke="url(#goldShine)" strokeWidth="2" opacity="0.3">
              <animate attributeName="r" values="120;140;120" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/>
            </circle>
            
            {/* Core Sphere */}
            <circle cx="0" cy="0" r="100" fill="rgba(0,0,0,0.95)" stroke="url(#goldShine)" strokeWidth="4" filter="url(#glow)"/>
            <circle cx="0" cy="0" r="95" fill="url(#spotGlow)" opacity="0.2"/>
            
            {/* Handshake Symbol */}
            <g transform="scale(2)">
              <path d="M-15,5 L-5,-5 M5,-5 L15,5" stroke="url(#goldShine)" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#glow)"/>
              <path d="M-5,-5 L5,5" stroke="url(#goldShine)" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#glow)"/>
              <circle cx="-5" cy="-5" r="2" fill="#fbbf24"/>
              <circle cx="5" cy="-5" r="2" fill="#fbbf24"/>
            </g>

            {/* Orbiting Elements */}
            <circle cx="0" cy="-110" r="8" fill="#fbbf24" filter="url(#glow)">
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="8s" repeatCount="indefinite"/>
            </circle>
            <circle cx="0" cy="-110" r="8" fill="#22d3ee" filter="url(#glow)">
              <animateTransform attributeName="transform" type="rotate" from="180 0 0" to="540 0 0" dur="8s" repeatCount="indefinite"/>
            </circle>

            {/* Label Plate */}
            <g transform="translate(0, 180)">
              <rect x="-150" y="-45" width="300" height="90" rx="8" fill="rgba(0,0,0,0.9)" stroke="url(#goldShine)" strokeWidth="3"/>
              
              {/* Crown Icon */}
              <g transform="translate(0, -55)">
                <path d="M-20,0 L-10,-15 L0,-5 L10,-15 L20,0 Z" fill="url(#goldShine)" filter="url(#glow)"/>
                <circle cx="-10" cy="-15" r="3" fill="#fff"/>
                <circle cx="0" cy="-5" r="3" fill="#fff"/>
                <circle cx="10" cy="-15" r="3" fill="#fff"/>
              </g>

              <text y="5" className="text-5xl font-black" fill="url(#goldShine)" textAnchor="middle" filter="url(#glow)">
                SS GROUP
              </text>
              <text y="30" className="text-xl italic" fill="#fef9c3" textAnchor="middle" style={{fontFamily: 'serif'}}>
                The Bridge Maker
              </text>
            </g>
          </g>

          {/* RIGHT: STARDOM REALM */}
          <g transform="translate(950, 500)" className="cursor-pointer" style={{transition: 'transform 0.3s'}}>
            {/* Stage Setup */}
            <rect x="-80" y="-30" width="160" height="30" fill="#1a1a1a" stroke="#22d3ee" strokeWidth="2"/>
            
            {/* Spotlights */}
            <g opacity="0.4">
              <polygon points="-60,0 -80,-200 -40,-200" fill="url(#spotGlow)">
                <animateTransform attributeName="transform" type="rotate" values="0 -60 0;-10 -60 0;0 -60 0" dur="4s" repeatCount="indefinite"/>
              </polygon>
              <polygon points="0,0 -20,-200 20,-200" fill="url(#spotGlow)">
                <animateTransform attributeName="transform" type="rotate" values="0 0 0;10 0 0;0 0 0" dur="5s" repeatCount="indefinite"/>
              </polygon>
              <polygon points="60,0 40,-200 80,-200" fill="url(#spotGlow)">
                <animateTransform attributeName="transform" type="rotate" values="0 60 0;-10 60 0;0 60 0" dur="4.5s" repeatCount="indefinite"/>
              </polygon>
            </g>

            {/* Star Icon - FIXED THE ERROR HERE */}
            <path d="M0,-120 L12,-85 L50,-85 L20,-60 L30,-25 L0,-50 L-30,-25 L-20,-60 L-50,-85 L-12,-85 Z" 
                  fill="none" stroke="url(#cyanShine)" strokeWidth="4" filter="url(#glow)">
              <animateTransform attributeName="transform" type="rotate" from="0 0 -70" to="360 0 -70" dur="20s" repeatCount="indefinite"/>
            </path>
            <circle cx="0" cy="-120" r="8" fill="#22d3ee" filter="url(#glow)">
              <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
            </circle>

            {/* Label */}
            <text y="65" className="text-lg font-black uppercase tracking-[0.3em]" fill="url(#cyanShine)" textAnchor="middle">
              CELEBRITIES
            </text>
            <text y="90" className="text-xs uppercase tracking-widest opacity-60" fill="#22d3ee" textAnchor="middle">
              Creating Magic
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom Tagline */}
      <div className="mt-12 text-center animate-slide-up" style={{animationDelay: '0.5s', opacity: 0}}>
        <p className="text-sm text-yellow-600 uppercase tracking-[0.4em] font-bold mb-2">
          We Don't Just Connect
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          We Create <span className="text-shimmer">Legendary Moments</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Where business ambition meets star power, and ordinary campaigns become cultural phenomena
        </p>
      </div>
    </div>
  );
};

// --- NEW COMPONENT: CELEBRITY SLIDER STRIP (OPTIMIZED FOR MOBILE) ---
const CelebritySliderStrip = () => {
  // Placeholder data
  const celebrityList = [
    { name: "Bollywood Star", role: "Actor", color: "bg-red-500" },
    { name: "Cricket Icon", role: "Athlete", color: "bg-blue-500" },
    { name: "Music Sensation", role: "Singer", color: "bg-purple-500" },
    { name: "Fashion Mogul", role: "Model", color: "bg-pink-500" },
    { name: "Tech Influencer", role: "Creator", color: "bg-green-500" },
    { name: "Global Artist", role: "Performer", color: "bg-yellow-500" },
    { name: "Rising Star", role: "Actor", color: "bg-orange-500" },
    { name: "Social Icon", role: "Influencer", color: "bg-indigo-500" },
  ];

  return (
    <div className="w-full overflow-hidden bg-black border-b border-yellow-900/30 py-6 md:py-10 group relative">
      {/* Gradient Overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-40 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-40 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

      {/* Sliding Container */}
      <div className="flex animate-scroll">
        {/* Loop 1 */}
        <div className="flex space-x-4 md:space-x-8 mx-2 md:mx-4">
          {celebrityList.map((celeb, idx) => (
            <div 
              key={`c1-${idx}`}
              // UPDATED: Much smaller size on mobile (w-32) vs Desktop (w-48), removed blur for performance
              className="w-32 h-44 md:w-48 md:h-56 flex-shrink-0 bg-neutral-900/80 border border-yellow-900/40 rounded-xl flex flex-col items-center justify-center p-3 md:p-4 transform transition-all duration-300 md:hover:scale-105"
            >
              {/* Circular Image */}
              <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full ${celeb.color} mb-3 md:mb-4 border-2 border-yellow-500/50 shadow-lg flex items-center justify-center overflow-hidden relative`}>
                 <Users className="text-white/80 w-8 h-8 md:w-12 md:h-12" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <h3 className="text-white font-bold text-center leading-tight text-sm md:text-base">{celeb.name}</h3>
              <p className="text-yellow-500 text-[10px] md:text-xs uppercase tracking-widest mt-1">{celeb.role}</p>
            </div>
          ))}
        </div>
        
        {/* Loop 2 (Duplicate for infinity) */}
        <div className="flex space-x-4 md:space-x-8 mx-2 md:mx-4">
          {celebrityList.map((celeb, idx) => (
            <div 
              key={`c2-${idx}`}
              className="w-32 h-44 md:w-48 md:h-56 flex-shrink-0 bg-neutral-900/80 border border-yellow-900/40 rounded-xl flex flex-col items-center justify-center p-3 md:p-4 transform transition-all duration-300 md:hover:scale-105"
            >
              <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full ${celeb.color} mb-3 md:mb-4 border-2 border-yellow-500/50 shadow-lg flex items-center justify-center overflow-hidden relative`}>
                 <Users className="text-white/80 w-8 h-8 md:w-12 md:h-12" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <h3 className="text-white font-bold text-center leading-tight text-sm md:text-base">{celeb.name}</h3>
              <p className="text-yellow-500 text-[10px] md:text-xs uppercase tracking-widest mt-1">{celeb.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- NAVBAR (FIXED FOR MOBILE LOGO) ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-lg shadow-2xl shadow-yellow-900/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO FIX: Added wrapper with fixed height and negative margin to compensate for scale */}
          <div className="flex-shrink-0 cursor-pointer flex items-center justify-center -ml-4 md:ml-0 h-10 overflow-visible" onClick={() => scrollToSection('hero')}>
            {/* Scale is adjusted separately for mobile (0.3) and desktop via CSS scale logic if needed, but 0.35 works well for small screens */}
            <div className="scale-[0.35] md:scale-[0.4] origin-center">
               <CSSLogo showFullTagline={false} simpleMode={true} />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['About', 'Services', 'Why Us', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-gray-300 hover:text-yellow-500 transition-all duration-300 text-sm font-semibold uppercase tracking-wider relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-lg border-t border-yellow-900/30">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {['About', 'Services', 'Why Us', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="block w-full text-left text-gray-300 hover:text-yellow-500 transition-colors py-3 text-lg font-semibold uppercase tracking-wider border-b border-gray-800"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// --- ABOUT SECTION ---
const AboutSection = () => {
  const stats = [
    { icon: Briefcase, number: '500+', label: 'Brand Partnerships', delay: '0s' },
    { icon: Star, number: '1000+', label: 'Celebrity Collaborations', delay: '0.2s' },
    { icon: Trophy, number: '50M+', label: 'Audience Reach', delay: '0.4s' },
    { icon: TrendingUp, number: '95%', label: 'Success Rate', delay: '0.6s' }
  ];

  return (
    <section id="about" className="relative py-24 bg-black overflow-hidden">
      <FloatingParticles />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            About <span className="text-gold-luxury">SS Group</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We are the architects of influence, the conductors of celebrity power, and the masterminds behind campaigns that don't just trend—they define culture.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="card-hover-glow bg-gradient-to-br from-neutral-900 to-black p-6 rounded-xl border border-yellow-900/30 text-center"
              style={{ animationDelay: stat.delay }}
            >
              <stat.icon className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-float-gentle" />
              <div className="stat-number text-4xl font-black text-gold-luxury mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Story Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card-hover-glow bg-gradient-to-br from-neutral-900 to-black p-8 rounded-2xl border border-yellow-900/30">
            <Shield className="w-16 h-16 text-yellow-500 mb-6 animate-pulse-glow" />
            <h3 className="text-3xl font-bold text-white mb-4">Our Promise</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              Every partnership we forge is built on trust, transparency, and an unwavering commitment to excellence. Your reputation is our priority—and we guard it like the crown jewels it is.
            </p>
          </div>

          <div className="card-hover-glow bg-gradient-to-br from-neutral-900 to-black p-8 rounded-2xl border border-yellow-900/30">
            <Sparkles className="w-16 h-16 text-cyan-400 mb-6 animate-pulse-glow" />
            <h3 className="text-3xl font-bold text-white mb-4">Our Magic</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              We don't just match brands with celebrities—we orchestrate moments that captivate millions, spark conversations, and leave lasting impressions in the hearts and minds of audiences worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SERVICES SECTION ---
const ServicesSection = () => {
  const services = [
    {
      icon: Handshake,
      title: 'Celebrity Endorsements',
      description: 'Connect with A-list stars who embody your brand values and amplify your message to millions.',
      features: ['Strategic Star Matching', 'Contract Negotiation', 'Campaign Integration'],
      gradient: 'from-yellow-600 to-orange-600'
    },
    {
      icon: Camera,
      title: 'Event Appearances',
      description: 'Transform your events into unforgettable experiences with celebrity presence that creates buzz.',
      features: ['Red Carpet Moments', 'Meet & Greets', 'Live Performances'],
      gradient: 'from-cyan-600 to-blue-600'
    },
    {
      icon: Mic,
      title: 'Content Collaborations',
      description: 'Co-create viral content with celebrities that resonates authentically across all platforms.',
      features: ['Social Media Takeovers', 'Video Productions', 'Podcast Features'],
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      icon: TrendingUp,
      title: 'Brand Ambassadorships',
      description: 'Build long-term partnerships with celebrities who become the face of your brand evolution.',
      features: ['Multi-Year Deals', 'Exclusive Rights', 'Global Campaigns'],
      gradient: 'from-green-600 to-emerald-600'
    }
  ];

  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden">
      <div className="absolute inset-0 hero-stars opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Our <span className="text-shimmer">Services</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive solutions that bridge the gap between brands and stardom
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group card-hover-glow bg-gradient-to-br from-neutral-900 to-black p-8 rounded-2xl border border-yellow-900/30 relative overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              <service.icon className="w-16 h-16 text-yellow-500 mb-6 group-hover:scale-110 transition-transform duration-300" />
              
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                {service.description}
              </p>

              <div className="space-y-3">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <button className="flex items-center space-x-2 text-yellow-500 hover:text-yellow-400 transition-colors font-semibold group">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- WHY CHOOSE US SECTION ---
const WhyUsSection = () => {
  const reasons = [
    {
      icon: Shield,
      title: 'Unmatched Network',
      description: 'Direct access to A-list celebrities, influencers, and rising stars across every industry and genre.'
    },
    {
      icon: Clock,
      title: 'Lightning Fast',
      description: 'We move at the speed of culture. From inquiry to activation in record time without compromising quality.'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Our campaigns don\'t just perform—they dominate. Measurable ROI and viral moments guaranteed.'
    },
    {
      icon: Sparkles,
      title: 'Creative Excellence',
      description: 'We don\'t follow trends, we create them. Every campaign is a masterpiece of innovation and impact.'
    }
  ];

  return (
    <section id="why-us" className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-900/20 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Why Choose <span className="text-gold-luxury">SS Group</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're not just another agency—we're your secret weapon in the battle for attention
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="card-hover-glow bg-gradient-to-br from-neutral-900 to-black p-8 rounded-2xl border border-yellow-900/30 text-center group"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-900/20 mb-6 group-hover:bg-yellow-900/40 transition-colors">
                <reason.icon className="w-10 h-10 text-yellow-500 group-hover:scale-110 transition-transform" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                {reason.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial Showcase */}
        <div className="mt-20 bg-gradient-to-br from-yellow-900/10 to-transparent p-12 rounded-3xl border border-yellow-900/30">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                <Star className="w-12 h-12 text-white fill-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-2xl md:text-3xl font-bold text-white mb-4 italic">
                "SS Group transformed our brand overnight. The celebrity partnership they orchestrated didn't just meet our expectations—it shattered them."
              </p>
              <p className="text-yellow-500 font-semibold text-lg">
                — Fortune 500 CMO
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- CONTACT FORM WITH FIREBASE ---
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', message: '', budget: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (auth) {
      signInAnonymously(auth).catch(err => console.error("Auth error:", err));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!db) {
      setStatus({ type: 'error', message: 'Firebase not configured. Please contact the administrator.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        timestamp: serverTimestamp(),
        source: 'website'
      });

      setStatus({ type: 'success', message: 'Message sent! We\'ll respond within 24 hours.' });
      setFormData({ name: '', email: '', phone: '', company: '', message: '', budget: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ type: 'error', message: 'Failed to send. Please try again or email us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden">
      <FloatingParticles />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Let's Create <span className="text-shimmer">Magic Together</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to elevate your brand with the power of celebrity? Let's talk strategy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card-hover-glow bg-gradient-to-br from-neutral-900 to-black p-8 rounded-2xl border border-yellow-900/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Budget Range</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                >
                  <option value="">Select budget range</option>
                  <option value="<50k">Under $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-250k">$100,000 - $250,000</option>
                  <option value="250k-500k">$250,000 - $500,000</option>
                  <option value=">500k">$500,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Message *</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                  placeholder="Tell us about your project and goals..."
                ></textarea>
              </div>

              {status.message && (
                <div className={`p-4 rounded-lg ${status.type === 'success' ? 'bg-green-900/30 text-green-400 border border-green-700' : 'bg-red-900/30 text-red-400 border border-red-700'}`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 animate-pulse-glow"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card-hover-glow bg-gradient-to-br from-neutral-900 to-black p-8 rounded-2xl border border-yellow-900/30">
              <h3 className="text-3xl font-bold text-white mb-6">Get In Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-900/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Phone</p>
                    <p className="text-white font-semibold text-lg">+91 (XXX) XXX-XXXX</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-900/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Email</p>
                    <p className="text-white font-semibold text-lg">contact@ssgroup.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-900/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Location</p>
                    <p className="text-white font-semibold text-lg">Mumbai, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover-glow bg-gradient-to-br from-yellow-900/10 to-transparent p-8 rounded-2xl border border-yellow-900/30">
              <h4 className="text-2xl font-bold text-white mb-4">Office Hours</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-yellow-500 font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-yellow-500 font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 p-6 rounded-2xl border border-yellow-500/30">
              <p className="text-yellow-400 font-semibold text-center">
                <Clock className="inline w-5 h-5 mr-2" />
                24-48 Hour Response Time Guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- FOOTER ---
const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-yellow-900/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <CSSLogo scale={0.5} showFullTagline={false} simpleMode={true} />
            <p className="text-gray-400 mt-4 text-sm">
              Connecting brands with stardom since inception. Your reputation is our priority.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Services', 'Why Us', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="block text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Connect</h4>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                <a 
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-yellow-900/20 rounded-full flex items-center justify-center hover:bg-yellow-900/40 transition-colors"
                  aria-label={social}
                >
                  <Users className="w-5 h-5 text-yellow-500" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-yellow-900/30 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} SS Group - The Silent Sage. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Your Reputation Is Our "Priority"
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---
const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <style>{styles}</style>
      
      {showIntro ? (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      ) : (
        <div className="bg-black min-h-screen text-white overflow-x-hidden">
          <Navbar />
          
          <section id="hero" className="pt-20">
            <EnhancedCinematicHero />
          </section>

          {/* NEW: Celebrity Slider inserted here, before About Section */}
          <CelebritySliderStrip />

          <AboutSection />
          <ServicesSection />
          <WhyUsSection />
          <ContactSection />
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;