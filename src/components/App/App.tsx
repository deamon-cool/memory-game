import { useCallback, useEffect, useMemo, useState } from 'react';
import { Container } from '../Container/Container';
import { Button } from '../Button/Button';
import { Select } from '../Select/Select';
import { Navbar } from '../Navbar/Navbar';

import './app.scss';
import { LEVELS } from '../../const/const';
import { Board, TileType } from '../Board/Board';
import { getRandomTiles } from '../../modules/getRandomTiles';
import { useGameHistory, useGameState } from '../../store/store';
import { TileStatus } from '../Tile/Tile';
import { Summary } from '../Summary/Summary';

// TODO
// (in the future) listing history

const SECOND_MS = 1000;
const REVEALED_TIME = 700;

export type Level = 'easy' | 'medium' | 'hard' | 'legendary';

export const App = () => {
  const [level, setLevel] = useState<Level | ''>('');
  const [play, setPlay] = useState(false);
  const [tilesState, setTilesState] = useState<TileType[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  const {
    revealedTiles,
    matchedPairs,
    attempts,
    timer,
    addRevealedTile,
    clearRevealedTiles,
    addMatchedPairs,
    setAttempts,
    setTimer,
    resetGame,
  } = useGameState((state) => state);
  const { addGameToHistory } = useGameHistory((state) => state);

  useEffect(() => {
    let intervalId = undefined;

    if (play && level) {
      setTilesState(getRandomTiles(level));

      intervalId = setInterval(() => {
        setTimer();
      }, SECOND_MS);
    } else {
      setTilesState([]);
      resetGame();
      clearInterval(intervalId);
    }

    if (gameFinished) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [play, gameFinished]);

  useEffect(() => {
    let timerId = undefined;

    if (revealedTiles.length === 2) {
      if (revealedTiles[0].split('-')[0] === revealedTiles[1].split('-')[0]) {
        addMatchedPairs(revealedTiles);
      }

      setAttempts();

      timerId = setTimeout(() => {
        clearRevealedTiles();
      }, REVEALED_TIME);
    }

    if (revealedTiles.length === 3) {
      clearTimeout(timerId);
      clearRevealedTiles();
    }

    return () => clearTimeout(timerId);
  }, [revealedTiles.length]);

  useEffect(() => {
    if (tilesState.length === matchedPairs.length && play) {
      setGameFinished(true);
      addGameToHistory({ attempts: attempts, timeDuration: timer, date: new Date() });
    }
  }, [matchedPairs.length]);

  const tiles = useMemo(() => {
    return tilesState.map((tile) => {
      let status: TileStatus = 'hidden';

      if (matchedPairs.includes(tile.id)) {
        status = 'matched';
      }

      if (revealedTiles.includes(tile.id)) {
        status = 'revealed';
      }

      return { ...tile, status };
    });
  }, [tilesState.length, level, revealedTiles.length, matchedPairs.length]);

  // used useCallback to prevent unnecessary re-renders in Board component
  const clickTileHandler = useCallback(
    (id: string) => {
      if (revealedTiles.includes(id) || matchedPairs.includes(id)) {
        return;
      }

      addRevealedTile(id);
    },
    [revealedTiles.length],
  );

  return (
    <Container>
      <Navbar />

      <div className='actions'>
        {!play && (
          <Select
            className='select-level yellow-800'
            placeholder={'SELECT LEVEL'}
            options={LEVELS}
            selectChange={(e) => setLevel(e.target.value as Level)}
            value={level}
          />
        )}
        <Button
          className='start-button yellow-800'
          clickHandler={() => {
            if (level) {
              setPlay(!play);
              setGameFinished(false);
            }
          }}>
          {play ? 'FINISH' : 'PLAY'}
        </Button>
      </div>

      {gameFinished && <Summary />}
      {play && !gameFinished && <Board tiles={tiles} clickTile={clickTileHandler} />}
    </Container>
  );
};

export default App;
