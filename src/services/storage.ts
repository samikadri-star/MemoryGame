import { GameMode, DifficultyLevel, GameScoreRecord } from '../types/game';

const STORAGE_KEY = 'memory_realm_scores_v1';

export class ScoreStorageManager {
  public static getScores(): GameScoreRecord[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as GameScoreRecord[];
    } catch {
      return [];
    }
  }

  public static saveScore(record: Omit<GameScoreRecord, 'id' | 'timestamp' | 'grade'>): GameScoreRecord {
    const scores = this.getScores();
    const grade = this.calculateGrade(record.accuracy, record.timeSeconds, record.difficulty);

    const fullRecord: GameScoreRecord = {
      ...record,
      id: 'score_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      timestamp: Date.now(),
      grade
    };

    scores.unshift(fullRecord);
    // Keep top 50 records
    const trimmed = scores.slice(0, 50);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch {
      // Storage quota or error safe handling
    }

    return fullRecord;
  }

  public static clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }

  public static getBest(mode?: GameMode, difficulty?: DifficultyLevel): GameScoreRecord | null {
    const scores = this.getScores();
    const filtered = scores.filter(s => {
      if (mode && s.mode !== mode) return false;
      if (difficulty && s.difficulty !== difficulty) return false;
      return true;
    });

    if (filtered.length === 0) return null;
    return filtered.reduce((best, curr) => (curr.score > best.score ? curr : best), filtered[0]);
  }

  public static calculateGrade(accuracy: number, timeSeconds: number, difficulty: DifficultyLevel): GameScoreRecord['grade'] {
    let baseTimeTarget = 30;
    if (difficulty === 'EASY') baseTimeTarget = 25;
    if (difficulty === 'MEDIUM') baseTimeTarget = 45;
    if (difficulty === 'HARD') baseTimeTarget = 70;
    if (difficulty === 'MASTER') baseTimeTarget = 110;

    const timeRatio = baseTimeTarget / Math.max(timeSeconds, 10);

    if (accuracy >= 90 && timeRatio >= 1.0) return 'S+';
    if (accuracy >= 80 && timeRatio >= 0.8) return 'S';
    if (accuracy >= 70) return 'A';
    if (accuracy >= 55) return 'B';
    if (accuracy >= 40) return 'C';
    return 'D';
  }
}
