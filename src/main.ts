import './styles.css';
import { Game } from './game/Game';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Unable to find #app mount point.');
}

const game = new Game(app);
game.start();
