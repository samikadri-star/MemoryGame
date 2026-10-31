import React from 'react';
import { CardArtwork } from '../types/game';

interface Props {
  artwork: CardArtwork;
  className?: string;
}

export const CardSvgArtwork: React.FC<Props> = ({ artwork, className = 'w-full h-full' }) => {
  // If artwork has a direct image path from generate_image, render the image with high fidelity
  if (artwork.imageSrc) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-slate-900 ${className}`}>
        <img
          src={artwork.imageSrc}
          alt={artwork.name.en}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            boxShadow: `inset 0 0 16px ${artwork.glowColor}`
          }}
        />
      </div>
    );
  }

  // Bespoke SVG Emblems
  const renderIcon = () => {
    switch (artwork.svgIcon) {
      case 'astrolabe':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <circle cx="50" cy="50" r="42" fill="none" stroke={artwork.primaryColor} strokeWidth="2.5" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="32" fill="none" stroke={artwork.primaryColor} strokeWidth="1.5" />
            <circle cx="50" cy="50" r="22" fill="none" stroke="#E0E7FF" strokeWidth="1" />
            <path d="M50 8 L50 92 M8 50 L92 50" stroke={artwork.primaryColor} strokeWidth="1.5" strokeOpacity="0.8" />
            <polygon points="50,20 54,46 80,50 54,54 50,80 46,54 20,50 46,46" fill={artwork.primaryColor} />
            <circle cx="50" cy="50" r="5" fill="#FFF" />
          </svg>
        );

      case 'moon_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <path d="M52 14 C30 18 16 38 20 62 C24 82 44 94 66 88 C48 84 38 68 40 50 C42 32 54 20 68 18 C62 15 57 14 52 14 Z" fill={artwork.primaryColor} />
            <circle cx="70" cy="35" r="3" fill="#FFF" />
            <circle cx="76" cy="55" r="2" fill="#CBD5E1" />
            <circle cx="65" cy="72" r="2.5" fill="#FFF" />
            <circle cx="50" cy="50" r="44" fill="none" stroke={artwork.primaryColor} strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6" />
          </svg>
        );

      case 'sun_orb':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <circle cx="50" cy="50" r="22" fill={artwork.primaryColor} />
            <circle cx="50" cy="50" r="16" fill="#FFF" opacity="0.8" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="50"
                y1="18"
                x2="50"
                y2="8"
                stroke={artwork.primaryColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
          </svg>
        );

      case 'eye_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <path d="M12 50 C24 24 76 24 88 50 C76 76 24 76 12 50 Z" fill="none" stroke={artwork.primaryColor} strokeWidth="3" />
            <circle cx="50" cy="50" r="18" fill={artwork.primaryColor} fillOpacity="0.2" stroke={artwork.primaryColor} strokeWidth="2" />
            <circle cx="50" cy="50" r="8" fill={artwork.primaryColor} />
            <circle cx="53" cy="47" r="3" fill="#FFF" />
            <path d="M50 18 L50 26 M50 74 L50 82 M20 50 L28 50 M72 50 L80 50" stroke={artwork.primaryColor} strokeWidth="2" />
          </svg>
        );

      case 'crown_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <path d="M18 72 L24 35 L40 54 L50 24 L60 54 L76 35 L82 72 Z" fill={artwork.primaryColor} stroke="#FFF" strokeWidth="1.5" />
            <circle cx="24" cy="32" r="4" fill="#FFF" />
            <circle cx="50" cy="20" r="5" fill="#FDE047" />
            <circle cx="76" cy="32" r="4" fill="#FFF" />
            <rect x="20" y="74" width="60" height="6" rx="2" fill="#E11D48" />
          </svg>
        );

      case 'plasma_core':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="none" stroke={artwork.primaryColor} strokeWidth="2.5" />
            <polygon points="50,28 72,42 72,68 50,82 28,68 28,42" fill={artwork.primaryColor} fillOpacity="0.25" stroke={artwork.primaryColor} strokeWidth="1.5" />
            <circle cx="50" cy="55" r="12" fill="#FFF" />
            <circle cx="50" cy="55" r="6" fill={artwork.primaryColor} />
          </svg>
        );

      case 'scarab_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <ellipse cx="50" cy="55" rx="22" ry="26" fill={artwork.primaryColor} />
            <ellipse cx="50" cy="55" rx="8" ry="26" fill="#047857" opacity="0.7" />
            <circle cx="50" cy="26" r="11" fill="#10B981" />
            <circle cx="50" cy="14" r="6" fill="#34D399" />
            <line x1="26" y1="44" x2="10" y2="34" stroke={artwork.primaryColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="26" y1="58" x2="8" y2="60" stroke={artwork.primaryColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="26" y1="70" x2="12" y2="80" stroke={artwork.primaryColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="74" y1="44" x2="90" y2="34" stroke={artwork.primaryColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="74" y1="58" x2="92" y2="60" stroke={artwork.primaryColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="74" y1="70" x2="88" y2="80" stroke={artwork.primaryColor} strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'nexus_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <circle cx="50" cy="50" r="14" fill={artwork.primaryColor} />
            <circle cx="20" cy="25" r="8" fill={artwork.primaryColor} fillOpacity="0.7" />
            <circle cx="80" cy="25" r="8" fill={artwork.primaryColor} fillOpacity="0.7" />
            <circle cx="20" cy="75" r="8" fill={artwork.primaryColor} fillOpacity="0.7" />
            <circle cx="80" cy="75" r="8" fill={artwork.primaryColor} fillOpacity="0.7" />
            <line x1="50" y1="50" x2="20" y2="25" stroke={artwork.primaryColor} strokeWidth="2.5" />
            <line x1="50" y1="50" x2="80" y2="25" stroke={artwork.primaryColor} strokeWidth="2.5" />
            <line x1="50" y1="50" x2="20" y2="75" stroke={artwork.primaryColor} strokeWidth="2.5" />
            <line x1="50" y1="50" x2="80" y2="75" stroke={artwork.primaryColor} strokeWidth="2.5" />
            <circle cx="50" cy="50" r="4" fill="#FFF" />
          </svg>
        );

      case 'chip_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <rect x="25" y="25" width="50" height="50" rx="6" fill="#1E293B" stroke={artwork.primaryColor} strokeWidth="3" />
            <rect x="38" y="38" width="24" height="24" rx="3" fill={artwork.primaryColor} />
            {/* Pins */}
            <path d="M35 15 L35 25 M50 15 L50 25 M65 15 L65 25" stroke={artwork.primaryColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M35 75 L35 85 M50 75 L50 85 M65 75 L65 85" stroke={artwork.primaryColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M15 35 L25 35 M15 50 L25 50 M15 65 L25 65" stroke={artwork.primaryColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M75 35 L85 35 M75 50 L85 50 M75 65 L85 65" stroke={artwork.primaryColor} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'sentinel_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <polygon points="50,15 88,40 76,85 24,85 12,40" fill="none" stroke={artwork.primaryColor} strokeWidth="3" />
            <circle cx="50" cy="50" r="16" fill={artwork.primaryColor} fillOpacity="0.4" />
            <circle cx="50" cy="50" r="8" fill="#FFF" />
            <line x1="50" y1="15" x2="50" y2="34" stroke={artwork.primaryColor} strokeWidth="2" />
            <line x1="50" y1="66" x2="50" y2="85" stroke={artwork.primaryColor} strokeWidth="2" />
          </svg>
        );

      case 'owl_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <circle cx="36" cy="42" r="14" fill="#0F172A" stroke={artwork.primaryColor} strokeWidth="2" />
            <circle cx="64" cy="42" r="14" fill="#0F172A" stroke={artwork.primaryColor} strokeWidth="2" />
            <circle cx="36" cy="42" r="7" fill={artwork.primaryColor} />
            <circle cx="64" cy="42" r="7" fill={artwork.primaryColor} />
            <circle cx="34" cy="40" r="2.5" fill="#FFF" />
            <circle cx="62" cy="40" r="2.5" fill="#FFF" />
            <polygon points="50,48 45,60 55,60" fill="#F59E0B" />
            <path d="M22 28 Q35 15 48 30" fill="none" stroke={artwork.primaryColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M78 28 Q65 15 52 30" fill="none" stroke={artwork.primaryColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M28 66 C32 82 68 82 72 66" fill="none" stroke={artwork.primaryColor} strokeWidth="2" />
          </svg>
        );

      case 'fox_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <polygon points="50,78 22,30 38,34 50,46 62,34 78,30" fill={artwork.primaryColor} />
            <polygon points="26,34 36,54 44,48" fill="#FFF" opacity="0.9" />
            <polygon points="74,34 64,54 56,48" fill="#FFF" opacity="0.9" />
            <circle cx="39" cy="50" r="3.5" fill="#0F172A" />
            <circle cx="61" cy="50" r="3.5" fill="#0F172A" />
            <circle cx="50" cy="74" r="3.5" fill="#0F172A" />
          </svg>
        );

      case 'tree_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <path d="M50 18 Q30 35 34 55 Q20 62 25 76 L75 76 Q80 62 66 55 Q70 35 50 18 Z" fill={artwork.primaryColor} fillOpacity="0.3" stroke={artwork.primaryColor} strokeWidth="2.5" />
            <path d="M50 42 L50 76 M50 56 L38 48 M50 62 L62 54" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
            <circle cx="50" cy="22" r="4" fill="#FDE047" />
          </svg>
        );

      case 'stag_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <polygon points="50,75 42,48 58,48" fill={artwork.primaryColor} />
            <path d="M42 46 Q30 30 20 22 M26 28 Q24 20 28 15 M32 34 Q34 22 40 18" stroke={artwork.primaryColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M58 46 Q70 30 80 22 M74 28 Q76 20 72 15 M68 34 Q66 22 60 18" stroke={artwork.primaryColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="45" cy="54" r="2.5" fill="#FFF" />
            <circle cx="55" cy="54" r="2.5" fill="#FFF" />
          </svg>
        );

      case 'lotus_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <path d="M50 20 C42 40 42 65 50 78 C58 65 58 40 50 20 Z" fill={artwork.primaryColor} />
            <path d="M50 78 C30 70 20 50 25 35 C38 45 44 60 50 78 Z" fill={artwork.primaryColor} fillOpacity="0.7" />
            <path d="M50 78 C70 70 80 50 75 35 C62 45 56 60 50 78 Z" fill={artwork.primaryColor} fillOpacity="0.7" />
            <circle cx="50" cy="50" r="5" fill="#FDE047" />
          </svg>
        );

      case 'moth_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <ellipse cx="50" cy="55" rx="5" ry="22" fill="#0F172A" stroke={artwork.primaryColor} strokeWidth="1.5" />
            <path d="M48 40 C25 20 10 38 15 60 C26 66 40 58 48 50 Z" fill={artwork.primaryColor} fillOpacity="0.8" />
            <path d="M52 40 C75 20 90 38 85 60 C74 66 60 58 52 50 Z" fill={artwork.primaryColor} fillOpacity="0.8" />
            <circle cx="30" cy="45" r="4" fill="#FDE047" />
            <circle cx="70" cy="45" r="4" fill="#FDE047" />
            <line x1="48" y1="35" x2="38" y2="20" stroke={artwork.primaryColor} strokeWidth="1.5" />
            <line x1="52" y1="35" x2="62" y2="20" stroke={artwork.primaryColor} strokeWidth="1.5" />
          </svg>
        );

      case 'flame_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <path d="M50 15 C60 30 78 45 78 64 C78 80 65 88 50 88 C35 88 22 80 22 64 C22 45 40 30 50 15 Z" fill={artwork.primaryColor} />
            <path d="M50 38 C56 48 64 56 64 68 C64 78 57 82 50 82 C43 82 36 78 36 68 C36 56 44 48 50 38 Z" fill="#FBBF24" />
            <circle cx="50" cy="72" r="6" fill="#FFF" />
          </svg>
        );

      case 'wave_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <path d="M15 65 Q30 45 50 65 T85 65 L85 82 L15 82 Z" fill={artwork.primaryColor} fillOpacity="0.4" />
            <path d="M15 50 Q35 30 55 50 T95 50" fill="none" stroke={artwork.primaryColor} strokeWidth="4" strokeLinecap="round" />
            <path d="M10 65 Q35 48 60 65 T100 65" fill="none" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="30" r="5" fill="#FFF" />
          </svg>
        );

      case 'wind_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <path d="M15 35 H65 A12 12 0 1 0 65 20" fill="none" stroke={artwork.primaryColor} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M10 50 H75 A14 14 0 1 0 75 32" fill="none" stroke={artwork.primaryColor} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M25 65 H55 A10 10 0 1 0 55 52" fill="none" stroke="#5EEAD4" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'earth_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <polygon points="50,18 85,78 15,78" fill="none" stroke={artwork.primaryColor} strokeWidth="4" />
            <polygon points="50,38 72,74 28,74" fill={artwork.primaryColor} fillOpacity="0.3" stroke={artwork.primaryColor} strokeWidth="2" />
            <circle cx="50" cy="58" r="6" fill="#FFF" />
            <line x1="25" y1="78" x2="75" y2="78" stroke="#FDE68A" strokeWidth="3" />
          </svg>
        );

      case 'lightning_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <polygon points="56,12 24,52 48,52 38,88 76,44 52,44" fill={artwork.primaryColor} stroke="#FFF" strokeWidth="1.5" />
          </svg>
        );

      case 'void_sigil':
        return (
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <circle cx="50" cy="50" r="34" fill="none" stroke={artwork.primaryColor} strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="50" cy="50" r="20" fill="#0B0F19" stroke={artwork.primaryColor} strokeWidth="3" />
            <circle cx="50" cy="50" r="7" fill="#C084FC" />
            <circle cx="50" cy="50" r="2.5" fill="#FFF" />
            <line x1="16" y1="50" x2="30" y2="50" stroke={artwork.primaryColor} strokeWidth="2" />
            <line x1="70" y1="50" x2="84" y2="50" stroke={artwork.primaryColor} strokeWidth="2" />
          </svg>
        );

      default:
        return (
          <div className="w-12 h-12 rounded-full border-2 border-amber-400/80 flex items-center justify-center text-amber-300 font-bold text-xl">
            ✦
          </div>
        );
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center p-3 rounded-xl bg-slate-900/90 border border-slate-700/60 overflow-hidden shadow-inner ${className}`}
      style={{
        boxShadow: `inset 0 0 20px ${artwork.glowColor}, 0 4px 12px rgba(0,0,0,0.5)`
      }}
    >
      {/* Background ambient radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${artwork.primaryColor}, transparent 75%)`
        }}
      />
      {renderIcon()}
    </div>
  );
};
