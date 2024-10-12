import { getCustomTime } from '../../modules/getCustomTime';
import { useGameState } from '../../store/store';
import { Tile, TileStatus } from '../Tile/Tile';
import './board.scss';

export type TileType = {
  id: string;
  icon: string;
  status: TileStatus;
};

interface BoardProps {
  tiles: TileType[];
  clickTile: (id: string) => void;
}

export const Board = ({ tiles, clickTile }: BoardProps) => {
  const { attempts, timer } = useGameState((state) => state);

  return (
    <div className='board'>
      <div className='tiles'>
        {tiles.map(({ id, icon, status }) => (
          <Tile key={id} icon={icon} status={status} onClick={() => clickTile(id)} />
        ))}
      </div>
      <div className='stats'>
        <div>Time: {getCustomTime(timer)}</div>
        <div>Attempts: {attempts}</div>
      </div>
    </div>
  );
};
