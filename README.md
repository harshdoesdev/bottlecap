# bottlecap.js - A Minimalist 2D Game Framework

```javascript
import Game from './bottlecap/game.js';
import { createCanvas } from './bottlecap/canvas.js';

class MyGame extends Game {

  init() {
    
    const { cnv, ctx, clearCanvas } = createCanvas();
    
    this.cnv = cnv;
    this.ctx = ctx;
    this.clearCanvas = clearCanvas;
    
    document.body.appendChild(cnv);
    
    console.log('Game Initialised');
  
  }
  
  update(dt) {
    
  }
  
  render() {
  
    this.clearCanvas();
  
  }

}

const game = new MyGame();

game.start();
```
