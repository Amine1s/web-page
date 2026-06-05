import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, PhoneCall, X, BookOpen, Clock, Heart, ShoppingBag } from 'lucide-react';
import './PreOrderTray.css';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  details?: string;
}

interface PreOrderTrayProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (index: number) => void;
  onIncrement: (index: number) => void;
  onDecrement: (index: number) => void;
  onClearCart: () => void;
}

export default function PreOrderTray({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onIncrement,
  onDecrement,
  onClearCart,
}: PreOrderTrayProps) {
  
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let textMessage = `*Bonjour Café Restaurant Miramar !*\n\nJe souhaite passer une commande d'essai depuis l'application de votre site web :\n\n`;
    
    cartItems.forEach((item, idx) => {
      textMessage += `👉 *${item.quantity}x ${item.name}*\n`;
      if (item.details) {
        textMessage += `   _(${item.details})_\n`;
      }
      textMessage += `   Prix : ${item.price * item.quantity} MAD\n\n`;
    });

    textMessage += `-------------------------\n`;
    textMessage += `💰 *Montant Total : ${totalPrice} MAD*\n\n`;
    textMessage += `Merci de me confirmer la réception de ma pré-commande et de m’indiquer le temps d’attente ! 🙏`;

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank', 'noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop fog */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="tray-backdrop"
          />

          {/* Drawer Body panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="tray-drawer-body"
            id="preorder-drawer"
          >
            {/* Drawer Header */}
            <div className="tray-header">
              <div className="tray-header-left">
                <ShoppingBag className="w-5 h-5 text-brand-900" />
                <div>
                  <h3 className="tray-title">Mon Plateau Miramar</h3>
                  <p className="tray-subtitle">
                    Pré-commande virtuelle
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="tray-close-btn"
                title="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Item slots content */}
            <div className="tray-content">
              {cartItems.length === 0 ? (
                <div className="tray-empty-container">
                  <div className="tray-empty-icon">
                    🍱
                  </div>
                  <h4 className="tray-empty-title">Votre plateau est vide</h4>
                  <p className="tray-empty-desc">
                    Ajoutez de savoureuses gaufres personnalisées, des pizzas croustillantes au feu d'or, ou un délicieux thé à la menthe traditionnel de notre menu.
                  </p>
                  <button
                    onClick={onClose}
                    className="tray-explore-btn"
                  >
                    <BookOpen className="w-4 h-4" /> Explorer la Carte
                  </button>
                </div>
              ) : (
                <div className="tray-items-list">
                  <div className="tray-items-bar">
                    <span>Menu sélectionné ({cartItems.reduce((acc, c) => acc + c.quantity, 0)})</span>
                    <button
                      onClick={onClearCart}
                      className="tray-clear-btn"
                    >
                      <Trash2 className="w-3 h-3" /> Vider
                    </button>
                  </div>

                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${index}`}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="tray-item-card"
                    >
                      <div className="tray-card-info-top">
                        <div>
                          <h5 className="tray-card-title">
                            {item.name}
                          </h5>
                          {item.details && (
                            <p className="tray-card-details">
                              {item.details}
                            </p>
                          )}
                        </div>
                        <span className="tray-card-price">
                          {item.price * item.quantity} MAD
                        </span>
                      </div>

                      {/* Quantity Toggles */}
                      <div className="tray-card-controls-bar">
                        <span className="tray-single-price-label">
                          {item.price} MAD chaque
                        </span>
                        
                        <div className="tray-counter-group">
                          <button
                            onClick={() => onDecrement(index)}
                            className="tray-counter-btn"
                          >
                            -
                          </button>
                          <span className="tray-counter-val">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onIncrement(index)}
                            className="tray-counter-btn"
                          >
                            +
                          </button>
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="tray-item-remove-btn"
                            title="Retirer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer Checkout actions */}
            <div className="tray-footer">
              <div className="tray-total-row">
                <span className="tray-total-label">
                  Total estimé
                </span>
                <span className="tray-total-price">
                  {totalPrice} MAD
                </span>
              </div>

              {cartItems.length > 0 && (
                <div className="tray-disclaimer">
                  <Clock className="w-4 h-4 text-brand-600 shrink-0" />
                  <span className="tray-disclaimer-text">
                    Les commandes d'essai sont transférées directement sur notre ligne WhatsApp officielle pour validation de livraison ou emporter !
                  </span>
                </div>
              )}

              <button
                onClick={handleWhatsAppCheckout}
                disabled={cartItems.length === 0}
                className={
                  cartItems.length === 0
                    ? `tray-checkout-btn tray-checkout-disabled`
                    : `tray-checkout-btn`
                }
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>Confirmer l'Ordre sur WhatsApp</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
