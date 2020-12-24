import { ready, on } from './bottlecap/dom.js';
import { createCanvas, clearCanvas, screenToCanvas } from './bottlecap/canvas.js';
import createSprite from './bottlecap/sprite.js';

const app = async () => {

  const { cnv, ctx } = createCanvas();

  document.body.appendChild(cnv);

  // preload spritesheet
  
  const playerSpritesheet = await load_image('./resources/images/player-spritesheet');
  
  // create sprite object
  
  const playerSprite = createSprite(playerSpritesheet, 4, 1, 160);
  
  // sprite animations table

  const playerAnimations = {
  
    idle: { frameStart: 0, frameEnd: 1 },
  
    walk: { frameStart: 2, frameEnd: 4 }
  
  };

  const gameloop = () => {

    requestAnimationFrame(gameloop);

    clearCanvas(ctx);
    
    if(player.moveLeft) {
    
      playerSprite.setAnimation(playerAnimations.walk);
    
    } else {
    
      playerSprite.setAnimation(playerAnimations.idle);
    
    }
    
    /*
    
      spriteObj.draw(
      
        context2d,
        
        destination X,
        
        destination Y,
        
        Width,
        
        Height,
        
        flip Horizontally Bool,
        
        flip Vertically Bool
      
      );
    
    */
    
    playerSprite.draw(ctx, 50, 50, 32, 32);
  
  };
  
  requestAnimationFrame(gameloop);

};

ready(app);
