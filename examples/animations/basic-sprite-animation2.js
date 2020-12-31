import { ready, on } from '../../src/dom.js';
import { createCanvas, clearCanvas, screenToCanvas } from '../../src/canvas.js';
import createSprite from '../../src/sprite.js';

const app = async () => {

  const { cnv, ctx } = createCanvas();

  document.body.appendChild(cnv);

  // preload spritesheet
  
  const playerSpritesheet = await load_image('./resources/player-spritesheet.png');
  
  // create sprite object
  
  const playerSprite = createSprite(playerSpritesheet, 6, 1, 100);
  
  // sprite animations table

  const playerAnimations = {
  
    walk: { frameStart: 0, frameEnd: 6 }
  
  };
  
  // entities
  
  const player = { x: 0, y: 0, w: 32, h: 32 };

  const gameloop = () => {

    requestAnimationFrame(gameloop);

    clearCanvas(ctx);
    
    playerSprite.setAnimation(playerAnimations.walk);
    
    playerSprite.draw(ctx, player.x, player.y, player.w, player.h);
  
  };
  
  requestAnimationFrame(gameloop);

};

ready(app);
