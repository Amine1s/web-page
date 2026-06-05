import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShoppingBag, Trash2, CheckCircle } from 'lucide-react';
import { CustomWaffle } from '../types';
import './CustomWaffleBuilder.css';

interface TOPPING_OPTION {
  id: string;
  name: string;
  price: number;
  color: string;
  accentClass: string;
}

const AVAILABLE_TOPPINGS: TOPPING_OPTION[] = [
  { id: 'strawberries', name: 'Fraises Fraîches', price: 4, color: '#f43f5e' , accentClass: 'bg-rose-500' },
  { id: 'oreos', name: 'Éclats d’Oreo', price: 3, color: '#1e293b', accentClass: 'bg-slate-800' },
  { id: 'kinder-bueno', name: 'Kinder Bueno', price: 5, color: '#78350f', accentClass: 'bg-amber-900' },
  { id: 'whipped-cream', name: 'Crème Chantilly', price: 2, color: '#f8fafc', accentClass: 'bg-slate-100' },
  { id: 'almonds', name: 'Amandes Grillées', price: 3, color: '#d97706', accentClass: 'bg-amber-600' },
];

const SAUCE_OPTIONS = [
  { id: 'none', name: 'Sans Sauce', price: 0, color: 'transparent', class: 'bg-slate-100' },
  { id: 'milk-chocolate', name: 'Chocolat au Lait', price: 3, color: '#451a03', class: 'bg-amber-950' },
  { id: 'white-chocolate', name: 'Chocolat Blanc', price: 3, color: '#fef3c7', class: 'bg-amber-100 border border-amber-200' },
  { id: 'nutella', name: 'Nutella Chaud', price: 4, color: '#270c02', class: 'bg-[#1b0802]' },
  { id: 'mixed', name: 'Zèbre Chocolat', price: 4, color: 'stripes', class: 'bg-gradient-to-r from-amber-950 via-amber-100 to-amber-950' },
];

interface CustomWaffleBuilderProps {
  onAddToOrder?: (waffleSummary: string, price: number) => void;
}

export default function CustomWaffleBuilder({ onAddToOrder }: CustomWaffleBuilderProps) {
  const [waffle, setWaffle] = useState<CustomWaffle>({
    sauce: 'nutella',
    toppings: ['strawberries', 'whipped-cream'],
    extraIceCream: false
  });
  const [added, setAdded] = useState(false);

  const basePrice = 18; // Plain waffle price in MAD
  const saucePrice = SAUCE_OPTIONS.find(s => s.id === waffle.sauce)?.price || 0;
  const toppingsPrice = waffle.toppings.reduce((total, topId) => {
    const option = AVAILABLE_TOPPINGS.find(t => t.id === topId);
    return total + (option ? option.price : 0);
  }, 0);
  const iceCreamPrice = waffle.extraIceCream ? 5 : 0;
  
  const totalPrice = basePrice + saucePrice + toppingsPrice + iceCreamPrice;

  const toggleTopping = (toppingId: string) => {
    setAdded(false);
    setWaffle(prev => {
      if (prev.toppings.includes(toppingId)) {
        return { ...prev, toppings: prev.toppings.filter(t => t !== toppingId) };
      } else {
        return { ...prev, toppings: [...prev.toppings, toppingId] };
      }
    });
  };

  const handleSauceChange = (sauceId: any) => {
    setAdded(false);
    setWaffle(prev => ({ ...prev, sauce: sauceId }));
  };

  const toggleIceCream = () => {
    setAdded(false);
    setWaffle(prev => ({ ...prev, extraIceCream: !prev.extraIceCream }));
  };

  const handleReset = () => {
    setWaffle({
      sauce: 'none',
      toppings: [],
      extraIceCream: false
    });
    setAdded(false);
  };

  const handleAddClick = () => {
    setAdded(true);
    if (onAddToOrder) {
      const sauceName = SAUCE_OPTIONS.find(s => s.id === waffle.sauce)?.name || 'Sans';
      const toppingsNames = waffle.toppings.map(t => AVAILABLE_TOPPINGS.find(o => o.id === t)?.name).filter(Boolean).join(', ');
      const extraLabel = waffle.extraIceCream ? ' (+ Boule Glace Vanille)' : '';
      const summary = `Gaufre Création (Nappe: ${sauceName}${toppingsNames ? `, Éléments: ${toppingsNames}` : ''}${extraLabel})`;
      onAddToOrder(summary, totalPrice);
    }
  };

  return (
    <div className="waffle-root-panel" id="waffle-builder">
      
      {/* 1. Left Side: Dynamic Animated Visual Canvas */}
      <div className="waffle-canvas-container">
        
        {/* Floating sparkles behind */}
        <div className="waffle-decor-sparkles">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-full h-full border border-dashed border-brand-500/10 rounded-full scale-110" />
        </div>

        {/* Waffle Platter Plate */}
        <div className="waffle-platter">
          
          {/* Ceramic Plate */}
          <div className="plate-base">
            <div className="plate-inner" />
          </div>

          {/* Golden Baked Waffle Base */}
          <motion.div 
            animate={{ scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="waffle-base"
          >
            {/* Waffle Grids */}
            <div className="waffle-grid-container">
              {[...Array(16)].map((_, idx) => (
                <div key={idx} className="waffle-grid-indent">
                  {/* Miniature dip inside grid */}
                  <div className="waffle-inner-dip" />
                </div>
              ))}
            </div>

            {/* Sauce Fill Layer */}
            <AnimatePresence>
              {waffle.sauce !== 'none' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none mix-blend-multiply"
                >
                  {waffle.sauce === 'milk-chocolate' && (
                    <div className="w-full h-full bg-[#3b1c06] opacity-90" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #2a1403 70%)' }} />
                  )}
                  {waffle.sauce === 'white-chocolate' && (
                    <div className="w-full h-full bg-[#fef8e7] opacity-85" />
                  )}
                  {waffle.sauce === 'nutella' && (
                    <div className="w-full h-full bg-[#1e0a02]" style={{ clipPath: 'polygon(0% 15%, 20% 0%, 55% 10%, 80% 0%, 100% 20%, 90% 75%, 100% 100%, 50% 90%, 10% 100%)' }} />
                  )}
                  {waffle.sauce === 'mixed' && (
                    <div className="w-full h-full bg-amber-950" style={{ background: 'repeating-linear-gradient(45deg, #2c1202, #2c1202 12px, #fdf8eb 12px, #fdf8eb 24px)' }} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simulated drizzles layout */}
            {waffle.sauce !== 'none' && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none fill-none stroke-amber-950/40" viewBox="0 0 100 100">
                <path d="M10,25 Q30,10 50,30 T90,20" stroke={waffle.sauce === 'white-chocolate' ? '#ffffff' : '#311003'} strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
                <path d="M5,50 Q45,25 65,75 T95,50" stroke={waffle.sauce === 'white-chocolate' ? '#ffffff' : '#210c03'} strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
                <path d="M15,80 Q50,60 85,85" stroke={waffle.sauce === 'white-chocolate' ? '#fbf8eb' : '#451a03'} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
              </svg>
            )}

            {/* Rendered Toppings on Waffle Platters */}
            <div className="waffle-toppings-viewport">
              
              {/* Topping: Chantilly/Whipped Cream (Always positioned at center-right) */}
              <AnimatePresence>
                {waffle.toppings.includes('whipped-cream') && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, rotate: -12 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="topping-cream-blob"
                  >
                    {/* Visual 3D swirl */}
                    <div className="topping-cream-swirl">
                      <div className="topping-cream-center">
                        <div className="topping-cream-pip" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Topping: Extra Ice Cream Scoop */}
              <AnimatePresence>
                {waffle.extraIceCream && (
                  <motion.div
                    initial={{ y: -60, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="topping-scoop-container"
                  >
                    <div className="topping-scoop-base">
                      <div className="topping-scoop-core" />
                      {/* Vanilla Seed specs */}
                      <span className="topping-scoop-seeds">. ..</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Topping Elements scattered around with preset locations */}
              
              {/* Strawberries (Red hearts as strawberries) */}
              <AnimatePresence>
                {waffle.toppings.includes('strawberries') && (
                  <>
                    <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ scale: 0 }} className="absolute top-12 left-6 text-xl z-15">🍓</motion.div>
                    <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ scale: 0 }} transition={{ delay: 0.1 }} className="absolute bottom-10 right-4 text-xl z-15">🍓</motion.div>
                    <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ scale: 0 }} transition={{ delay: 0.25 }} className="absolute top-6 left-20 text-md z-15">🍓</motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Oreos (Crushed dark wafers) */}
              <AnimatePresence>
                {waffle.toppings.includes('oreos') && (
                  <>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ opacity: 0 }} className="absolute top-16 left-16 text-md z-12">🍪</motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.15 }} className="absolute bottom-12 left-16 text-sm z-12">🍪</motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.05 }} className="absolute bottom-4 right-12 text-md z-12">🍪</motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Kinder Bueno pieces */}
              <AnimatePresence>
                {waffle.toppings.includes('kinder-bueno') && (
                  <>
                    <motion.div
                      initial={{ rotate: -45, scale: 0 }}
                      animate={{ rotate: 15, scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-2 left-6 bg-amber-950 text-amber-100 rounded-sm py-0.5 px-3 border border-amber-900 shadow-sm text-[8px] font-bold z-15"
                    >
                      BUENO
                    </motion.div>
                    <motion.div
                      initial={{ rotate: 45, scale: 0 }}
                      animate={{ rotate: -35, scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ delay: 0.12 }}
                      className="absolute bottom-6 right-2 bg-amber-950 text-amber-100 rounded-sm py-0.5 px-3 border border-amber-900 shadow-sm text-[8px] font-bold z-15"
                    >
                      BUENO
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Almonds */}
              <AnimatePresence>
                {waffle.toppings.includes('almonds') && (
                  <div className="absolute inset-0">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="absolute w-2 h-1 bg-[#b45309]/80 rounded-full border border-yellow-200/30 z-11"
                        style={{
                          left: `${20 + i * 14}%`,
                          top: `${30 + (i % 3) * 20}%`,
                          transform: `rotate(${i * 65}deg)`
                        }}
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        </div>
        
        {/* Dynamic Price floating sticker */}
        <div className="waffle-canvas-price">
          <Sparkles className="w-3" />
          {totalPrice} MAD
        </div>
      </div>

      {/* 2. Right Side: Interactive Controls and Custom Options */}
      <div className="waffle-controls-panel">
        <div>
          <div className="waffle-option-section">
            <h4 className="waffle-option-label">1. Choisissez un Nappage</h4>
            <div className="sauce-grid">
              {SAUCE_OPTIONS.map((sauce) => (
                <button
                  key={sauce.id}
                  onClick={() => handleSauceChange(sauce.id)}
                  className={`sauce-btn ${
                    waffle.sauce === sauce.id
                      ? 'sauce-btn-active'
                      : ''
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full shrink-0 ${sauce.class}`} />
                  <span className="truncate">{sauce.name}</span>
                  {sauce.price > 0 && <span className="sauce-price-tag">+{sauce.price}d</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="waffle-option-section">
            <h4 className="waffle-option-label">2. Ajoutez les Garnitures</h4>
            <div className="toppings-flex">
              {AVAILABLE_TOPPINGS.map((top) => {
                const active = waffle.toppings.includes(top.id);
                return (
                  <button
                    key={top.id}
                    onClick={() => toggleTopping(top.id)}
                    className={`topping-pill ${
                      active
                        ? 'topping-pill-active'
                        : ''
                    }`}
                  >
                    <span>{top.name}</span>
                    <span className="text-[10px] opacity-75 font-mono">+{top.price} MAD</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="waffle-option-section border-t border-white/10 pt-3">
            <h4 className="waffle-option-label">3. Option Spéciale</h4>
            <button
              onClick={toggleIceCream}
              className={`waffle-icecream-btn ${
                waffle.extraIceCream ? 'waffle-icecream-btn-active' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span>🍨</span>
                <span>Ajouter une boule de glace vanille bourbon</span>
              </div>
              <span className="font-mono text-xs">+5 MAD</span>
            </button>
          </div>
        </div>

        {/* 3. Footer Price summary & Adding to Order action */}
        <div className="waffle-footer">
          <div className="waffle-footer-summary">
            <p className="waffle-summary-title">Détail du Prix</p>
            <p className="waffle-summary-details">
              Gaufre de base ({basePrice}d) + Sauce ({saucePrice}d) + Garnitures ({toppingsPrice}d) {waffle.extraIceCream && `+ Glace (5d)`}
            </p>
          </div>

          <div className="waffle-action-btns">
            {waffle.toppings.length > 0 && (
              <button
                onClick={handleReset}
                className="waffle-trash-btn"
                title="Vider la création"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleAddClick}
              disabled={added}
              className={added ? 'waffle-cart-btn waffle-cart-btn-added' : 'waffle-cart-btn'}
            >
              {added ? (
                <>
                  <CheckCircle className="w-4 h-4" /> Ajouté au plateau !
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Ajouter pour {totalPrice} MAD
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
