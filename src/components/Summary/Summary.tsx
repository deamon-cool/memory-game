import { getCustomTime } from '../../modules/getCustomTime';
import { useGameState } from '../../store/store';
import { Header } from '../Header/Header';

import './summary.scss';

export const Summary = () => {
  const { attempts, timer } = useGameState((state) => state);

  return (
    <div>
      <Header className='yellow-800 level-header' text='YOUR SCORE' size='3x' />
      <Header className='yellow-800 level-header' text='-- Attempts --' size='1x' />
      <div className='info'>{attempts}</div>
      <Header className='yellow-800 level-header' text='-- Time --' size='1x' />
      <div className='info'>{getCustomTime(timer)}</div>
    </div>
  );
};
