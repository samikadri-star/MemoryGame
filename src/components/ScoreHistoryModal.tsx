import React, { useState } from 'react';
import { GameMode, GameScoreRecord, Language } from '../types/game';
import { ScoreStorageManager } from '../services/storage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ScoreHistoryModal: React.FC<Props> = ({ isOpen, onClose, lang }) => {
  const [filterMode, setFilterMode] = useState<GameMode | 'ALL'>('ALL');
  const [scores, setScores] = useState<GameScoreRecord[]>(ScoreStorageManager.getScores());
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isOpen) return null;

  const filtered = scores.filter((s) => (filterMode === 'ALL' ? true : s.mode === filterMode));

  const totalGames = scores.length;
  const bestScore = scores.reduce((max, s) => Math.max(max, s.score), 0);
  const avgAccuracy =
    totalGames > 0
      ? Math.round(scores.reduce((acc, s) => acc + s.accuracy, 0) / totalGames)
      : 0;

  const handleClear = () => {
    ScoreStorageManager.clearAll();
    setScores([]);
    setConfirmClear(false);
  };

  const getGradeColor = (grade: GameScoreRecord['grade']) => {
    switch (grade) {
      case 'S+':
      case 'S':
        return 'text-amber-400 bg-amber-400/10 border-amber-400/40';
      case 'A':
        return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/40';
      case 'B':
        return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/40';
      case 'C':
        return 'text-indigo-300 bg-indigo-400/10 border-indigo-400/40';
      default:
        return 'text-slate-400 bg-slate-400/10 border-slate-400/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              🏆
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-100">
                {lang === 'ar' ? 'سجل النتائج والإنجازات' : 'Score Vault & Achievements'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'ar'
                  ? 'سجل المباريات المحفوظ محلياً ومؤشرات دقة الذاكرة'
                  : 'Locally recorded matches and memory precision stats'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 font-medium">
              {lang === 'ar' ? 'إجمالي المباريات' : 'Total Matches'}
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono-numbers text-slate-100 mt-0.5">
              {totalGames}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 font-medium">
              {lang === 'ar' ? 'أعلى رقم قياسي' : 'Peak Score'}
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono-numbers text-amber-400 mt-0.5">
              {bestScore}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 font-medium">
              {lang === 'ar' ? 'متوسط الدقة' : 'Avg Accuracy'}
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono-numbers text-emerald-400 mt-0.5">
              {avgAccuracy}%
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterMode === 'ALL' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'ar' ? 'الكل' : 'All'}
            </button>
            <button
              onClick={() => setFilterMode('PAIRS')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterMode === 'PAIRS' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'ar' ? 'الأزواج' : 'Pairs'}
            </button>
            <button
              onClick={() => setFilterMode('FLASH_RECALL')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterMode === 'FLASH_RECALL' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'ar' ? 'التذكر الخاطف' : 'Flash'}
            </button>
          </div>

          {scores.length > 0 && (
            <div>
              {confirmClear ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-red-400">{lang === 'ar' ? 'تأكيد المسح؟' : 'Confirm?'}</span>
                  <button
                    onClick={handleClear}
                    className="px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-xs font-bold text-white"
                  >
                    {lang === 'ar' ? 'نعم' : 'Yes'}
                  </button>
                  <button
                    onClick={() => setConfirmClear(false)}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmClear(true)}
                  className="text-xs text-slate-500 hover:text-red-400 transition-colors"
                >
                  {lang === 'ar' ? 'مسح السجل' : 'Clear History'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Scores Table / List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2 min-h-48">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-500 text-sm">
              <span className="text-3xl mb-2">📜</span>
              <span>
                {lang === 'ar'
                  ? 'لا توجد مباريات مسجلة حتى الآن. العب مباراة لتسجيل نتيجتك!'
                  : 'No games recorded yet. Complete a match to set your high score!'}
              </span>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all text-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center font-black text-sm ${getGradeColor(
                      item.grade
                    )}`}
                  >
                    {item.grade}
                  </span>
                  <div>
                    <div className="font-bold text-slate-200">
                      {item.mode === 'PAIRS'
                        ? lang === 'ar'
                          ? 'أزواج الصور'
                          : 'Pairs Match'
                        : lang === 'ar'
                        ? 'التذكر الخاطف'
                        : 'Flash Recall'}
                      <span className="text-slate-400 font-normal ms-2">
                        · {item.difficulty}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {item.date}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-end">
                  <div>
                    <div className="font-mono-numbers font-black text-amber-300 text-sm">
                      {item.score} <span className="text-[10px] text-slate-400 font-normal">pts</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono-numbers">
                      {item.accuracy}% {lang === 'ar' ? 'دقة' : 'acc'} · {item.timeSeconds}s
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Close Button */}
        <div className="pt-4 border-t border-slate-800 mt-3">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all"
          >
            {lang === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
