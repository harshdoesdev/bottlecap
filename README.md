# bottlecap.js - A Minimalist 2D Game Framework

<p align="center">
  <img src="https://bottlecap.js.org/logo.png" width="256px" alt="bottlecap.js logo">
</p>

**Boilerplate**

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
