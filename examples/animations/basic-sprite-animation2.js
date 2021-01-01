import { ready, on } from '../../src/dom.js';
import { createCanvas, clearCanvas, screenToCanvas } from '../../src/canvas.js';
import createSprite from '../../src/sprite.js';
import { load_image } from '../../src/loader.js';

const app = async () => {

  const { cnv, ctx } = createCanvas();
  
  ctx.imageSmoothingEnabled = false;

  document.body.appendChild(cnv);
  
  const midX = Math.round(cnv.width / 2), midY = Math.round(cnv.height / 2);

  // preload spritesheet
  
  const playerSpritesheet = await load_image('./resources/player-spritesheet.png');
  
  // create sprite object
  
  const playerSprite = createSprite(playerSpritesheet, 3, 1, 100);
  
  // sprite animations table

  const playerAnimations = {
  
    walk: { frameStart: 0, frameEnd: 2 }
  
  };

  const gameloop = () => {

    requestAnimationFrame(gameloop);

    clearCanvas(ctx);
    
    playerSprite.setAnimation(playerAnimations.walk);
    
    playerSprite.draw(ctx, midX - 64, midY - 64, 128, 128);
  
  };
  
  requestAnimationFrame(gameloop);

};

ready(app);
