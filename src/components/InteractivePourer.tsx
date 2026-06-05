import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Flame, RotateCcw, Heart, Gift } from 'lucide-react';
import './InteractivePourer.css';

export default function InteractivePourer() {
  const [isPouring, setIsPouring] = useState(false);
  const [pourPercent, setPourPercent] = useState(0);
  const [success, setSuccess] = useState(false);
  const [pourIntervalId, setPourIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPouring && pourPercent < 100) {
      const id = setInterval(() => {
        setPourPercent((prev) => {
          const next = prev + 2.5; // full fill in 4s
          if (next >= 100) {
            setSuccess(true);
            setIsPouring(false);
            if (id) clearInterval(id);
            return 100;
          }
          return next;
        });
      }, 100);
      setPourIntervalId(id);
      return () => clearInterval(id);
    } else if (!isPouring && pourIntervalId) {
      clearInterval(pourIntervalId);
    }
  }, [isPouring]);

  const handleReset = () => {
    setPourPercent(0);
    setSuccess(false);
    setIsPouring(false);
    if (pourIntervalId) {
      clearInterval(pourIntervalId);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 flex flex-col items-center max-w-md w-full mx-auto" id="interactive-pourer">
      <div className="text-center mb-6">
        <span className="pour-header-tag">
          <Flame className="w-3.5 h-3.5 text-brand-500 animate-pulse" /> Expérience Interactive
        </span>
        <h3 className="font-serif text-2xl font-bold text-gray-900">Le Rituel du Thé</h3>
        <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
          À Fès, servir le thé est un grand art. Cliquez et maintenez pour verser le thé royal Miramar bien moussé.
        </p>
      </div>

      {/* Animation Stage */}
      <div className="pour-stage">
        
        {/* Steam rising effect when full or pouring */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-1 justify-center pointer-events-none">
          {pourPercent > 20 && (
            <>
              <motion.div
                key="steam1"
                initial={{ opacity: 0, y: 15, scale: 0.8 }}
                animate={{ opacity: [0, 0.4, 0], y: [15, -40], x: [0, -10, 5], scale: [0.8, 1.4, 1.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                className="pour-steam1"
              />
              <motion.div
                key="steam2"
                initial={{ opacity: 0, y: 15, scale: 0.8 }}
                animate={{ opacity: [0, 0.5, 0], y: [15, -55], x: [0, 12, -8], scale: [0.8, 1.2, 1.6] }}
                transition={{ duration: 2.5, delay: 0.8, repeat: Infinity, ease: "easeOut" }}
                className="pour-steam2"
              />
              {pourPercent > 60 && (
                <motion.div
                  key="steam3"
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{ opacity: [0, 0.3, 0], y: [15, -35], x: [0, -5, -12], scale: [0.8, 1.3, 1.5] }}
                  transition={{ duration: 3.2, delay: 1.5, repeat: Infinity, ease: "easeOut" }}
                  className="pour-steam3"
                />
              )}
            </>
          )}
        </div>

        {/* Floating elements representing aroma */}
        {success && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1], opacity: [0, 0.8, 0], y: -80, x: (i - 2.5) * 20 }}
                transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
                className="absolute text-brand-500"
              >
                <Heart className="w-4 h-4 fill-brand-500 text-brand-500" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Interactive Teapot (Silver) */}
        <motion.div
          animate={
            isPouring
              ? { rotate: -38, x: -45, y: -45 }
              : success
              ? { rotate: [0, -5, 0], y: 0 }
              : { rotate: 0, y: -20, x: -70 }
          }
          className="pour-teapot"
          transition={{ type: "spring", stiffness: 70, damping: 10 }}
        >
          {/* Ornate silver Moroccan Teapot Graphic */}
          <svg viewBox="0 0 160 120" className="w-full h-full drop-shadow-md">
            {/* Handle */}
            <path d="M120,40 C145,25 155,75 125,90" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            <path d="M121,45 C140,32 148,70 125,83" fill="none" stroke="#cbd5e1" strokeWidth="3" />
            {/* Handle Accent Wood brown */}
            <rect x="135" y="52" width="6" height="15" rx="3" fill="#854d0e" />
            {/* Main Body */}
            <ellipse cx="85" cy="70" rx="38" ry="32" fill="url(#silver-grad)" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="85" cy="70" r="28" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
            {/* Mirror lines */}
            <path d="M60,60 Q70,45 85,60" fill="none" stroke="#f1f5f9" strokeWidth="3" opacity="0.3" />
            <path d="M55,75 Q85,100 115,75" fill="none" stroke="#f1f5f9" strokeWidth="1" opacity="0.2" />
            {/* Ornate Miramar crest on teapot */}
            <text x="85" y="74" textAnchor="middle" fill="#64748b" className="font-serif text-[7px] font-bold tracking-widest uppercase">M</text>
            {/* Base Ring */}
            <ellipse cx="85" cy="102" rx="20" ry="5" fill="#64748b" />
            <ellipse cx="85" cy="101" rx="19" ry="4" fill="#cbd5e1" />
            {/* Lid and Spire */}
            <path d="M62,40 Q85,32 108,40 L102,30 Q85,28 68,30 Z" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
            <path d="M85,15 L85,28" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
            <circle cx="85" cy="13" r="5" fill="#f59e0b" /> {/* gold knob */}
            {/* Spout */}
            <path d="M48,78 C35,76 15,48 5,55 C12,50 30,73 48,82 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
            {/* Gold details */}
            <rect x="75" y="100" width="20" height="2" fill="#f59e0b" />
            
            <defs>
              <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f1f5f9" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="85%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Dynamic Tea Stream (Liquid Flow) */}
        <AnimatePresence>
          {isPouring && pourPercent < 100 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 110, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pour-stream"
              style={{
                background: 'linear-gradient(to bottom, #d97706, #059669)',
              }}
            >
              {/* Animated water waves ripple inside flow */}
              {[...Array(4)].map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: [0, 80] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: idx * 0.15, ease: "linear" }}
                  className="w-1 h-3 bg-amber-200/50 rounded-full mx-auto"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Traditional patterned Moroccan Tea Glass */}
        <div className="pour-glass">
          {/* Glass Contour */}
          <div className="pour-glass-inner">
            
            {/* Glass Gold Filigree Pattern Overlay */}
            <div className="pour-glass-filigree">
              <div className="pour-glass-filigree-flowers">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[6px] text-amber-500/80 font-serif">✿</span>
                ))}
              </div>
            </div>
            
            {/* Liquid Level */}
            <div
              className="pour-liquid"
              style={{ height: `${pourPercent}%` }}
            >
              {/* Frothy Bubbles/Foam Top Layer (Ataï Rzéza - Turbanned Tea!) */}
              {pourPercent > 5 && (
                <motion.div
                  animate={isPouring ? { y: [0, -1, 0], scaleY: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 0.4 }}
                  className="pour-foam"
                >
                  <div className="pour-foam-row">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-white/75 border border-amber-300/30 shrink-0"
                        style={{
                          transform: `translateY(${Math.sin(i + pourPercent) * 2}px)`,
                          opacity: 0.8 + (i % 3) * 0.1
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Internal Bubbles */}
              {pourPercent > 10 && isPouring && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: [80, 5], opacity: [0, 0.7, 0] }}
                      transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: i * 0.2 }}
                      className="absolute w-1 h-1 rounded-full bg-white/40"
                      style={{ left: `${15 + i * 14}%` }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Glass Rim Highlight */}
          <div className="absolute top-0 inset-x-1.5 h-[3px] bg-white/60 blur-[0.2px] rounded-t-full" />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="w-full mt-6 flex flex-col gap-3">
        {success ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="pour-success-alert"
          >
            <div className="pour-success-title">
              <Gift className="w-4 h-4 text-brand-600" /> Thé Royal Réussi !
            </div>
            Votre thé est parfaitement moussé, digne des plus grands salons de Fès. Passez nous voir pour déguster le vrai « Ataï fassi ».
          </motion.div>
        ) : (
          <p className="pour-helper-text">
            {isPouring ? "Versement en cours... Maintenez l'appui" : "Maintenez le bouton ci-dessous enfoncé"}
          </p>
        )}

        <div className="flex gap-2">
          <button
            onMouseDown={() => pourPercent < 100 && setIsPouring(true)}
            onMouseUp={() => setIsPouring(false)}
            onMouseLeave={() => setIsPouring(false)}
            onTouchStart={() => pourPercent < 100 && setIsPouring(true)}
            onTouchEnd={() => setIsPouring(false)}
            disabled={success}
            className={`pour-action-btn ${
              success
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isPouring
                ? 'bg-emerald-600 text-white translate-y-[1px]'
                : 'bg-brand-600 hover:bg-brand-700 text-white hover:shadow-md'
            }`}
          >
            <Coffee className="w-4 h-4" />
            {pourPercent === 0 
              ? 'Commencer à Verser' 
              : success 
              ? 'Tasse Remplie !' 
              : isPouring 
              ? `Versement... ${Math.round(pourPercent)}%` 
              : 'Continuer à Verser'}
          </button>

          {(pourPercent > 0 || success) && (
            <button
              onClick={handleReset}
              className="pour-reset-btn"
              title="Recommencer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
