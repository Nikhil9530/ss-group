import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Zap, Award, Mic, Users, Phone, Mail, MapPin, ChevronDown, Menu, X, 
  CheckCircle, ArrowRight, Star, Briefcase, Camera, Handshake, Sparkles, 
  TrendingUp, Shield, Clock, Trophy, MessageCircle, Tv, Newspaper, Film
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// ==========================================
// 🔴 FIREBASE CONFIG  🔴
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyCNE5rhXlLf2PW1H3DF_VlzSmEeRQmOMWc",
  authDomain: "ss-group-accdf.firebaseapp.com",
  projectId: "ss-group-accdf",
  storageBucket: "ss-group-accdf.firebasestorage.app",
  messagingSenderId: "1024492133762",
  appId: "1:1024492133762:web:44b7bfb0628fb8a494039b",
  measurementId: "G-YS359QRZP2"
};

let app, auth, db;
try {
  if (firebaseConfig.apiKey !== "AIzaSyCNE5rhXlLf2PW1H3DF_VlzSmEeRQmOMWc") {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  }
} catch (e) {
  console.error("Firebase Init Error:", e);
}

// --- ENHANCED STYLES (OPTIMIZED FOR PERFORMANCE) ---
const styles = `
  /* SCROLL & BASIC */
  @keyframes scroll { 
    0% { transform: translate3d(0, 0, 0); } 
    100% { transform: translate3d(-50%, 0, 0); } 
  }

  /* NEW: Reverse Scroll for Media Coverage */
  @keyframes scroll-reverse { 
    0% { transform: translate3d(-50%, 0, 0); } 
    100% { transform: translate3d(0, 0, 0); } 
  }
  
  .animate-scroll { 
    /* SLOWER SPEED: 45s for mobile */
    animation: scroll 45s linear infinite; 
    will-change: transform; 
    backface-visibility: hidden; 
  }

  /* NEW: Reverse Animation Class */
  .animate-scroll-reverse { 
    animation: scroll-reverse 60s linear infinite; 
    will-change: transform; 
    backface-visibility: hidden; 
  }

  /* Stops animation when this class is applied */
  .paused-animation {
    animation-play-state: paused !important;
  }

  @media (min-width: 768px) { 
    /* SLOWER SPEED: 50s for desktop */
    .animate-scroll { animation: scroll 40s linear infinite; } 
    .animate-scroll-reverse { animation: scroll-reverse 40s linear infinite; } 
    .animate-scroll:hover, .animate-scroll-reverse:hover { animation-play-state: paused; }
  }

  /* ENHANCED CINEMATIC EFFECTS */
  @keyframes pulse-glow {
    0%, 100% { 
      box-shadow: 0 0 20px rgba(234, 179, 8, 0.3), inset 0 0 20px rgba(234, 179, 8, 0.1);
    }
    50% { 
      box-shadow: 0 0 40px rgba(234, 179, 8, 0.6), inset 0 0 30px rgba(234, 179, 8, 0.2);
    }
  }

  @keyframes slide-up {
    0% { transform: translate3d(0, 50px, 0); opacity: 0; }
    100% { transform: translate3d(0, 0, 0); opacity: 1; }
  }

  /* NEW: Fade In Down for the Gallery toggles */
  @keyframes fade-in-down {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-down {
    animation: fade-in-down 0.5s ease-out forwards;
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
    0% { transform: scale(0) rotate(-10deg); opacity: 0; } 
    60% { transform: scale(1.1) rotate(5deg); opacity: 1; } 
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

  /* STARFIELD - Optimized */
  .hero-stars {
    background-image: 
      radial-gradient(2px 2px at 20% 30%, white, transparent),
      radial-gradient(2px 2px at 60% 70%, white, transparent),
      radial-gradient(1px 1px at 50% 50%, white, transparent);
    background-size: 200% 200%;
    animation: stars-twinkle 8s ease-in-out infinite;
    will-change: opacity;
  }

  @keyframes stars-twinkle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* PARTICLE EFFECT */
  @keyframes particle-float {
    0% { transform: translate3d(0,0,0) scale(0); opacity: 0; }
    10% { opacity: 1; }
    100% { transform: translate3d(50px, -100vh, 0) scale(1); opacity: 0; }
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, #fbbf24, transparent);
    border-radius: 50%;
    pointer-events: none;
    animation: particle-float 8s linear infinite;
    will-change: transform;
  }

  /* CARD HOVER EFFECTS */
  .card-hover-glow {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateZ(0); /* Hardware accelerate */
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

// --- NEW PNG LOGO COMPONENT ---
const ImageLogo = ({ className }) => {
  return (
    <img 
      src="/images/sslogo.png" 
      alt="SS Group Logo" 
      className={`object-contain ${className}`}
    />
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
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        {/* LOGO CONTAINER */}
        <div className={`animate-come-out flex justify-center w-full`}>
           <ImageLogo className="w-[90vw] max-w-[500px] h-auto" />
        </div>

        {/* TEXT CONTAINER */}
        <div className="flex items-center justify-center w-full -mt-20 md:-mt-32 relative z-20">
          <p className="text-base md:text-xl text-yellow-500 tracking-[0.15em] md:tracking-[0.2em] uppercase font-bold text-center">
            {text}
            {text.length < tagline.length && (
               <span className="cursor-blink text-yellow-200 ml-1">|</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- FLOATING PARTICLES ---
const FloatingParticles = () => {
  const particles = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 8 + Math.random() * 4
  })), []);

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

// --- ENHANCED CINEMATIC HERO ---
const EnhancedCinematicHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const requestRef = useRef();

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e) => {
        if (requestRef.current) return;
        requestRef.current = requestAnimationFrame(() => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
            requestRef.current = null;
        });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="w-full min-h-[70vh] relative flex flex-col items-center justify-center overflow-visible py-12">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-600/10 rounded-full blur-[150px] animate-pulse-glow"></div>

      <div 
        className="relative w-full max-w-6xl transform transition-transform duration-300 ease-out will-change-transform"
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

          <g opacity="0.6">
            <line x1="250" y1="500" x2="600" y2="300" stroke="url(#goldShine)" strokeWidth="3" strokeDasharray="10,5" filter="url(#glow)">
              <animate attributeName="stroke-dashoffset" from="0" to="30" dur="2s" repeatCount="indefinite"/>
            </line>
            <line x1="950" y1="500" x2="600" y2="300" stroke="url(#cyanShine)" strokeWidth="3" strokeDasharray="10,5" filter="url(#glow)">
              <animate attributeName="stroke-dashoffset" from="0" to="30" dur="2s" repeatCount="indefinite"/>
            </line>
          </g>

          <g transform="translate(250, 500)" className="cursor-pointer" style={{transition: 'transform 0.3s'}}>
            <rect x="-80" y="-150" width="30" height="150" fill="#1a1a1a" stroke="#fbbf24" strokeWidth="2"/>
            <rect x="-40" y="-120" width="25" height="120" fill="#262626" stroke="#fbbf24" strokeWidth="2"/>
            <rect x="-10" y="-180" width="35" height="180" fill="#1a1a1a" stroke="#fbbf24" strokeWidth="2"/>
            <rect x="30" y="-140" width="30" height="140" fill="#262626" stroke="#fbbf24" strokeWidth="2"/>
            <rect x="65" y="-110" width="25" height="110" fill="#1a1a1a" stroke="#fbbf24" strokeWidth="2"/>
            
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

            <text y="40" className="text-lg font-black uppercase tracking-[0.3em]" fill="url(#goldShine)" textAnchor="middle">BRANDS</text>
            <text y="65" className="text-xs uppercase tracking-widest opacity-60" fill="#fbbf24" textAnchor="middle">Seeking Impact</text>
          </g>

          <g transform="translate(600, 300)">
            <circle cx="0" cy="0" r="120" fill="none" stroke="url(#goldShine)" strokeWidth="2" opacity="0.3">
              <animate attributeName="r" values="120;140;120" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/>
            </circle>
            
            <circle cx="0" cy="0" r="100" fill="rgba(0,0,0,0.95)" stroke="url(#goldShine)" strokeWidth="4" filter="url(#glow)"/>
            <circle cx="0" cy="0" r="95" fill="url(#spotGlow)" opacity="0.2"/>
            
            <g transform="scale(2)">
              <path d="M-15,5 L-5,-5 M5,-5 L15,5" stroke="url(#goldShine)" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#glow)"/>
              <path d="M-5,-5 L5,5" stroke="url(#goldShine)" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#glow)"/>
              <circle cx="-5" cy="-5" r="2" fill="#fbbf24"/>
              <circle cx="5" cy="-5" r="2" fill="#fbbf24"/>
            </g>

            <circle cx="0" cy="-110" r="8" fill="#fbbf24" filter="url(#glow)">
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="8s" repeatCount="indefinite"/>
            </circle>
            <circle cx="0" cy="-110" r="8" fill="#22d3ee" filter="url(#glow)">
              <animateTransform attributeName="transform" type="rotate" from="180 0 0" to="540 0 0" dur="8s" repeatCount="indefinite"/>
            </circle>

            <g transform="translate(0, 180)">
              <rect x="-150" y="-45" width="300" height="90" rx="8" fill="rgba(0,0,0,0.9)" stroke="url(#goldShine)" strokeWidth="3"/>
              
              <g transform="translate(0, -55)">
                <path d="M-20,0 L-10,-15 L0,-5 L10,-15 L20,0 Z" fill="url(#goldShine)" filter="url(#glow)"/>
                <circle cx="-10" cy="-15" r="3" fill="#fff"/>
                <circle cx="0" cy="-5" r="3" fill="#fff"/>
                <circle cx="10" cy="-15" r="3" fill="#fff"/>
              </g>

              <text y="5" className="text-5xl font-black" fill="url(#goldShine)" textAnchor="middle" filter="url(#glow)">SS GROUP</text>
              <text y="30" className="text-xl italic" fill="#fef9c3" textAnchor="middle" style={{fontFamily: 'serif'}}>The Bridge Maker</text>
            </g>
          </g>

          <g transform="translate(950, 500)" className="cursor-pointer" style={{transition: 'transform 0.3s'}}>
            <rect x="-80" y="-30" width="160" height="30" fill="#1a1a1a" stroke="#22d3ee" strokeWidth="2"/>
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

            <path d="M0,-120 L12,-85 L50,-85 L20,-60 L30,-25 L0,-50 L-30,-25 L-20,-60 L-50,-85 L-12,-85 Z" 
                  fill="none" stroke="url(#cyanShine)" strokeWidth="4" filter="url(#glow)">
              <animateTransform attributeName="transform" type="rotate" from="0 0 -70" to="360 0 -70" dur="20s" repeatCount="indefinite"/>
            </path>
            <circle cx="0" cy="-120" r="8" fill="#22d3ee" filter="url(#glow)">
              <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
            </circle>

            <text y="65" className="text-lg font-black uppercase tracking-[0.3em]" fill="url(#cyanShine)" textAnchor="middle">CELEBRITIES</text>
            <text y="90" className="text-xs uppercase tracking-widest opacity-60" fill="#22d3ee" textAnchor="middle">Creating Magic</text>
          </g>
        </svg>
      </div>

      <div className="mt-12 text-center animate-slide-up" style={{animationDelay: '0.5s', opacity: 0}}>
        <p className="text-sm text-yellow-600 uppercase tracking-[0.4em] font-bold mb-2">We Don't Just Connect</p>
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

// --- CELEBRITY SLIDER STRIP (Big Cards + Click-to-Stop) ---
const CelebritySliderStrip = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const celebrityList = [
    { name: "Sonu Sood", role: "Actor", color: "bg-blue-600", image: "/images/sonu.jpg" },
    { name: "Jackie Shroff", role: "Actor", color: "bg-amber-700", image: "/images/jackie.jpg" },
    { name: "Adah Sharma", role: "Actor", color: "bg-pink-600", image: "/images/adah.jpg" },
    { name: "Sunil Grover", role: "Actor & Comedian", color: "bg-purple-600", image: "/images/sunil.jpg" },
    { name: "Mahima Choudhary", role: "Actor", color: "bg-red-500", image: "/images/mahima.jpg" },
    { name: "Ninja", role: "Singer & Actor", color: "bg-indigo-600", image: "/images/ninja.jpg" },
    { name: "Golden Guys", role: "Social Icons", color: "bg-yellow-500", image: "/images/goldenguys.jpg" },
    { name: "Rahul Roy", role: "Actor", color: "bg-teal-600", image: "/images/rahul.jpg" },
    { name: "Shaji Chaudhary", role: "Actor", color: "bg-gray-700", image: "/images/shaji.jpg" },
    { name: "Vindu Dara Singh", role: "Actor", color: "bg-orange-600", image: "/images/vindu.jpg" },
    { name: "Vikram Sarkar", role: "Singer", color: "bg-blue-800", image: "/images/vikram.jpg" },
    { name: "Dhandha Nyoliwala", role: "Hip-Hop Artist", color: "bg-green-600", image: "/images/dhandha.png" },
  ];

  const handleCardClick = (uniqueId) => {
    if (activeId === uniqueId) {
      // Resume if clicking same card
      setIsPaused(false);
      setActiveId(null);
    } else {
      // Pause and activate new card
      setIsPaused(true);
      setActiveId(uniqueId);
    }
  };

  return (
    <div className="w-full overflow-hidden bg-black border-b border-yellow-900/30 py-8 md:py-12 group relative">
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-40 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-40 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

      <div className={`flex w-max animate-scroll ${isPaused ? 'paused-animation' : ''}`}>
        {/* Render multiple loops for smooth scrolling */}
        {[0, 1].map((loop) => (
          <div key={loop} className="flex space-x-6 md:space-x-10 mx-3 md:mx-5">
            {celebrityList.map((celeb, idx) => {
              const uniqueId = `${loop}-${idx}`;
              const isActive = activeId === uniqueId;
              
              return (
                <div 
                  key={uniqueId}
                  onClick={() => handleCardClick(uniqueId)}
                  // UPDATED SIZING: w-44 (mobile) -> w-60 (desktop)
                  className={`
                    relative cursor-pointer transition-all duration-300 ease-out
                    flex-shrink-0 rounded-2xl flex flex-col items-center justify-center p-4
                    ${isActive ? 'scale-110 z-30 bg-neutral-800 border-2 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.3)]' : 'bg-neutral-900/80 border border-yellow-900/40 hover:scale-105'}
                    w-44 h-60 md:w-60 md:h-72
                  `}
                >
                  {/* UPDATED IMAGE SIZE: w-28 h-28 (mobile) -> w-36 h-36 (desktop) */}
                  <div className={`
                    rounded-full ${celeb.color} mb-4 border-2 border-yellow-500/50 shadow-lg flex items-center justify-center overflow-hidden relative
                    w-28 h-28 md:w-36 md:h-36
                  `}>
                      <img 
                        src={celeb.image} 
                        alt={celeb.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'; 
                          e.target.nextSibling.style.display = 'flex'; 
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center hidden bg-inherit">
                         <Users className="text-white/80 w-12 h-12 md:w-16 md:h-16" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                  </div>
                  
                  <h3 className="text-white font-bold text-center leading-tight text-base md:text-xl px-1">{celeb.name}</h3>
                  <p className="text-yellow-500 text-xs md:text-sm uppercase tracking-widest mt-1 font-medium">{celeb.role}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- HELPER COMPONENT: MINI SLIDER STRIP (NEW) ---
// This handles the "smaller" strips for IIFA/Media with click-to-stop logic
const MiniSliderStrip = ({ images, reverse = false }) => {
  const [activeId, setActiveId] = useState(null);

  const handleCardClick = (id) => {
    if (activeId === id) setActiveId(null);
    else setActiveId(id);
  };

  // Determine animation class based on direction
  const animationClass = reverse ? 'animate-scroll-reverse' : 'animate-scroll';

  return (
    <div className="w-full overflow-hidden bg-neutral-900/50 border-y border-yellow-900/30 py-6 mb-8 relative animate-fade-in-down">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
      
      <div className={`flex w-max ${animationClass} ${activeId !== null ? 'paused-animation' : ''}`}>
        {[0, 1].map((loop) => (
          <div key={loop} className="flex space-x-4 mx-3">
            {images.map((img, idx) => {
              const uniqueId = `${loop}-${idx}`;
              const isActive = activeId === uniqueId;

              return (
                <div 
                  key={uniqueId}
                  onClick={() => handleCardClick(uniqueId)}
                  // SMALLER SIZING: h-60 (mobile) / h-72 (desktop)
                  className={`
                    w-48 h-60 md:w-64 md:h-72 flex-shrink-0 rounded-lg overflow-hidden relative group cursor-pointer
                    transition-all duration-500 ease-out border border-yellow-900/40
                    ${isActive 
                      ? 'scale-110 z-50 border-2 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.5)]' 
                      : 'scale-100 hover:scale-105 opacity-100' 
                    }
                    ${activeId !== null && !isActive ? 'opacity-50 blur-[1px]' : ''}
                  `}
                >
                  <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                    <Camera className="text-white/10 w-10 h-10" />
                  </div>
                  <img 
                    src={img} 
                    alt="Detail" 
                    className="w-full h-full object-cover object-top relative z-10"
                    onError={(e) => e.target.style.opacity = 0} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- UPDATED PAST EVENTS PAGE (Mobile Split / Desktop Full Width) ---
const PastEventsPage = () => {
  // Main Slider State
  const [activeId, setActiveId] = useState(null);
  
  // TOGGLE STATE: 'iifa', 'media', or null
  const [activeSection, setActiveSection] = useState(null);

  const eventImages = [
    "/images/event1.jpg", "/images/event2.jpg", "/images/event3.jpg", 
    "/images/event4.jpg", "/images/event5.jpg", "/images/event6.jpg",
    "/images/event7.jpg", "/images/event8.jpg", "/images/event9.jpg",
    "/images/event10.jpg", "/images/event12.jpg", "/images/event13.jpg",
    "/images/event14.jpg", "/images/event15.jpg", "/images/event16.jpg",
    "/images/event17.jpg", "/images/event18.jpg", "/images/event19.jpg",
    "/images/event20.jpg", "/images/event21.jpg", "/images/event22.jpg",
    "/images/event23.jpg", "/images/event24.jpg", "/images/event25.jpg",
    "/images/event26.jpg", "/images/event27.jpg", "/images/event28.jpg",
    "/images/event29.jpg", "/images/event30.jpg", "/images/event31.jpg",
    "/images/event32.jpg", "/images/event33.jpg", "/images/event34.jpg",
    "/images/event35.jpg"
  ];

  // IIFA Images
  const iifaImages = [
    "/images/i1.jpg", "/images/i2.jpg", "/images/i3.jpg", 
    "/images/i13.jpg", "/images/i14.jpg", "/images/i6.jpg",
    "/images/i7.jpg", "/images/i8.jpg", "/images/i18.jpg",
    "/images/i10.jpg", "/images/i11.jpg", "/images/i12.jpg",
    "/images/i4.jpg", "/images/i5.jpg", "/images/i15.jpg",
    "/images/i16.jpg", "/images/i17.jpg", "/images/i9.jpg",
    "/images/i18.jpg", "/images/i19.jpg"
  ];

  // Media Images
  const mediaImages = [
    "/images/m1.jpg", "/images/m2.jpg", "/images/m3.jpg", 
    "/images/m4.jpg", "/images/m6.jpg",
    "/images/m7.jpg"
  ];

  // Function to handle click for MAIN slider
  const handleCardClick = (id) => {
    if (activeId === id) setActiveId(null);
    else setActiveId(id);
  };

  // Function to Toggle Sections
  const toggleSection = (sectionName) => {
    // If clicking the same section, close it. If clicking different, open new one.
    if (activeSection === sectionName) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionName);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-black text-white">
      {/* 1. Header */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 animate-slide-up">
          Our <span className="text-gold-luxury">Legacy</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A glimpse into the milestones we have achieved and the history we are writing.
        </p>
      </div>

      {/* 2. Slow Sliding Event Images (MAIN STRIP) */}
      <div className="w-full overflow-hidden bg-neutral-900/50 border-y border-yellow-900/30 py-8 mb-16 relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        
        <div className={`flex w-max animate-scroll ${activeId !== null ? 'paused-animation' : ''}`}>
          {[0, 1].map((loop) => (
            <div key={loop} className="flex space-x-6 mx-3">
              {eventImages.map((img, idx) => {
                const uniqueId = `${loop}-${idx}`;
                const isActive = activeId === uniqueId;

                return (
                  <div 
                    key={uniqueId}
                    onClick={() => handleCardClick(uniqueId)}
                    className={`
                      w-64 h-80 md:w-80 md:h-96 flex-shrink-0 rounded-lg overflow-hidden relative group cursor-pointer
                      transition-all duration-500 ease-out
                      ${isActive 
                        ? 'scale-110 z-50 border-2 border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.5)]' 
                        : 'scale-100 border border-yellow-900/40 hover:scale-105 opacity-100' 
                      }
                      ${activeId !== null && !isActive ? 'opacity-50 blur-[1px]' : ''}
                    `}
                  >
                    <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                      <Camera className="text-white/10 w-12 h-12" />
                    </div>
                    <img 
                      src={img} 
                      alt="Event" 
                      className="w-full h-full object-cover object-top relative z-10"
                      onError={(e) => e.target.style.opacity = 0} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 3. The Two Sectors (IIFA & Media Coverage) */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          
          {/* ================= COLUMN 1: IIFA ================= */}
          <div className="flex flex-col">
            <div className="group relative overflow-hidden rounded-2xl border border-yellow-900/30 bg-neutral-900/40 p-8 hover:bg-neutral-900/80 transition-all duration-500 cursor-pointer">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <Star className="w-24 h-24 text-yellow-600 rotate-12" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6 border border-yellow-500/30 group-hover:scale-110 transition-transform">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-gold-luxury transition-colors">IIFA</h3>
                <p className="text-gray-400 mb-6">
                  Exclusive awards and recognition events celebrating excellence in the industry.
                </p>
                
                {/* TOGGLE BUTTON FOR IIFA */}
                <span 
                  onClick={(e) => { e.stopPropagation(); toggleSection('iifa'); }}
                  className="inline-flex items-center text-yellow-500 font-semibold uppercase tracking-wider text-sm hover:text-white transition-colors cursor-pointer z-20 relative"
                >
                  {activeSection === 'iifa' ? 'Close Gallery' : 'View Gallery'} 
                  <ArrowRight className={`ml-2 w-4 h-4 transition-transform ${activeSection === 'iifa' ? 'rotate-90' : 'group-hover:translate-x-2'}`} />
                </span>
              </div>
            </div>

            {/* --- MOBILE ONLY: IIFA STRIP --- */}
            {/* Shows ONLY on mobile (md:hidden) immediately after IIFA card */}
            {activeSection === 'iifa' && (
              <div className="block md:hidden mt-4 animate-fade-in-down">
                <div className="text-center mb-2"><span className="text-yellow-500 font-bold tracking-widest uppercase text-xs">IIFA Gallery</span></div>
                <MiniSliderStrip images={iifaImages} />
              </div>
            )}
          </div>

          {/* ================= COLUMN 2: MEDIA ================= */}
          <div className="flex flex-col">
            <div className="group relative overflow-hidden rounded-2xl border border-yellow-900/30 bg-neutral-900/40 p-8 hover:bg-neutral-900/80 transition-all duration-500 cursor-pointer">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <Newspaper className="w-24 h-24 text-blue-600 rotate-12" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/30 group-hover:scale-110 transition-transform">
                  <Tv className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Media Coverage</h3>
                <p className="text-gray-400 mb-6">
                  Our events making headlines. Press releases, news features, and television coverage.
                </p>
                
                {/* TOGGLE BUTTON FOR MEDIA */}
                <span 
                  onClick={(e) => { e.stopPropagation(); toggleSection('media'); }}
                  className="inline-flex items-center text-blue-400 font-semibold uppercase tracking-wider text-sm hover:text-white transition-colors cursor-pointer z-20 relative"
                >
                  {activeSection === 'media' ? 'Close Coverage' : 'View Coverage'} 
                  <ArrowRight className={`ml-2 w-4 h-4 transition-transform ${activeSection === 'media' ? 'rotate-90' : 'group-hover:translate-x-2'}`} />
                </span>
              </div>
            </div>

            {/* --- MOBILE ONLY: MEDIA STRIP --- */}
            {/* Shows ONLY on mobile (md:hidden) immediately after Media card */}
            {activeSection === 'media' && (
              <div className="block md:hidden mt-4 animate-fade-in-down">
                <div className="text-center mb-2"><span className="text-blue-400 font-bold tracking-widest uppercase text-xs">Media Coverage</span></div>
                <MiniSliderStrip images={mediaImages} />
              </div>
            )}
          </div>

        </div>

        {/* ================= DESKTOP ONLY: FULL WIDTH BOTTOM STRIPS ================= */}
        {/* Shows ONLY on desktop (hidden md:block) at the bottom of the grid */}
        <div className="hidden md:block w-full mt-10">
          {activeSection === 'iifa' && (
            <div className="animate-fade-in-down">
              <div className="text-center mb-4"><span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">IIFA Gallery</span></div>
              <MiniSliderStrip images={iifaImages} />
            </div>
          )}

          {activeSection === 'media' && (
            <div className="animate-fade-in-down">
              <div className="text-center mb-4"><span className="text-blue-400 font-bold tracking-widest uppercase text-sm">Media Coverage</span></div>
              <MiniSliderStrip images={mediaImages} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

// --- NAVBAR ---
const Navbar = ({ onNavigate, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setIsOpen(false);
    if (id === 'past-events') {
      onNavigate('past-events');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-lg shadow-2xl shadow-yellow-900/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex-shrink-0 cursor-pointer flex items-center justify-start h-14" onClick={() => handleNavClick('hero')}>
             {/* Uses the new PNG ImageLogo */}
             <ImageLogo className="h-20 md:h-24 w-auto" />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {['About', 'Past Events', 'Services', 'Why Us', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item.toLowerCase().replace(' ', '-'))}
                className={`text-sm font-semibold uppercase tracking-wider relative group transition-all duration-300 ${currentView === 'past-events' && item === 'Past Events' ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'}`}
              >
                {item}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-yellow-500 transition-all duration-300 ${currentView === 'past-events' && item === 'Past Events' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-yellow-500 hover:text-yellow-400">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-lg border-t border-yellow-900/30">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {['About', 'Past Events', 'Services', 'Why Us', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item.toLowerCase().replace(' ', '-'))}
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
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">About <span className="text-gold-luxury">SS Group</span></h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We are the architects of influence, the conductors of celebrity power, and the masterminds behind campaigns that don't just trend—they define culture.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="card-hover-glow bg-gradient-to-br from-neutral-900 to-black p-6 rounded-xl border border-yellow-900/30 text-center"
              style={{ animationDelay: stat.delay }}
            >
              <stat.icon className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-float-gentle" />
              <div className="stat-number text-4xl font-black text-gold-luxury mb-2">{stat.number}</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

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
      features: ['Strategic Star Matching', 'Authentic Partnership Development', 'Campaign Integration'],
      gradient: 'from-yellow-600 to-orange-600'
    },
    {
      icon: Camera,
      title: 'Event Appearances',
      description: 'Transform your events into unforgettable experiences with celebrity presence that creates buzz.',
      features: ['VIP Guest Experiences', 'Meet & Greets', 'Live Performances'],
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
      features: ['Consistent Brand Voice', 'Authentic Brand Storytelling', 'Integrated Marketing Presence'],
      gradient: 'from-green-600 to-emerald-600'
    }
  ];

  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden">
      <div className="absolute inset-0 hero-stars opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">Our <span className="text-shimmer">Services</span></h2>
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
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed text-lg">{service.description}</p>
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
    { icon: Shield, title: 'Unmatched Network', description: 'Direct access to A-list celebrities, influencers, and rising stars across every industry and genre.' },
    { icon: Clock, title: 'Lightning Fast', description: 'We move at the speed of culture. From inquiry to activation in record time without compromising quality.' },
    { icon: Award, title: 'Proven Results', description: 'Our campaigns don\'t just perform—they dominate. Measurable ROI and viral moments guaranteed.' },
    { icon: Sparkles, title: 'Creative Excellence', description: 'We don\'t follow trends, we create them. Every campaign is a masterpiece of innovation and impact.' }
  ];

  return (
    <section id="why-us" className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-900/20 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">Why Choose <span className="text-gold-luxury">SS Group</span></h2>
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
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">{reason.title}</h3>
              <p className="text-gray-400 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- CONTACT FORM ---
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
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">Let's Create <span className="text-shimmer">Magic Together</span></h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to elevate your brand with the power of celebrity? Let's talk strategy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="card-hover-glow bg-gradient-to-br from-neutral-900 to-black p-8 rounded-2xl border border-yellow-900/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Email *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors" placeholder="john@company.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors" placeholder="+91 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Company</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors" placeholder="Your Company" />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Budget Range</label>
                <select name="budget" value={formData.budget} onChange={handleChange} className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors">
                  <option value="">Select budget range</option>
                  <option value="<50k">Under 2,50,000</option>
                  <option value="50k-100k">2,50,000 - 5,00,000</option>
                  <option value="100k-250k">5,00,000 - 10,00,000</option>
                  <option value="250k-500k">10,00,000 - 20,00,000</option>
                  <option value=">500k">20,00,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Message *</label>
                <textarea name="message" required value={formData.message} onChange={handleChange} rows="5" className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none" placeholder="Tell us about your project and goals..."></textarea>
              </div>

              {status.message && (
                <div className={`p-4 rounded-lg ${status.type === 'success' ? 'bg-green-900/30 text-green-400 border border-green-700' : 'bg-red-900/30 text-red-400 border border-red-700'}`}>
                  {status.message}
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 animate-pulse-glow">
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

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
                    <p className="text-white font-semibold text-lg">+91 (724) 061-0195</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-900/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Email</p>
                    <p className="text-white font-semibold text-lg">business@ssentertainments.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-900/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Location</p>
                    <p className="text-white font-semibold text-lg">Kota, Rajasthan, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover-glow bg-gradient-to-br from-yellow-900/10 to-transparent p-8 rounded-2xl border border-yellow-900/30">
              <h4 className="text-2xl font-bold text-white mb-4">Office Hours</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between"><span>Monday - Friday</span><span className="text-yellow-500 font-semibold">9:00 AM - 6:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday - Sunday</span><span className="text-yellow-500 font-semibold">10:00 AM - 4:00 PM</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- FOOTER ---
const Footer = ({ onNavigate }) => {
  const [tooltip, setTooltip] = useState(null); 

  const handlePlaceholder = (e, platform) => {
    e.preventDefault(); 
    setTooltip(platform); 
    setTimeout(() => setTooltip(null), 1500); 
  };

  return (
    <footer className="relative bg-black border-t border-yellow-900/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <ImageLogo className="h-32 w-auto mb-4" />
            <p className="text-gray-400 mt-4 text-sm">
              Connecting brands with stardom since inception. Your reputation is our priority.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Past Events', 'Services', 'Why Us', 'Contact'].map(item => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className="block text-gray-400 hover:text-yellow-500 transition-colors text-sm cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault(); 
                    
                    if (item === 'Past Events') {
                      onNavigate('past-events');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      onNavigate('home');
                      setTimeout(() => {
                        const id = item.toLowerCase().replace(' ', '-');
                        const element = document.getElementById(id);
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Connect</h4>
            <div className="flex space-x-4 items-center">
              <a href="https://www.instagram.com/ssgroup_official.in?igsh=MWhteGdqNjMwaHowMg==" target="_blank" rel="noreferrer" className="w-10 h-10 bg-yellow-900/20 rounded-full flex items-center justify-center hover:bg-yellow-900/40 transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 group-hover:scale-110 transition-transform">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              <a href="https://wa.me/917240610195" target="_blank" rel="noreferrer" className="w-10 h-10 bg-yellow-900/20 rounded-full flex items-center justify-center hover:bg-yellow-900/40 transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 group-hover:scale-110 transition-transform">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </a>

              <div className="relative">
                  {tooltip === 'facebook' && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded whitespace-nowrap animate-fade-in-scale z-50">Available Soon</div>
                  )}
                  <a href="#" onClick={(e) => handlePlaceholder(e, 'facebook')} className="w-10 h-10 bg-yellow-900/20 rounded-full flex items-center justify-center hover:bg-yellow-900/40 transition-colors group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 group-hover:scale-110 transition-transform"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
              </div>

              <div className="relative">
                  {tooltip === 'linkedin' && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded whitespace-nowrap animate-fade-in-scale z-50">Available Soon</div>
                  )}
                  <a href="#" onClick={(e) => handlePlaceholder(e, 'linkedin')} className="w-10 h-10 bg-yellow-900/20 rounded-full flex items-center justify-center hover:bg-yellow-900/40 transition-colors group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 group-hover:scale-110 transition-transform"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-yellow-900/30 pt-8 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} SS Group - The Silent Sage. All rights reserved.</p>
          <p className="text-gray-500 text-xs mt-2">Your Reputation Is Our "Priority"</p>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---
const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  // View Switcher Logic: 'home' shows standard landing page, 'past-events' shows new section
  const [currentView, setCurrentView] = useState('home'); 

  return (
    <>
      <style>{styles}</style>
      
      {showIntro ? (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      ) : (
        <div className="bg-black min-h-screen text-white overflow-x-hidden font-sans">
          {/* Navbar controls the 'currentView' state */}
          <Navbar onNavigate={setCurrentView} currentView={currentView} />
          
          {currentView === 'home' ? (
            <>
              {/* === HOME PAGE VIEW === */}
              <section id="hero" className="pt-20">
                <EnhancedCinematicHero />
              </section>

              <CelebritySliderStrip />

              <AboutSection />
              <ServicesSection />
              <WhyUsSection />
              <ContactSection />
            </>
          ) : (
            /* === PAST EVENTS PAGE VIEW === */
            <PastEventsPage />
          )}
          
          <Footer onNavigate={setCurrentView} />
        </div>
      )}
    </>
  );
};

export default App;