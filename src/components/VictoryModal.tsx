import React, { useEffect } from 'react';
import { GameScoreRecord, Language } from '../types/game';
import { soundFx } from '../services/audio';

interface Props {
  record: GameScoreRecord;
  lang: Language;
  onPlayAgain: () => void;
  onReturnTitle: () => void;
  onOpenHistory: () => void;
}

export const VictoryModal: React.FC<Props> = ({
  record,
  lang,
  onPlayAgain,
  onReturnTitle,
  onOpenHistory
}) => {
  useEffect(() => {
    soundFx.playVictory();
  }, []);

  const getGradeTitle = (grade: GameScoreRecord['grade']) => {
    switch (grade) {
      case 'S+':
        return lang === 'ar' ? 'ذاكرة فوتوغرافية خارقة!' : 'Photographic Mastermind!';
      case 'S':
        return lang === 'ar' ? 'إدراك بصري استثنائي!' : 'Exceptional Perception!';
      case 'A':
        return lang === 'ar' ? 'أداء رائع وتركيز حاد!' : 'Great Focus & Recall!';
      case 'B':
        return lang === 'ar' ? 'نتيجة جيدة جداً!' : 'Solid Performance!';
      case 'C':
        return lang === 'ar' ? 'محاولة جيدة، تدرب أكثر!' : 'Good Effort, Keep Training!';
      default:
        return lang === 'ar' ? 'اكتمل التحدي!' : 'Challenge Completed!';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center flex flex-col items-center">
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Big Ranking Grade Crest */}
        <div className="relative mb-3">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-b from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-2xl shadow-amber-500/30 flex items-center justify-center">
            <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center">
              <span className="font-mono-numbers font-black text-3xl sm:text-4xl text-amber-400">
                {record.grade}
              </span>
              <span className="text-[10px] text-amber-300/80 font-bold tracking-widest uppercase">
                {lang === 'ar' ? 'الرتبة' : 'RANK'}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-black text-slate-100">
          {getGradeTitle(record.grade)}
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {lang === 'ar' ? 'تم تسجيل هذه النتيجة بنجاح في سجلك المحلي' : 'Result successfully archived in your local vault'}
        </p>

        {/* Score Readout */}
        <div className="my-5 w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            {lang === 'ar' ? 'مجموع النقاط المحققة' : 'Final Score'}
          </div>
          <div className="text-3xl sm:text-4xl font-black font-mono-numbers text-amber-400 mt-1">
            {record.score}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
            <div>
              <div className="text-[10px] text-slate-400">{lang === 'ar' ? 'الوقت' : 'Time'}</div>
              <div className="font-mono-numbers font-bold text-slate-200 mt-0.5">{record.timeSeconds}s</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">{lang === 'ar' ? 'المحاولات' : 'Moves'}</div>
              <div className="font-mono-numbers font-bold text-slate-200 mt-0.5">{record.moves}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">{lang === 'ar' ? 'الدقة' : 'Accuracy'}</div>
              <div className="font-mono-numbers font-bold text-emerald-400 mt-0.5">{record.accuracy}%</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-2.5">
          <button
            onClick={onPlayAgain}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm tracking-wider uppercase shadow-lg shadow-amber-500/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            <span>{lang === 'ar' ? 'لعب مباراة جديدة' : 'Play Again'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onOpenHistory}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
            >
              {lang === 'ar' ? 'عرض السجل' : 'Score Vault'}
            </button>
            <button
              onClick={onReturnTitle}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
            >
              {lang === 'ar' ? 'القائمة الرئيسية' : 'Title Screen'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
