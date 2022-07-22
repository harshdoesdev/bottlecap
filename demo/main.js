import * as Bottlecap from 'https://unpkg.com/bottlecap@0.1.2';
import MyGame from './game.js';

const initGame = () => {
  const game = new MyGame(); // create an instance of the game

  game.run(); // runs the game
};

// call initGame when DOM state is ready

Bottlecap.DOM.ready(initGame);