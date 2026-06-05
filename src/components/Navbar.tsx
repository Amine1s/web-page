import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X, CupSoda, MessageSquare } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  onCartClick?: () => void;
  cartCount?: number;
}

export default function Navbar({ onCartClick, cartCount = 0 }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Rituel du Thé', href: '#interactive-pourer' },
    { name: 'Le Menu', href: '#menu-section' },
    { name: 'Créez votre Gaufre', href: '#waffle-builder' },
    { name: 'Avis Clients', href: '#reviews-carousel' },
    { name: 'Contact & Accès', href: '#about-section' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`navbar-header ${
          scrolled ? 'navbar-scrolled' : 'navbar-transparent'
        }`}
      >
        <div className="navbar-container">
          
          {/* Logo Brand / Identity */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="logo-anchor group"
          >
            <div className="logo-badge">
              M
            </div>
            <div className="logo-text-group">
              <span className="logo-title">MIRAMAR</span>
              <span className="logo-subtitle">Café • Pâtisserie</span>
            </div>
          </a>

          {/* Desktop Anchor Navigation */}
          <nav className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="nav-link"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action buttons (WhatsApp Reserve & Shopping Cart indicator) */}
          <div className="actions-container">
            
            {/* Shopping Cart Trigger */}
            <button
              onClick={onCartClick}
              className="cart-trigger-btn"
              title="Mon ordonnance du goût"
              id="cart-trigger-btn"
            >
              <CupSoda className="w-4 h-4" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="cart-count-badge"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Direct Dial WhatsApp Call */}
            <a
              href="https://wa.me/?text=Bonjour%20Miramar%2C%20je%20souhaite%20réserver%20une%20table."
              target="_blank"
              rel="noreferrer"
              className="whatsapp-call-btn"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>watsapp num</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(p => !p)}
              className="mobile-menu-toggle"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Slide Navigation (AnimatePresence) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-drawer"
          >
            <div className="mobile-links-container">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="mobile-nav-link"
                >
                  {link.name}
                </button>
              ))}
              
              <div className="mobile-actions-container">
                <a
                  href="https://wa.me/?text=Bonjour%20Miramar%2C%20je%20souhaite%20réserver%20une%20table."
                  target="_blank"
                  rel="noreferrer"
                  className="mobile-whatsapp-btn"
                >
                  <MessageSquare className="w-4 h-4" /> Réservez sur WhatsApp
                </a>
                <a
                  href="tel:+"
                  className="mobile-call-btn"
                >
                  <Phone className="w-4 h-4" /> Appelez : phone num
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
