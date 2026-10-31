import React from 'react';
import { GameMode, DifficultyLevel, CardArtwork, Language } from '../types/game';

interface Props {
  mode: GameMode;
  difficulty: DifficultyLevel;
  score: number;
  moves: number;
  timeSeconds: number;
  accuracy: number;
  combo: number;
  targetArtwork?: CardArtwork | null;
  memorizeSecondsLeft?: number;
  isMemorizing: boolean;
  isMuted: boolean;
  lang: Language;
  onToggleMute: () => void;
  onPause: () => void;
  onOpenHistory: () => void;
  onToggleLang: () => void;
}

export const HUD: React.FC<Props> = ({
  mode,
  score,
  moves,
  timeSeconds,
  accuracy,
  combo,
  targetArtwork,
  memorizeSecondsLeft,
  isMemorizing,
  isMuted,
  lang,
  onToggleMute,
  onPause,
  onOpenHistory,
  onToggleLang
}) => {
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 pointer-events-none p-3 sm:p-5 flex items-start justify-between gap-4">
      {/* === Left Perimeter Cluster: Time, Moves & Accuracy === */}
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-1.5 sm:p-2 shadow-2xl shadow-black/80 text-xs sm:text-sm">
        {/* Time Display */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800">
          <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="font-mono-numbers font-bold text-slate-100 tracking-wider">
            {formatTime(timeSeconds)}
          </span>
        </div>

        {/* Moves Counter */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-slate-400 text-[11px] sm:text-xs">
            {lang === 'ar' ? 'المحاولات' : 'Moves'}:
          </span>
          <span className="font-mono-numbers font-bold text-amber-300">
            {moves}
          </span>
        </div>

        {/* Accuracy */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-slate-400 text-xs">
            {lang === 'ar' ? 'الدقة' : 'Accuracy'}:
          </span>
          <span className="font-mono-numbers font-bold text-emerald-400">
            {accuracy}%
          </span>
        </div>
      </div>

      {/* === Center Notice Cluster: Memorization Countdown OR Target Card (Flash Recall) === */}
      {isMemorizing ? (
        <div className="pointer-events-auto flex flex-col items-center bg-amber-950/90 border border-amber-500/80 rounded-2xl px-4 py-2 shadow-2xl shadow-amber-950/50 animate-pulse">
          <div className="text-[11px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            {lang === 'ar' ? 'مرحلة الحفظ والاستيعاب!' : 'Memorize Card Locations!'}
          </div>
          <div className="text-lg sm:text-2xl font-black font-mono-numbers text-amber-100">
            {memorizeSecondsLeft}s
          </div>
        </div>
      ) : mode === 'FLASH_RECALL' && targetArtwork ? (
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-slate-900/95 border border-cyan-500/60 rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 shadow-2xl shadow-cyan-950/50">
          <span className="text-xs font-semibold text-cyan-300">
            {lang === 'ar' ? 'ابحث عن مكان:' : 'Find Target:'}
          </span>
          <div className="flex items-center gap-2 bg-slate-950/80 px-2.5 py-1 rounded-xl border border-cyan-500/30">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: targetArtwork.primaryColor }} />
            <span className="font-bold text-xs sm:text-sm text-cyan-100">
              {targetArtwork.name[lang]}
            </span>
          </div>
        </div>
      ) : null}

      {/* === Right Perimeter Cluster: Score, Combo & Controls === */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-1.5 sm:p-2 shadow-2xl shadow-black/80">
        {/* Combo Multiplier */}
        {combo > 1 && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 font-bold text-xs animate-bounce">
            <span>🔥</span>
            <span className="font-mono-numbers">x{combo}</span>
          </div>
        )}

        {/* Score Readout */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-slate-400 text-[11px] sm:text-xs">
            {lang === 'ar' ? 'النقاط' : 'Score'}:
          </span>
          <span className="font-mono-numbers font-black text-amber-400 text-sm sm:text-base">
            {score}
          </span>
        </div>

        {/* Score History Button */}
        <button
          onClick={onOpenHistory}
          title={lang === 'ar' ? 'سجل النتائج' : 'Score History'}
          className="p-1.5 sm:p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-slate-700/80 hover:border-amber-400 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
        </button>

        {/* Mute Toggle */}
        <button
          onClick={onToggleMute}
          title={isMuted ? (lang === 'ar' ? 'تشغيل الصوت' : 'Unmute') : (lang === 'ar' ? 'كتم الصوت' : 'Mute')}
          className="p-1.5 sm:p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/80 hover:border-amber-400 transition-colors"
        >
          {isMuted ? (
            <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>

        {/* Language Toggle */}
        <button
          onClick={onToggleLang}
          title={lang === 'ar' ? 'تبديل للإنجليزية' : 'Switch to Arabic'}
          className="px-2 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700/80 hover:border-amber-400 transition-colors"
        >
          {lang === 'ar' ? 'EN' : 'عربي'}
        </button>

        {/* Pause Button */}
        <button
          onClick={onPause}
          title={lang === 'ar' ? 'إيقاف مؤقت (Esc)' : 'Pause (Esc)'}
          className="p-1.5 sm:p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/80 hover:border-amber-400 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        </button>
      </div>
    </header>
  );
};
