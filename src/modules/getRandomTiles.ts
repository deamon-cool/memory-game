import { Level } from '../components/App/App';
import { TileType } from '../components/Board/Board';
import { ICONS } from '../const/const';

export function getRandomTiles(level: Level) {
  const amount = getTilesAmount(level);
  let icons = [...ICONS];
  let randomIcons = [];

  for (let i = 0; i < amount; i++) {
    const index = getRandomInt(icons.length);
    randomIcons.push(icons[index]);
    icons = icons.filter((icon) => icon.id !== icons[index].id);
  }

  let randomTiles: TileType[] = randomIcons
    .concat(randomIcons)
    .sort(() => 0.5 - Math.random())
    .map((icon, i) => ({ ...icon, id: `${icon.id}-${i}`, status: 'hidden' }));

  return randomTiles;
}

function getTilesAmount(level: Level) {
  switch (level) {
    case 'easy':
      return 5;
    case 'medium':
      return 10;
    case 'hard':
      return 15;
    case 'legendary':
      return 20;
  }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
