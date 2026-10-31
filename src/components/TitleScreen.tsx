import React, { useState } from 'react';
import { GameMode, DifficultyLevel, ThemeId, Language } from '../types/game';
import { DIFFICULTY_PRESETS, THEMES_META, CARD_BACK_IMAGE } from '../data/cardThemes';
import { ScoreStorageManager } from '../services/storage';

interface Props {
  onStartGame: (mode: GameMode, difficulty: DifficultyLevel, theme: ThemeId) => void;
  onOpenHistory: () => void;
  lang: Language;
  onToggleLang: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const TitleScreen: React.FC<Props> = ({
  onStartGame,
  onOpenHistory,
  lang,
  onToggleLang,
  isMuted,
  onToggleMute
}) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>('PAIRS');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('MEDIUM');
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>('CELESTIAL');

  const bestScore = ScoreStorageManager.getBest(selectedMode, selectedDifficulty);

  const handleStart = () => {
    onStartGame(selectedMode, selectedDifficulty, selectedTheme);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between p-4 sm:p-8 z-20 select-none">
      {/* Top Header Controls: Language, Mute, History */}
      <div className="w-full flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleLang}
            className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700/80 hover:border-amber-400 transition-all flex items-center gap-1.5 shadow-lg"
          >
            <span>🌐</span>
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>
          <button
            onClick={onToggleMute}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-amber-400 transition-all shadow-lg"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <span className="text-red-400 text-sm">🔇</span>
            ) : (
              <span className="text-emerald-400 text-sm">🔊</span>
            )}
          </button>
        </div>

        <button
          onClick={onOpenHistory}
          className="px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-amber-300 text-xs font-bold border border-amber-500/30 hover:border-amber-400 transition-all flex items-center gap-2 shadow-lg"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
          <span>{lang === 'ar' ? 'سجل النتائج' : 'Score Vault'}</span>
        </button>
      </div>

      {/* Main Center Stage: Title Lockup & Hero Interactive Centerpiece */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full my-auto z-30">
        {/* Bespoke Inline SVG Title Lockup */}
        <div className="relative mb-3 sm:mb-6 text-center flex flex-col items-center">
          <svg
            viewBox="0 0 460 70"
            className="w-72 sm:w-96 md:w-[440px] h-auto drop-shadow-[0_4px_24px_rgba(245,158,11,0.45)]"
          >
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="70%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
            {/* Astral Sigils */}
            <path d="M30 35 L45 35 M40 28 L40 42" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <circle cx="40" cy="35" r="8" fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="2 3" />
            <path d="M430 35 L415 35 M420 28 L420 42" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <circle cx="420" cy="35" r="8" fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="2 3" />

            {/* Title Text */}
            <text
              x="230"
              y="44"
              textAnchor="middle"
              className={lang === 'ar' ? 'font-arabic' : 'font-display'}
              fontSize="34"
              fontWeight="900"
              fill="url(#goldGrad)"
              letterSpacing="3"
            >
              {lang === 'ar' ? 'ذاكــرة الصــور' : 'MEMORY REALM'}
            </text>
          </svg>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto text-balance mt-1">
            {lang === 'ar'
              ? 'تحدي استرجاع وتطابق الصور العشوائية والذاكرة المكانية'
              : 'Procedural Visual Recall & Spatial Memory Challenge'}
          </p>

          {/* Best Score Ribbon */}
          {bestScore && (
            <div className="mt-2 inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
              <span>👑</span>
              <span>{lang === 'ar' ? 'أفضل نتيجة:' : 'Best Record:'}</span>
              <span className="font-mono-numbers font-bold text-amber-200">{bestScore.score} pts</span>
              <span>({bestScore.grade})</span>
            </div>
          )}
        </div>

        {/* Configuration Hub: Mode, Difficulty, Theme */}
        <div className="w-full bg-slate-900/90 border border-amber-500/25 rounded-3xl p-4 sm:p-6 shadow-2xl shadow-black/90 space-y-4 max-w-2xl">
          {/* 1. Game Mode Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'ar' ? '١. نمط اللعب' : '1. Game Mode'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMode('PAIRS')}
                className={`p-3 rounded-2xl border text-start transition-all ${
                  selectedMode === 'PAIRS'
                    ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm flex items-center gap-2">
                  <span>🃏</span>
                  <span>{lang === 'ar' ? 'أزواج الصور المتطابقة' : 'Dual Pairs Match'}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {lang === 'ar' ? 'اقلب بطاقتين وطابق الصور المتشابهة' : 'Flip two cards to discover matching pairs'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode('FLASH_RECALL')}
                className={`p-3 rounded-2xl border text-start transition-all ${
                  selectedMode === 'FLASH_RECALL'
                    ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm flex items-center gap-2">
                  <span>⚡</span>
                  <span>{lang === 'ar' ? 'التذكر الخاطف للمواقع' : 'Flash Location Recall'}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {lang === 'ar' ? 'احفظ مواقع الصور خلال ثوانٍ ثم استرجعها' : 'Memorize card grid positions then recall targets'}
                </div>
              </button>
            </div>
          </div>

          {/* 2. Difficulty Grid Size */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'ar' ? '٢. مستوى الصعوبة وحجم الشبكة' : '2. Difficulty & Grid Size'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(DIFFICULTY_PRESETS) as DifficultyLevel[]).map((diffKey) => {
                const conf = DIFFICULTY_PRESETS[diffKey];
                const active = selectedDifficulty === diffKey;
                return (
                  <button
                    key={diffKey}
                    type="button"
                    onClick={() => setSelectedDifficulty(diffKey)}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      active
                        ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 font-semibold'
                    }`}
                  >
                    <div className="text-xs">{conf.name[lang]}</div>
                    <div className={`text-[10px] mt-0.5 ${active ? 'text-slate-900' : 'text-slate-400'}`}>
                      {conf.totalCards} {lang === 'ar' ? 'بطاقة' : 'cards'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Theme Archetype */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'ar' ? '٣. طابع الصور والرسومات' : '3. Visual Deck Theme'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(THEMES_META) as ThemeId[]).map((themeKey) => {
                const tm = THEMES_META[themeKey];
                const active = selectedTheme === themeKey;
                return (
                  <button
                    key={themeKey}
                    type="button"
                    onClick={() => setSelectedTheme(themeKey)}
                    className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                      active
                        ? 'bg-slate-800 border-amber-400 text-amber-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-sm">{tm.icon}</div>
                    <div className="text-[11px] font-bold truncate mt-0.5">{tm.name[lang]}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary CTA Start Button */}
          <div className="pt-2">
            <button
              onClick={handleStart}
              className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-base sm:text-lg tracking-wider uppercase transition-all shadow-xl shadow-amber-500/25 active:scale-[0.99] flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>{lang === 'ar' ? 'ابـدأ اللعـب الآن' : 'START CHALLENGE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Flat Control-Hint Line */}
      <div className="w-full text-center z-30 pt-3">
        <p className="text-[11px] sm:text-xs text-slate-400 tracking-wide">
          {lang === 'ar'
            ? 'النقر لقلب البطاقات · Space للبدء · Esc للإيقاف المؤقت · M للصوت'
            : 'Click / Touch to Flip · Space / Enter to Start · Esc Pause · M Mute'}
        </p>
      </div>
    </div>
  );
};
