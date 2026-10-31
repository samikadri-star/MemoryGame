import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GameMode,
  DifficultyLevel,
  ThemeId,
  CardItem,
  CardArtwork,
  GameState,
  GameScoreRecord,
  Language
} from './types/game';
import {
  DIFFICULTY_PRESETS,
  TABLE_FELT_IMAGE,
  generateGameCards
} from './data/cardThemes';
import { soundFx } from './services/audio';
import { ScoreStorageManager } from './services/storage';
import { CardView } from './components/CardView';
import { HUD } from './components/HUD';
import { TitleScreen } from './components/TitleScreen';
import { ScoreHistoryModal } from './components/ScoreHistoryModal';
import { VictoryModal } from './components/VictoryModal';
import { PauseModal } from './components/PauseModal';
import { GameCanvasParticles, ParticleTrigger } from './components/GameCanvasParticles';

export default function App() {
  // Game Configuration & State Machine
  const [gameState, setGameState] = useState<GameState>('TITLE');
  const [mode, setMode] = useState<GameMode>('PAIRS');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('MEDIUM');
  const [theme, setTheme] = useState<ThemeId>('CELESTIAL');
  const [lang, setLang] = useState<Language>('ar');
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getMuted());

  // Active Play Field State
  const [cards, setCards] = useState<CardItem[]>([]);
  const [activeArtworks, setActiveArtworks] = useState<CardArtwork[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(1);
  const [timeSeconds, setTimeSeconds] = useState<number>(0);
  const [memorizeSecondsLeft, setMemorizeSecondsLeft] = useState<number>(0);

  // Flash Recall Specific Target
  const [flashTargets, setFlashTargets] = useState<CardArtwork[]>([]);
  const [currentTarget, setCurrentTarget] = useState<CardArtwork | null>(null);

  // Modals & Triggers
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [lastVictoryRecord, setLastVictoryRecord] = useState<GameScoreRecord | null>(null);
  const [particleTrigger, setParticleTrigger] = useState<ParticleTrigger | null>(null);

  // References for Timers & Lock
  const isEvaluatingRef = useRef<boolean>(false);
  const gameTimerRef = useRef<number | null>(null);
  const memorizeTimerRef = useRef<number | null>(null);

  // Sync RTL / LTR document attributes when language changes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Clean timer utility
  const clearTimers = () => {
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
      gameTimerRef.current = null;
    }
    if (memorizeTimerRef.current) {
      clearInterval(memorizeTimerRef.current);
      memorizeTimerRef.current = null;
    }
  };

  // Compute live accuracy %
  const accuracy = moves > 0
    ? Math.max(10, Math.min(100, Math.round(((cards.filter(c => c.isMatched).length / 2) / moves) * 100)))
    : 100;

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
  };

  // Toggle Language
  const handleToggleLang = () => {
    soundFx.playClick();
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  // Start / Init a New Game
  const handleStartGame = useCallback((
    selectedMode: GameMode,
    selectedDifficulty: DifficultyLevel,
    selectedTheme: ThemeId
  ) => {
    clearTimers();
    soundFx.playClick();

    setMode(selectedMode);
    setDifficulty(selectedDifficulty);
    setTheme(selectedTheme);

    const { cards: generatedCards, artworksUsed } = generateGameCards(selectedDifficulty, selectedTheme);
    setActiveArtworks(artworksUsed);
    setMoves(0);
    setScore(0);
    setCombo(1);
    setTimeSeconds(0);
    setFlippedIndices([]);
    isEvaluatingRef.current = false;

    const config = DIFFICULTY_PRESETS[selectedDifficulty];

    if (selectedMode === 'FLASH_RECALL') {
      // In Flash Recall mode: reveal cards for memorization period
      const faceUpCards = generatedCards.map(c => ({ ...c, isFaceUp: true }));
      setCards(faceUpCards);
      setGameState('MEMORIZE');
      setMemorizeSecondsLeft(config.memorizeSeconds);

      // Prepare target sequence
      const targetsShuffled = [...artworksUsed].sort(() => Math.random() - 0.5);
      setFlashTargets(targetsShuffled);
      setCurrentTarget(targetsShuffled[0] || null);

      let timeLeft = config.memorizeSeconds;
      memorizeTimerRef.current = window.setInterval(() => {
        timeLeft -= 1;
        setMemorizeSecondsLeft(timeLeft);
        soundFx.playTick(timeLeft <= 2);

        if (timeLeft <= 0) {
          if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
          // Flip all face-down
          setCards(prev => prev.map(c => ({ ...c, isFaceUp: false })));
          setGameState('PLAYING');
          startActiveTimer();
        }
      }, 1000);
    } else {
      // Classic Pairs Mode: brief 1.5s preview or immediate play
      setCards(generatedCards);
      setGameState('PLAYING');
      startActiveTimer();
    }
  }, []);

  // Timer loop for playing state
  const startActiveTimer = () => {
    clearTimers();
    gameTimerRef.current = window.setInterval(() => {
      setTimeSeconds(prev => prev + 1);
    }, 1000);
  };

  // Card Click Interaction
  const handleCardClick = (clickedCard: CardItem, element: HTMLElement) => {
    if (gameState !== 'PLAYING' || isEvaluatingRef.current || clickedCard.isFaceUp || clickedCard.isMatched) {
      return;
    }

    soundFx.playCardFlip();
    const clickedIdx = clickedCard.gridIndex;

    // Trigger visual particle coords
    const rect = element.getBoundingClientRect();
    const burstX = rect.left + rect.width / 2;
    const burstY = rect.top + rect.height / 2;

    if (mode === 'FLASH_RECALL') {
      // Handle Flash Recall Target finding
      handleFlashRecallClick(clickedCard, clickedIdx, burstX, burstY);
    } else {
      // Handle Classic Pairs Matching
      handlePairsClick(clickedCard, clickedIdx, burstX, burstY);
    }
  };

  // Flash Recall Click Logic
  const handleFlashRecallClick = (
    card: CardItem,
    index: number,
    burstX: number,
    burstY: number
  ) => {
    setMoves(prev => prev + 1);

    // Check if this card matches current target
    if (currentTarget && card.artworkId === currentTarget.id) {
      // CORRECT MATCH!
      soundFx.playMatch(combo);
      setParticleTrigger({
        x: burstX,
        y: burstY,
        color: card.artwork.primaryColor,
        count: 32
      });

      // Mark this card and its duplicate as matched
      const newCards = cards.map(c =>
        c.artworkId === currentTarget.id ? { ...c, isFaceUp: true, isMatched: true } : c
      );
      setCards(newCards);

      const addedScore = 150 * combo + Math.max(10, 50 - timeSeconds);
      setScore(prev => prev + addedScore);
      setCombo(prev => Math.min(prev + 1, 8));

      // Advance Target
      const remainingTargets = flashTargets.filter(t => t.id !== currentTarget.id);
      setFlashTargets(remainingTargets);

      if (remainingTargets.length === 0) {
        // VICTORY!
        handleGameWon(newCards);
      } else {
        setCurrentTarget(remainingTargets[0]);
      }
    } else {
      // MISTAKE
      soundFx.playMismatch();
      setCombo(1);
      // Briefly show the wrong card then flip back
      setCards(prev => prev.map((c, i) => (i === index ? { ...c, isFaceUp: true, isWrong: true } : c)));

      isEvaluatingRef.current = true;
      setTimeout(() => {
        setCards(prev =>
          prev.map((c, i) => (i === index ? { ...c, isFaceUp: false, isWrong: false } : c))
        );
        isEvaluatingRef.current = false;
      }, 700);
    }
  };

  // Pairs Mode Click Logic
  const handlePairsClick = (
    card: CardItem,
    index: number,
    burstX: number,
    burstY: number
  ) => {
    // Flip this card
    const updatedCards = cards.map((c, i) => (i === index ? { ...c, isFaceUp: true } : c));
    setCards(updatedCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      isEvaluatingRef.current = true;

      const firstCard = updatedCards[newFlipped[0]];
      const secondCard = updatedCards[newFlipped[1]];

      if (firstCard.artworkId === secondCard.artworkId) {
        // MATCH!
        soundFx.playMatch(combo);
        setParticleTrigger({
          x: burstX,
          y: burstY,
          color: card.artwork.primaryColor,
          count: 36
        });

        const matchedCards = updatedCards.map((c, i) =>
          newFlipped.includes(i) ? { ...c, isMatched: true } : c
        );
        setCards(matchedCards);
        setFlippedIndices([]);
        isEvaluatingRef.current = false;

        const points = 100 * combo + Math.max(10, 40 - Math.floor(timeSeconds / 2));
        setScore(prev => prev + points);
        setCombo(prev => Math.min(prev + 1, 8));

        // Check victory
        if (matchedCards.every(c => c.isMatched)) {
          handleGameWon(matchedCards);
        }
      } else {
        // MISMATCH!
        soundFx.playMismatch();
        setCombo(1);

        // Shake both cards
        setCards(prev =>
          prev.map((c, i) => (newFlipped.includes(i) ? { ...c, isWrong: true } : c))
        );

        setTimeout(() => {
          setCards(prev =>
            prev.map((c, i) =>
              newFlipped.includes(i) ? { ...c, isFaceUp: false, isWrong: false } : c
            )
          );
          setFlippedIndices([]);
          isEvaluatingRef.current = false;
        }, 850);
      }
    }
  };

  // Game Victory Routine
  const handleGameWon = (finalCards: CardItem[]) => {
    clearTimers();
    setGameState('VICTORY');

    const accuracyVal = Math.max(
      15,
      Math.min(100, Math.round(((finalCards.length / 2) / Math.max(moves, 1)) * 100))
    );

    const record = ScoreStorageManager.saveScore({
      date: new Date().toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      mode,
      difficulty,
      theme,
      score: score + 200,
      moves: moves + 1,
      timeSeconds,
      accuracy: accuracyVal
    });

    setLastVictoryRecord(record);
  };

  // Pause & Resume
  const handlePause = () => {
    if (gameState === 'PLAYING') {
      soundFx.playClick();
      clearTimers();
      setGameState('PAUSED');
    }
  };

  const handleResume = () => {
    if (gameState === 'PAUSED') {
      soundFx.playClick();
      setGameState('PLAYING');
      startActiveTimer();
    }
  };

  const handleRestart = () => {
    soundFx.playClick();
    handleStartGame(mode, difficulty, theme);
  };

  const handleReturnTitle = () => {
    soundFx.playClick();
    clearTimers();
    setGameState('TITLE');
  };

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (gameState === 'PLAYING') {
          handlePause();
        } else if (gameState === 'PAUSED') {
          handleResume();
        } else if (historyOpen) {
          setHistoryOpen(false);
        }
      } else if (e.key === 'r' || e.key === 'R') {
        if (gameState === 'PLAYING' || gameState === 'PAUSED') {
          handleRestart();
        }
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (gameState === 'TITLE') {
          e.preventDefault();
          handleStartGame(mode, difficulty, theme);
        } else if (gameState === 'VICTORY') {
          e.preventDefault();
          handleStartGame(mode, difficulty, theme);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, historyOpen, mode, difficulty, theme, handleStartGame]);

  // Clean on unmount
  useEffect(() => {
    return () => clearTimers();
  }, []);

  // Grid layout class based on difficulty cols
  const getGridColsClass = () => {
    const cols = DIFFICULTY_PRESETS[difficulty].gridCols;
    if (cols === 3) return 'grid-cols-3 max-w-sm sm:max-w-md';
    if (cols === 4) return 'grid-cols-4 max-w-md sm:max-w-xl md:max-w-2xl';
    if (cols === 5) return 'grid-cols-4 sm:grid-cols-5 max-w-lg sm:max-w-2xl md:max-w-3xl';
    return 'grid-cols-4 sm:grid-cols-6 max-w-xl sm:max-w-3xl md:max-w-4xl';
  };

  return (
    <main
      className="relative w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col justify-center items-center"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.75), rgba(2, 6, 23, 0.95)), url(${TABLE_FELT_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* 60fps Ambient Stardust & Sparkle Bursts */}
      <GameCanvasParticles trigger={particleTrigger} ambient={true} />

      {/* Atmospheric Filigree Vignette */}
      <div className="absolute inset-0 pointer-events-none border-[12px] sm:border-[16px] border-amber-950/40 shadow-[inset_0_0_80px_rgba(0,0,0,0.85)] z-10" />

      {/* Screen 1: Title Screen */}
      {gameState === 'TITLE' && (
        <TitleScreen
          onStartGame={handleStartGame}
          onOpenHistory={() => setHistoryOpen(true)}
          lang={lang}
          onToggleLang={handleToggleLang}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* Screen 2: Active Playing Game Shell */}
      {(gameState === 'PLAYING' || gameState === 'MEMORIZE' || gameState === 'PAUSED' || gameState === 'VICTORY') && (
        <div className="relative w-full h-full flex flex-col justify-between items-center p-3 sm:p-6 z-20">
          {/* Perimeter Low-Occlusion HUD */}
          <HUD
            mode={mode}
            difficulty={difficulty}
            score={score}
            moves={moves}
            timeSeconds={timeSeconds}
            accuracy={accuracy}
            combo={combo}
            targetArtwork={currentTarget}
            memorizeSecondsLeft={memorizeSecondsLeft}
            isMemorizing={gameState === 'MEMORIZE'}
            isMuted={isMuted}
            lang={lang}
            onToggleMute={handleToggleMute}
            onPause={handlePause}
            onOpenHistory={() => setHistoryOpen(true)}
            onToggleLang={handleToggleLang}
          />

          {/* Active Card Table Playfield (Unobstructed >=85%) */}
          <div className="flex-1 w-full flex items-center justify-center my-auto px-2 pt-14 pb-12 sm:pt-16 sm:pb-12 max-h-[85vh]">
            <div
              className={`grid gap-2 sm:gap-3 md:gap-4 w-full place-items-center transition-all duration-300 ${getGridColsClass()}`}
            >
              {cards.map((card) => (
                <CardView
                  key={card.instanceId}
                  card={card}
                  onClick={handleCardClick}
                  disabled={gameState === 'MEMORIZE' || gameState === 'PAUSED'}
                  lang={lang}
                />
              ))}
            </div>
          </div>

          {/* Bottom Single Flat Control-Hint Line */}
          <footer className="w-full text-center pointer-events-none pb-2 z-20">
            <span className="text-[11px] sm:text-xs text-slate-400/90 font-medium tracking-wide bg-slate-950/70 px-4 py-1.5 rounded-full border border-slate-800/80 shadow-md">
              {gameState === 'MEMORIZE'
                ? lang === 'ar'
                  ? '⏳ انتبه لأماكن الصور قبل أن تُقلب!'
                  : '⏳ Memorize card positions before they flip!'
                : lang === 'ar'
                ? 'انقر لقلب البطاقة · Esc للإيقاف المؤقت · R لإعادة البدء · M للصوت'
                : 'Click to Flip · Esc Pause · R Restart · M Mute'}
            </span>
          </footer>
        </div>
      )}

      {/* Modals & Overlays */}
      <ScoreHistoryModal
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        lang={lang}
      />

      <PauseModal
        isOpen={gameState === 'PAUSED'}
        lang={lang}
        onResume={handleResume}
        onRestart={handleRestart}
        onReturnTitle={handleReturnTitle}
        onOpenHistory={() => setHistoryOpen(true)}
      />

      {gameState === 'VICTORY' && lastVictoryRecord && (
        <VictoryModal
          record={lastVictoryRecord}
          lang={lang}
          onPlayAgain={() => handleStartGame(mode, difficulty, theme)}
          onReturnTitle={handleReturnTitle}
          onOpenHistory={() => setHistoryOpen(true)}
        />
      )}
    </main>
  );
}
