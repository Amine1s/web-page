import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menu';
import { MenuItem, MenuCategory } from '../types';
import { Search, Flame, Sparkles, Clock, AlertTriangle, ShieldCheck, Plus, X, Heart, Eye } from 'lucide-react';
import './MenuSection.css';

interface MenuSectionProps {
  onAddToOrder: (name: string, price: number, details?: string) => void;
}

export default function MenuSection({ onAddToOrder }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showVegetarianOnly, setShowVegetarianOnly] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Filter items based on Category, Search query, and Dietary settings
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // 2. Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTags = item.tags?.some(tag => tag.toLowerCase().includes(query)) || false;
        if (!matchesName && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      // 3. Vegetarian toggle
      if (showVegetarianOnly && !item.attributes?.vegetarian) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, showVegetarianOnly]);

  return (
    <div className="w-full flex flex-col items-center" id="menu-section">
      
      {/* Search and Quick Veg Filter layout */}
      <div className="menu-search-container">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Rechercher un plat, ingrédient (ex: couscous, gaufre...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="menu-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dietary Switch toggle */}
        <button
          onClick={() => setShowVegetarianOnly(p => !p)}
          className={`menu-veg-toggle ${
            showVegetarianOnly
              ? 'menu-veg-toggle-active'
              : 'menu-veg-toggle-inactive'
          }`}
        >
          <ShieldCheck className={`w-4 h-4 ${showVegetarianOnly ? 'text-black fill-black/10' : 'text-white/40'}`} />
          <span>Option Végétarienne</span>
        </button>
      </div>

      {/* Categories Horizontal Tabs bar */}
      <div className="menu-tabs-bar">
        <div className="menu-tabs-inner">
          {MENU_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`menu-tab-btn ${
                  isSelected
                    ? 'menu-tab-btn-active'
                    : 'menu-tab-btn-inactive'
                }`}
              >
                <span>
                  {cat.id === 'all' }
                  {cat.id === 'moroccan'}
                  {cat.id === 'pizza-pasta'}
                  {cat.id === 'burgers-tacos'}
                  {cat.id === 'breakfast-waffles'}
                  {cat.id === 'pastries-desserts'}
                  {cat.id === 'drinks'}
                </span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Items list Section */}
      {filteredItems.length === 0 ? (
        <div className="menu-empty-viewport">
          <p className="text-white/35 text-3xl">🏜️</p>
          <h4 className="font-serif text-lg font-bold text-white mt-3">Aucun régal trouvé</h4>
          <p className="text-xs text-white/50 mt-1">
            Nous n’avons pas trouvé d’article correspondant à vos critères de recherche. Essayez d’autres mots-clés ou videz les filtres !
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setShowVegetarianOnly(false);
              setSelectedCategory('all');
            }}
            className="mt-5 bg-brand-500 hover:bg-brand-600 text-black font-extrabold text-xs py-2.5 px-4 rounded-xl cursor-pointer shadow-md transition-all border border-brand-500"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="menu-items-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="menu-item-card group"
                id={`menu-item-${item.id}`}
              >
                {/* Popularity / Special badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  {item.isChefSpecial && (
                    <span className="item-badge-chef">
                      <Sparkles className="w-3 h-3 fill-white" /> Chef Spécial
                    </span>
                  )}
                  {item.isPopular && (
                    <span className="item-badge-popular">
                      <Flame className="w-3 h-3 fill-white" /> Populaire
                    </span>
                  )}
                </div>

                {/* Card Top: Premium Zooming Food Photo */}
                <div className="item-image-wrapper" onClick={() => setSelectedItem(item)}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Subtle hover shading */}
                  <div className="item-image-overlay">
                    <span className="text-white text-xs font-semibold flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-brand-500" /> Inspecter le délice
                    </span>
                  </div>
                </div>

                {/* Card Bottom: Description & Price */}
                <div className="item-details-box">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <h4 className="item-title" onClick={() => setSelectedItem(item)}>
                        {item.name}
                      </h4>
                      <span className="item-price-tag">
                        {item.price} MAD
                      </span>
                    </div>

                    <p className="text-xs text-[#F5F5F0]/60 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Metadata indicators */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.estimatedTime && (
                        <span className="item-pill-time">
                          <Clock className="w-3 h-3 text-brand-500" /> {item.estimatedTime}
                        </span>
                      )}
                      
                      {item.attributes?.vegetarian && (
                        <span className="item-pill-veg">
                          Végétarien
                        </span>
                      )}

                      {item.attributes?.containsNuts && (
                        <span className="item-pill-nuts">
                          <AlertTriangle className="w-3 h-3 text-brand-500" /> Fruits à coque
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add action button */}
                  <div className="item-action-row">
                    <button
                      onClick={() => onAddToOrder(item.name, item.price)}
                      className="item-select-btn"
                    >
                      <Plus className="w-4 h-4" /> Sélectionner
                    </button>
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="item-inspect-btn"
                      title="Inspecter"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Full Details Modal (Using AnimatePresence for slide overlays) */}
      <AnimatePresence>
        {selectedItem && (
          <div className="menu-modal-overlay">
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="menu-modal-box"
            >
              {/* Product Close image */}
              <div className="modal-image-wrapper">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Miramar Seal */}
                <div className="absolute top-4 left-4 bg-black/80 border border-white/15 text-brand-500 font-serif text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full select-none backdrop-blur-xs">
                  Ataï Miramar
                </div>
              </div>

              {/* Product Info description and orders */}
              <div className="modal-info-panel">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-serif text-xl md:text-2xl font-black text-white">{selectedItem.name}</h3>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="text-white/60 hover:text-white transition cursor-pointer p-1 rounded-full hover:bg-white/10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <span className="modal-price-badge">
                    {selectedItem.price} MAD
                  </span>

                  <p className="text-xs md:text-sm text-white/70 leading-relaxed mb-6 font-light">
                    {selectedItem.description}
                  </p>

                  <div className="space-y-3.5 mb-6">
                    <h5 className="text-[10px] font-bold text-white/40 tracking-wider uppercase">Détails de préparation</h5>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs text-white">
                      <div className="modal-detail-card">
                        <span className="text-[9px] text-white/45 block font-mono">TEMPS ESTIMÉ</span>
                        <span className="font-bold block mt-0.5">{selectedItem.estimatedTime || '5 à 10 min'}</span>
                      </div>
                      <div className="modal-detail-card">
                        <span className="text-[9px] text-white/45 block font-mono">CONVIENT À</span>
                        <span className="font-bold block mt-0.5">
                          {selectedItem.attributes?.vegetarian ? 'Végétaliens, Végétariens' : 'Plat Standard'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedItem.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {selectedItem.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold text-brand-500 bg-brand-500/10 border border-brand-500/20 px-2.5 py-0.5 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      onAddToOrder(selectedItem.name, selectedItem.price);
                      setSelectedItem(null);
                    }}
                    className="modal-primary-btn"
                  >
                    <Plus className="w-4 h-4" /> Ajouter au plateau
                  </button>
                  
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="modal-close-btn"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
