import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data/menu';
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
import './ReviewSlider.css';

export default function ReviewSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  // Autoplay reviews slider
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const val = REVIEWS[index];

  return (
    <div className="slider-container" id="reviews-carousel">
      {/* Decorative quotes background */}
      <div className="slider-watermark">
        <MessageSquareQuote className="w-24 h-24 stroke-[1px] fill-brand-500/5" />
      </div>

      <div className="slider-card">
        
        {/* Navigation Arrows */}
        <div className="slider-navigation">
          <button
            onClick={prevSlide}
            className="slider-nav-btn"
            title="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="slider-nav-btn"
            title="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Swipeable sliding review block */}
        <AnimatePresence mode="wait">
          <motion.div
            key={val.id}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 50 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="slider-review-block"
          >
            {/* User Avatar */}
            <div className="slider-avatar-wrap">
              <img
                src={val.avatar}
                alt={val.author}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Stars */}
            <div className="slider-stars-container">
              {[...Array(5)].map((_, starIdx) => (
                <Star
                  key={starIdx}
                  className={`w-4 h-4 ${
                    starIdx < val.rating ? 'fill-amber-400 text-amber-400' : 'text-white/10'
                  }`}
                />
              ))}
            </div>

            {/* Author details */}
            <h4 className="slider-author-name">{val.author}</h4>
            <div className="slider-meta-row">
              <span>{val.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="slider-tag-highlight">{val.source} Client</span>
            </div>

            {/* Review text */}
            <blockquote className="slider-quote-text">
              “ {val.text} ”
            </blockquote>
          </motion.div>
        </AnimatePresence>

        {/* Carousel indicators */}
        <div className="slider-indicators">
          {REVIEWS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => {
                setDirection(dotIdx > index ? 1 : -1);
                setIndex(dotIdx);
              }}
              className={`slider-dot ${
                dotIdx === index ? 'slider-dot-active' : 'slider-dot-inactive'
              }`}
              title={`Aller à la page ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
