import React from 'react';
import { Language } from '../types/game';

interface Props {
  isOpen: boolean;
  lang: Language;
  onResume: () => void;
  onRestart: () => void;
  onReturnTitle: () => void;
  onOpenHistory: () => void;
}

export const PauseModal: React.FC<Props> = ({
  isOpen,
  lang,
  onResume,
  onRestart,
  onReturnTitle,
  onOpenHistory
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-sm bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xl font-bold flex items-center justify-center mx-auto">
          ⏸
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-100">
            {lang === 'ar' ? 'اللعبة متوقفة مؤقتاً' : 'Game Paused'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'ar' ? 'اضغط Esc للمتابعة أو اختر من القائمة' : 'Press Esc to resume or choose an action'}
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={onResume}
            className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm tracking-wider uppercase transition-all shadow-md shadow-amber-400/20"
          >
            {lang === 'ar' ? 'متابعة اللعب (Esc)' : 'Resume Match (Esc)'}
          </button>

          <button
            onClick={onRestart}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
          >
            {lang === 'ar' ? 'إعادة بدء المباراة (R)' : 'Restart Match (R)'}
          </button>

          <button
            onClick={onOpenHistory}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
          >
            {lang === 'ar' ? 'سجل النتائج' : 'Score History'}
          </button>

          <button
            onClick={onReturnTitle}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-red-400 font-bold text-xs border border-slate-800 transition-colors"
          >
            {lang === 'ar' ? 'الخروج للقائمة الرئيسية' : 'Quit to Title'}
          </button>
        </div>
      </div>
    </div>
  );
};
