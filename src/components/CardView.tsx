import React, { useRef, useState } from 'react';
import { CardItem, Language } from '../types/game';
import { CardSvgArtwork } from './CardSvgArtwork';
import { CARD_BACK_IMAGE } from '../data/cardThemes';

interface Props {
  card: CardItem;
  onClick: (card: CardItem, element: HTMLElement) => void;
  disabled?: boolean;
  lang?: Language;
}

export const CardView: React.FC<Props> = ({ card, onClick, disabled = false, lang = 'ar' }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || card.isFaceUp || card.isMatched || disabled) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Micro tilt
    setTilt({
      x: ((y - centerY) / centerY) * -12,
      y: ((x - centerX) / centerX) * 12
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleClick = () => {
    if (disabled || card.isFaceUp || card.isMatched) return;
    if (cardRef.current) {
      onClick(card, cardRef.current);
    }
  };

  const isFlipped = card.isFaceUp || card.isMatched;

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={isFlipped || disabled ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isFlipped && !disabled) {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${card.artwork.name[lang]} - ${isFlipped ? (lang === 'ar' ? 'مكشوفة' : 'Face Up') : (lang === 'ar' ? 'مقلوبة' : 'Face Down')}`}
      className={`group relative aspect-[3/4] w-full cursor-pointer select-none perspective-1000 transition-all duration-300 focus:outline-none ${
        card.isWrong ? 'animate-shake' : ''
      } ${disabled && !isFlipped ? 'cursor-not-allowed opacity-80' : ''}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
      }}
    >
      {/* 3D Flip Container */}
      <div
        className={`relative w-full h-full duration-500 preserve-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* === Card Back (Facing Up initially) === */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden backface-hidden border transition-all duration-300 ${
            card.isHighlighted
              ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.6)]'
              : 'border-amber-500/30 group-hover:border-amber-400/80 shadow-lg shadow-black/60 group-hover:shadow-amber-500/20'
          }`}
          style={{
            backgroundColor: '#0c1222'
          }}
        >
          {/* Ornate Card Back image */}
          <img
            src={CARD_BACK_IMAGE}
            alt="Card Back"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Ambient card back overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-amber-500/10 pointer-events-none" />

          {/* Golden edge sheen */}
          <div className="absolute inset-1 rounded-xl border border-amber-400/20 pointer-events-none" />

          {/* Hover golden sigil glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-amber-400/5 pointer-events-none" />
        </div>

        {/* === Card Front (Visible when flipped / 180deg rotated) === */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden backface-hidden rotate-y-180 flex flex-col justify-between p-2 sm:p-2.5 transition-all duration-300 border ${
            card.isMatched
              ? 'bg-slate-900/95 border-emerald-400/90 shadow-[0_0_25px_rgba(52,211,153,0.5)]'
              : card.isWrong
              ? 'bg-slate-900 border-red-500/90 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
              : 'bg-slate-900/95 border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
          }`}
          style={{
            borderColor: card.isMatched ? '#34D399' : card.isWrong ? '#EF4444' : card.artwork.primaryColor
          }}
        >
          {/* Subtle background ambient tint */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${card.artwork.primaryColor}, transparent 80%)`
            }}
          />

          {/* Header indicator / Type tag */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-slate-300 z-10">
            <span
              className="flex items-center gap-1 font-mono-numbers px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700/60"
              style={{ color: card.artwork.primaryColor }}
            >
              ✦ #{card.gridIndex + 1}
            </span>
            {card.isMatched && (
              <span className="text-emerald-400 text-xs font-bold animate-pulse">✓</span>
            )}
          </div>

          {/* Main Visual Centerpiece */}
          <div className="flex-1 w-full my-1 flex items-center justify-center min-h-0 z-10">
            <CardSvgArtwork artwork={card.artwork} className="w-full h-full max-h-[80%] rounded-xl" />
          </div>

          {/* Card Label / Lore */}
          <div className="text-center z-10 px-1 py-1 rounded-lg bg-slate-950/80 border border-slate-800/80">
            <div
              className="text-xs sm:text-sm font-bold truncate tracking-wide"
              style={{ color: card.isMatched ? '#34D399' : '#F8FAFC' }}
            >
              {card.artwork.name[lang]}
            </div>
            <div className="hidden sm:block text-[9px] text-slate-400 truncate mt-0.5">
              {card.artwork.description[lang]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
