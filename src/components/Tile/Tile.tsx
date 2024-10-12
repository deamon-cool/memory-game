import './tile.scss';

export type TileStatus = 'hidden' | 'revealed' | 'matched';

interface TileProps {
  onClick: () => void;
  icon: string;
  status: TileStatus;
}

export const Tile = ({ icon, onClick, status }: TileProps) => {
  const l_icon = getIcon(status, icon);

  return (
    <div className={`tile ${status}`} onClick={onClick}>
      {l_icon}
    </div>
  );
};

function getIcon(status: TileStatus, icon: string) {
  switch (status) {
    case 'hidden':
      return '🧠';

    case 'revealed':
      return icon;

    case 'matched':
      return '🧠';

    default:
      return '🧠';
  }
}
