import { ready, on } from './bottlecap/dom.js';
import { createCanvas, clearCanvas, screenToCanvas } from './bottlecap/canvas.js';
import createSprite from './bottlecap/sprite.js';

const app = async () => {

  const { cnv, ctx } = createCanvas();

  document.body.appendChild(cnv);

  // preload spritesheet
  
  const playerSpritesheet = await load_image('./resources/images/player-spritesheet.png');
  
  // create sprite object
  
  /*
  
    createSprite(
    
      spritesheet Image,
      
      number of columns,
      
      number of rows,
      
      delay in milliseconds
    
    );
  
  */
  
  const playerSprite = createSprite(playerSpritesheet, 4, 1, 160);
  
  // sprite animations table

  const playerAnimations = {
  
    idle: { frameStart: 0, frameEnd: 1 }, // frames start from 0
  
    walk: { frameStart: 2, frameEnd: 4 }
  
  };
  
  // entities
  
  const player = { x: 0, y: 0, w: 32, h: 32, moveLeft: false };

  const gameloop = () => {

    requestAnimationFrame(gameloop);

    clearCanvas(ctx);
    
    if(player.moveLeft) {
    
      playerSprite.setAnimation(playerAnimations.walk); // change sprite animation to "walk"
    
    } else {
    
      playerSprite.setAnimation(playerAnimations.idle); // change sprite animation to "idle"
    
    }
    
    /*
    
      spriteObject.draw(
      
        context2d,
        
        destination X,
        
        destination Y,
        
        Width,
        
        Height,
        
        flip Horizontally Bool,
        
        flip Vertically Bool
      
      );
    
    */
    
    playerSprite.draw(ctx, player.x, player.y, player.w, player.h);
  
  };
  
  requestAnimationFrame(gameloop);

};

ready(app);
