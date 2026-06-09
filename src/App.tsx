import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import MenuSection from './components/MenuSection';
import CustomWaffleBuilder from './components/CustomWaffleBuilder';
import InteractivePourer from './components/InteractivePourer';
import ReviewSlider from './components/ReviewSlider';
import PreOrderTray, { CartItem } from './components/PreOrderTray';
import { POPULAR_HOURS } from './data/menu';

import {
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Sparkles,
  Calendar,
  Users,
  UtensilsCrossed,
  Hourglass,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Instagram,
} from 'lucide-react';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Hero slide states
  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlides = [
    {
      title: 'Art de Vivre & Traditions à Fès',
      subtitle: 'CAFÉ • PÂTISSERIE • RESTAURANT • GLACIER',
      tagline: 'Une expérience sensorielle unique combinant l’excellence des Pâtisseries fines, le croustillant de nos Pizzas artisanales et la pure tradition du Thé Fassi.',
      bgImage: '/assets/images/hero_miramar_1780518006911.png',
      ctaText: 'Découvrir la Carte Directe',
      ctaHref: '#menu-section',
    },
    {
      title: 'L’Authentique Tajine de Couscous',
      subtitle: 'CUISINE TRADITIONNELLE MAROCAINE',
      tagline: 'Laissez-vous envoûter par des recettes séculaires préparées avec soin, à la juste cuisson et relevées d’arômes orientaux exquis.',
      bgImage: '/assets/images/couscous_miramar_1780518024415.png',
      ctaText: 'Nos Spécialités',
      ctaHref: '#menu-section',
    },
    {
      title: 'Plaisirs Infiniment Chocolatés',
      subtitle: 'GAUFRES & DÉLICES SUR COMMANDE',
      tagline: 'Une envie gourmande de fin d’après-midi ? Concevez votre gaufre ou déguster nos douceurs fétiches sous notre terrasse enchanteresse.',
      bgImage: '/assets/images/waffles_miramar_1780518039741.png',
      ctaText: 'Créer ma Gaufre',
      ctaHref: '#waffle-builder',
    }
  ];

  // Auto scroll high-quality photos slideshow in hero
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(slideTimer);
  }, []);

  // Shared Cart operations
  const handleAddToCart = (name: string, price: number, details?: string) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.name === name && item.details === details);
      if (idx > -1) {
        const next = [...prev];
        next[idx].quantity += 1;
        return next;
      }
      return [...prev, { id: Math.random().toString(), name, price, quantity: 1, details }];
    });
    // Visual notifications: bounce cart button open brief
    setCartOpen(true);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleIncrement = (index: number) => {
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity += 1;
      return next;
    });
  };

  const handleDecrement = (index: number) => {
    setCart((prev) => {
      const next = [...prev];
      if (next[index].quantity > 1) {
        next[index].quantity -= 1;
      } else {
        return prev.filter((_, i) => i !== index);
      }
      return next;
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Reservation booking submit
  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const guests = formData.get('guests') as string;
    const serviceType = formData.get('serviceType') as string;
    const notes = formData.get('notes') as string;

    const bookingMessage = `*Bonjour Café Restaurant Miramar !*\n\nJe souhaite réserver une table :\n\n *Nom Complet :* ${fullName}\n *Téléphone :* ${phone}\n *Date :* ${date}\n *Heure :* ${time}\n *Nombre de personnes :* ${guests}\n *Service :* ${serviceType}\n *Notes :* ${notes || 'Aucune'}\n\nMerci !`;
    const encodedText = encodeURIComponent(bookingMessage);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    
    setBookingSuccess(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noreferrer');
      setBookingSuccess(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen text-slate-800 flex flex-col font-sans selection:bg-brand-100 selection:text-brand-900" id="hero">
      
      {/* 1. Header Toolbar navigation */}
      <Navbar onCartClick={() => setCartOpen(p => !p)} cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} />

      {/* 2. Slide Drawer for Virtual order basket items preview */}
      <PreOrderTray
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onClearCart={handleClearCart}
      />

      {/* 3. Dramatic Dynamic Hero Slideshow with beautiful overlays */}
      <section className="relative w-full h-[98vh] flex items-center overflow-hidden bg-slate-950">
        
        {/* Background photorealistic image fade transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[heroIndex].bgImage})` }}
          />
        </AnimatePresence>

        {/* Ambient top & bottom darkening overlays */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/90 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-left text-white mt-10 relative">
          
          {/* Subtle moving sparkle badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={`sb-${heroIndex}`}
            className="inline-flex items-center gap-2 bg-brand-500/80 hover:bg-brand-500 text-white font-sans text-[10px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-sm mb-5 backdrop-blur-xs transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-pulse" />
            {heroSlides[heroIndex].subtitle}
          </motion.div>

          <div className="max-w-3xl">
            {/* Playfair Luxury Display Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              key={`h1-${heroIndex}`}
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight text-white leading-[1.1] mb-6"
            >
              {heroSlides[heroIndex].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              key={`p-${heroIndex}`}
              className="text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed mb-10 max-w-2xl font-light"
            >
              {heroSlides[heroIndex].tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              key={`d-${heroIndex}`}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => {
                  const el = document.querySelector(heroSlides[heroIndex].ctaHref);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-brand-500 hover:bg-brand-600 text-white hover:text-white font-sans text-xs font-bold py-3.5 px-7 rounded-xl transition shadow-lg hover:shadow-xl hover:scale-102 cursor-pointer border-t border-brand-400 select-none uppercase tracking-wide flex items-center gap-2"
              >
                {heroSlides[heroIndex].ctaText}
              </button>

              <button
                onClick={() => {
                  const el = document.querySelector('#interactive-pourer');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 dark-glass hover:bg-white/20 text-white font-sans text-xs font-semibold py-3.5 px-6 rounded-xl transition cursor-pointer select-none border border-white/20 uppercase tracking-wide"
              >
                Rituel du Thé Fassi
              </button>
            </motion.div>
          </div>
        </div>

        {/* Carousel Bottom indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {heroSlides.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setHeroIndex(dotIdx)}
              className={`h-2.5 rounded-full cursor-pointer transition-all duration-300 outline-none ${
                dotIdx === heroIndex ? 'w-8 bg-brand-500' : 'w-2.5 bg-white/40'
              }`}
              title={`Diapositive ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* Floating scroll indicator */}
        <div className="absolute bottom-6 right-8 hidden md:flex items-center gap-2.5 text-white/50 text-[10px] uppercase font-mono tracking-widest select-none">
          <span>Faites défiler</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-4 h-7 rounded-full border border-white/30 p-1 flex justify-center"
          >
            <div className="w-1 h-1.5 rounded-full bg-white/70" />
          </motion.div>
        </div>
      </section>

      {/* 4. Section: Interactive Tea Ritual (Pourer widget + description) */}
      <section className="py-20 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
        
        {/* Abstract background green fog blur */}
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-emerald-950/30 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-teal-950/20 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Text Description Left */}
          <div className="md:col-span-7 text-left space-y-6">
            <span className="text-brand-500 text-xs font-bold font-mono uppercase tracking-widest block bg-brand-950/50 border border-brand-900/40 rounded-full px-3 py-1 inline-block">
              Héritage Fassi
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold leading-tight tracking-tight">
              L’Art Millénaire du <br />
              <span className="text-brand-500">Mousse et de la Menthe</span>
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              À Café Restaurant Pâtisserie Miramar, le thé à la menthe (« Ataï ») est un symbole d'accueil et d'art de vivre. Cultivant une recette typiquement Fassie, notre thé est infusé lentement dans des théières ciselées en argent, puis versé de haut pour oxygéner la boisson et créer cette mousse d’or caractéristique, symbole de générosité.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 text-left">
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl">
                <h4 className="text-brand-500 text-xs font-mono font-bold tracking-wide uppercase">Dégustation Royale</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Servi avec nos pâtisseries fines maison (Cornes de gazelle, Gâteaux aux dates, Sablés fins).
                </p>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl">
                <h4 className="text-brand-500 text-xs font-mono font-bold tracking-wide uppercase">Ingrédients Nobles</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Feuillettes de thé vert Gunpowder de premier choix et menthe poivrée cueillie fraîche.
                </p>
              </div>
            </div>
            
            <div className="pt-2 flex items-center gap-3 text-xs text-brand-500 font-semibold animate-pulse-subtle">
              <Hourglass className="w-4 h-4 shrink-0" />
              <span>Faites l’expérience du verseur virtuel interactif en maintenant le bouton !</span>
            </div>
          </div>

          {/* Interactive Widget Right */}
          <div className="md:col-span-5 flex justify-center items-center">
            <InteractivePourer />
          </div>

        </div>
      </section>

      {/* 5. Section: Explorer Menu preview */}
      <section className="py-24 bg-[#0A0A0A] relative border-t border-b border-white/5" id="menu-section">
        
        {/* Accent circle decorations */}
        <div className="absolute top-10 left-12 w-64 h-64 border border-dashed border-white/5 rounded-full scale-110 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mb-12">
          <span className="bg-brand-500/10 text-brand-500 text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full inline-block mb-4 border border-brand-500/20">
            Preview de notre Cuisine
          </span>
          
          <h2 className="serif-display text-4xl sm:text-5xl md:text-6xl text-white font-black italic tracking-tighter uppercase leading-[0.85] mb-4">
            NOTRE CARTE<br />
            <span className="text-outline text-[#F5F5F0]">GOURMANDE</span>
          </h2>
          
          <p className="text-xs text-white/60 mt-4 max-w-lg mx-auto leading-relaxed font-light">
            Pizzas dorées au feu de bois, burgers gourmets croustillants, tajines traditionnels et douceurs créatives. Sélectionnez vos délices préférés pour préparer votre plateau !
          </p>
        </div>

        {/* Dynamic List menu explorer item cards */}
        <MenuSection onAddToOrder={handleAddToCart} />
      </section>

      {/* 6. Section: Sweet custom waffle builder */}
      <section className="py-24 bg-[#0F0F0F] relative border-b border-white/5" id="waffle-builder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <span className="bg-brand-500/10 text-brand-500 text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full inline-block mb-4 border border-brand-500/20">
            Atelier Miramar
          </span>
          <h2 className="serif-display text-4xl sm:text-5xl md:text-6xl text-white font-black italic tracking-tighter uppercase leading-[0.85] mb-4">
            VOTRE GAUFRE SUR<br />
            <span className="text-outline text-brand-500">MESURE</span>
          </h2>
          <p className="text-xs text-white/60 mt-4 max-w-md mx-auto font-light leading-relaxed">
            Sélectionnez vos nappages chocolatés, garnitures croquantes, fruits juteux et composez votre propre chef-d'œuvre.
          </p>
        </div>

        <CustomWaffleBuilder onAddToOrder={(waffleSummary, price) => handleAddToCart(waffleSummary, price, 'Gaufre Personnalisé')} />
      </section>

      {/* 7. Section: Photo gallery & Modern ambiance */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="gallery-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <span className="text-brand-500 text-[10px] font-bold font-mono tracking-widest uppercase block mb-2">
            Ambiance & Décoration
          </span>
          <h2 className="font-serif text-3xl text-white font-bold tracking-tight">
            Le Cadre Moderne de Miramar
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 max-w-md mx-auto leading-relaxed">
            Notre salon mêle design de luxe contemporain avec de superbes canapés en velours gris et un éclairage indirect vert et blanc, offrant le parfait cocon pour le repos et les affaires à Fès.
          </p>
        </div>

        {/* Photography Bento Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {/* Main big interior landscape */}
          <div className="sm:col-span-2 relative group rounded-3xl overflow-hidden aspect-video bg-slate-800 border border-slate-700 select-none shadow-md">
            <img
              src="/assets/images/interior_miramar_1780518054860.png"
              alt="Salon Moderne Miramar Fès"
              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
              <div className="text-left">
                <span className="text-[10px] font-mono tracking-widest font-semibold uppercase text-brand-400 bg-brand-950/80 rounded px-2.5 py-1">Intérieur Lumineux</span>
                <h4 className="font-serif text-lg font-bold text-white mt-2">Design Contemporain & Confort d'Élite</h4>
              </div>
            </div>
          </div>

          {/* Tea pour card square */}
          <div className="relative group rounded-3xl overflow-hidden aspect-square bg-slate-800 border border-slate-700 select-none shadow-md">
            <img
              src="/assets/images/hero_miramar_1780518006911.png"
              alt="Rituel du thé"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-5">
              <div className="text-left">
                <span className="text-[10px] font-mono tracking-widest text-brand-400 bg-brand-950/85 px-2 py-0.5 rounded">Rituels</span>
                <h4 className="font-serif text-sm font-bold text-white mt-1">L'Ataï traditionnel Royal</h4>
              </div>
            </div>
          </div>

          {/* Waffles close card square */}
          <div className="relative group rounded-3xl overflow-hidden aspect-square bg-slate-800 border border-slate-700 select-none shadow-md">
            <img
              src="/assets/images/waffles_miramar_1780518039741.png"
              alt="Dessert de luxe"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-5">
              <div className="text-left">
                <span className="text-[10px] font-mono tracking-widest text-brand-400 bg-brand-950/85 px-2 py-0.5 rounded">Sucré</span>
                <h4 className="font-serif text-sm font-bold text-white mt-1">Gaufre Suprême au Nutella</h4>
              </div>
            </div>
          </div>

          {/* Couscous clay tagine */}
          <div className="sm:col-span-2 relative group rounded-3xl overflow-hidden aspect-video bg-slate-800 border border-slate-700 select-none shadow-md">
            <img
              src="/assets/images/couscous_miramar_1780518024415.png"
              alt="Tagine Couscous Miramar"
              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
              <div className="text-left">
                <span className="text-[10px] font-mono tracking-widest font-semibold uppercase text-brand-400 bg-brand-950/80 rounded px-2.5 py-1">Traditions</span>
                <h4 className="font-serif text-lg font-bold text-white mt-2">Le Couscous Royal du Vendredi ou sur demande</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Section: Customer Reviews Carousel */}
      <section className="py-24 bg-[#0A0A0A] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <span className="bg-brand-500/10 text-brand-500 text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full inline-block border border-brand-500/20">
            Avis & Partages (3.9 ★)
          </span>
          <h2 className="serif-display text-4xl sm:text-5xl md:text-6xl text-white font-black italic tracking-tighter uppercase leading-[0.85] mt-4 mb-4">
            L'EXPÉRIENCE<br />
            <span className="text-outline text-[#F5F5F0]">MIRAMAR</span>
          </h2>
          <p className="text-xs text-white/50 mt-4 max-w-sm mx-auto font-light leading-relaxed">
            Plus de 150 personnes partagent leurs moments de détente fassienne dans notre salon.
          </p>
        </div>

        <ReviewSlider />
      </section>

      {/* 9. Section: About & Location, coordinates, busyness hours chart, table reservation form */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden" id="about-section">
        
        {/* Background visual detail */}
        <div className="absolute -bottom-10 right-0 text-[18vw] font-serif font-bold text-slate-900/40 select-none z-0 pointer-events-none leading-none">
          MIRAMAR
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Left Column: Coordinates & Real-time busyness charts */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div>
              <span className="text-brand-500 text-xs font-bold font-mono uppercase tracking-widest block mb-1">
                Localisation & Heures
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight">Nous rendre visite à Fès</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Venez pour votre pause de midi, votre séance thé pâtisserie de fin d'après-midi, ou un dîner familial !
              </p>
            </div>

            <div className="space-y-4">
              {/* Address card */}
              <div className="flex gap-4 items-start bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div className="bg-brand-950 p-2.5 rounded-xl border border-brand-900/50 text-brand-500 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <h4 className="font-semibold text-white">Notre Adresse Officielle</h4>
                  <p className="text-slate-400 mt-1 leading-relaxed">
                    Rce Bismillah, 18 Av. Ain S'men,<br />
                    Fès 30020, Maroc (Fez)
                  </p>
                  <a
                    href="https://maps.google.com/?q=Rce+Bismillah,+18+Av.+Ain+S'men,+Fès+30020"
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-500 hover:underline mt-2 inline-block font-semibold"
                  >
                    Ouvrir sur Google Maps →
                  </a>
                </div>
              </div>

              {/* Hours / Call card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-3.5 items-start bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                  <div className="bg-brand-950 p-2.5 rounded-xl border border-brand-900/50 text-brand-500 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <h4 className="font-semibold text-white font-serif">Horaires d'ouverture</h4>
                    <p className="text-slate-450 mt-1 font-mono">Chaque jour :</p>
                    <p className="font-bold text-white mt-0.5">07:00 - 00:00 (Minuit)</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                  <div className="bg-brand-950 p-2.5 rounded-xl border border-brand-900/50 text-brand-500 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <h4 className="font-semibold text-white font-serif">Réservation WhatsApp</h4>
                    <p className="text-slate-450 mt-1 font-mono">Ligne directe :</p>
                    <p className="font-bold text-brand-500 mt-0.5">phone</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated busyness Popular Hours charts based on screenshot */}
            <div className="bg-slate-900/70 p-5 rounded-3xl border border-slate-800/80">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-brand-500" />
                  <span className="font-serif text-sm font-bold">Affluence en Direct</span>
                </div>
                <span className="text-[10px] bg-brand-950 text-brand-500 font-bold border border-brand-900/50 rounded-full px-2 py-0.5">
                  Mardi 17:00 • Plus agité que d'habitude
                </span>
              </div>

              {/* Responsive columns bar chart */}
              <div className="h-28 flex items-end gap-1 px-1.5 pt-4">
                {POPULAR_HOURS.map((hourObj, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                    
                    {/* Tooltip on hovering hour column */}
                    <span className="absolute -top-7 scale-0 group-hover:scale-100 bg-slate-800 text-white border border-slate-700 text-[8px] tracking-wide py-0.5 px-1.5 rounded-sm z-20 pointer-events-none transition-all duration-150">
                      {hourObj.busy}%
                    </span>

                    {/* Bar Column representation */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${hourObj.busy}%` }}
                      transition={{ duration: 1.5, delay: idx * 0.05, ease: 'easeOut' }}
                      className={`w-full rounded-t-xs hover:opacity-85 transition-opacity ${
                        hourObj.isCurrent
                          ? 'bg-linear-to-t from-rose-600 via-rose-500 to-amber-500 shadow-md'
                          : 'bg-linear-to-t from-brand-900 to-brand-500'
                      }`}
                    />

                    {/* Label */}
                    <span className="text-[8px] text-slate-500 font-mono mt-2 select-none">
                      {hourObj.hour.split(':')[0]}h
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-slate-450 italic text-center mt-4">
                Les pics d'affluence se situent généralement autour de la pause de 17h (Thé / Gaufres) et le dîner de 20h.
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Table Reservation scheduler connected with WhatsApp */}
          <div className="lg:col-span-6 bg-slate-900/80 rounded-3xl p-6 md:p-8 border border-slate-800/80 shadow-2xl">
            <div className="text-left mb-6">
              <span className="bg-brand-950 text-brand-500 border border-brand-900/40 text-[10px] font-mono tracking-widest font-bold uppercase rounded-full px-3 py-1 inline-block mb-2">
                Simulateur de Réservation
              </span>
              <h3 className="font-serif text-2xl font-bold">Réservez une Table Royale</h3>
              <p className="text-xs text-slate-400 mt-1">
                Remplissez les détails ci-dessous pour formuler un message de réservation instantané prêt à être envoyé à notre équipe.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-left text-xs">
              
              {/* Full Name input */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 uppercase tracking-wide">Nom Complet</label>
                <input
                  required
                  type="text"
                  name="fullName"
                  placeholder="Ex: Mourad Alami"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder:text-slate-650 focus:border-brand-500 outline-none transition"
                />
              </div>

              {/* Grid 2x2 phone and Guests counts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 uppercase tracking-wide">Numéro de Téléphone</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="Ex: "
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder:text-slate-650 focus:border-brand-500 outline-none transition font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 uppercase tracking-wide flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" /> Nombre d'invités
                  </label>
                  <select
                    name="guests"
                    defaultValue="2"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-brand-500 outline-none transition"
                  >
                    <option value="1">1 Personne</option>
                    <option value="2">2 Personnes</option>
                    <option value="3">3 Personnes</option>
                    <option value="4">4 Personnes</option>
                    <option value="5">5 Personnes</option>
                    <option value="6+">Plus de 6 personnes</option>
                  </select>
                </div>
              </div>

              {/* Grid 2x2 Date and Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 uppercase tracking-wide flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date souhaitée
                  </label>
                  <input
                    required
                    type="date"
                    name="date"
                    defaultValue="2026-06-04"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-brand-500 outline-none transition font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 uppercase tracking-wide">Heure</label>
                  <select
                    name="time"
                    defaultValue="17:00"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-brand-500 outline-none transition font-mono"
                  >
                    <option value="08:00">08:00 (Petit déj)</option>
                    <option value="12:30">12:30 (Déjeuner)</option>
                    <option value="16:00">16:00 (Thé & Waffles)</option>
                    <option value="17:00">17:00 (Thé & Waffles)</option>
                    <option value="19:30">19:30 (Dîner)</option>
                    <option value="21:00">21:00 (Dîner)</option>
                    <option value="22:30">22:30 (Sortie Glace)</option>
                  </select>
                </div>
              </div>

              {/* Service Type selection */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 uppercase tracking-wide flex items-center gap-1">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-slate-400" /> Style de Moment
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['dining', 'tea-time', 'celebration'].map((type) => (
                    <label
                      key={type}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-center cursor-pointer block hover:border-slate-600 transition flex flex-col justify-center items-center h-16"
                    >
                      <input
                        type="radio"
                        name="serviceType"
                        value={type}
                        defaultChecked={type === 'tea-time'}
                        className="sr-only peer"
                      />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block pointer-events-none">
                        {type === 'dining' ? ' Dîner' : type === 'tea-time' ? ' Goûter' : ' Fête'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes inputs */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 uppercase tracking-wide">Note ou demande spéciale (Optionnelle)</label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Ex: Une table près de la baie vitrée ou chaise bébé..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder:text-slate-650 focus:border-brand-500 outline-none transition"
                />
              </div>

              {/* Booking CTAs */}
              <div className="pt-4">
                <AnimatePresence>
                  {bookingSuccess ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-brand-500 border border-brand-600 text-white p-3 rounded-xl text-center font-bold flex items-center justify-center gap-2 mb-2"
                    >
                      <CheckCircle className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" />
                      Redirection vers WhatsApp en cours...
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-brand-500 hover:bg-brand-600 font-sans text-xs font-bold text-white uppercase tracking-wider rounded-xl cursor-pointer transition shadow-lg flex items-center justify-center gap-1.5 hover:shadow-xl"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>Confirmer la Réservation</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* 10. Footer Section with credits */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center">
          
          <div className="flex items-center gap-1.5 justify-center">
            <div className="w-6 h-6 rounded-full bg-brand-900 flex items-center justify-center text-brand-50 text-[10px] font-bold">
              M
            </div>
            <span className="font-serif font-bold text-white">Café Restaurant Pâtisserie Miramar</span>
          </div>

          <div className="text-[10px] uppercase font-mono tracking-wider">
            © 2026 Café Miramar Fès • Tous droits réservés.
          </div>

          <div className="flex items-center gap-4 justify-center">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white p-1 rounded-full transition"
              title="Instagram Page"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-500 p-1 rounded-full transition"
              title="Ligne WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>

        </div>
      </footer>
    </div>
  );
}
