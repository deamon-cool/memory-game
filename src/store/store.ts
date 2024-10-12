import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameStore {
  revealedTiles: string[];
  matchedPairs: string[];
  attempts: number;
  timer: number;
  addRevealedTile: (id: string) => void;
  clearRevealedTiles: () => void;
  addMatchedPairs: (ids: string[]) => void;
  setAttempts: () => void;
  setTimer: () => void;
  resetGame: () => void;
}

export const useGameState = create<GameStore>()((set) => ({
  revealedTiles: [],
  matchedPairs: [],
  attempts: 0,
  timer: 0,
  addRevealedTile: (id) => set((state) => ({ revealedTiles: [...state.revealedTiles, id] })),
  clearRevealedTiles: () => set(() => ({ revealedTiles: [] })),
  addMatchedPairs: (ids) => set((state) => ({ matchedPairs: [...state.matchedPairs, ...ids] })),
  setAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),
  setTimer: () => set((state) => ({ timer: state.timer + 1 })),
  resetGame: () =>
    set(() => ({
      revealed: [],
      matchedPairs: [],
      attempts: 0,
      timer: 0,
    })),
}));

interface Game {
  attempts: number;
  timeDuration: number;
  date: Date;
}

interface GameHistoryStore {
  gameHistory: Game[];
  addGameToHistory: (game: Game) => void;
}

export const useGameHistory = create<GameHistoryStore>()(
  persist(
    (set) => ({
      gameHistory: [],
      addGameToHistory: (game: Game) => set((state) => ({ gameHistory: [...state.gameHistory, game] })),
    }),
    {
      name: 'game-history',
    },
  ),
);
