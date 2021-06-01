# bottlecap.js - A Minimalist 2D Game Framework

<p align="center">
  <img src="https://bottlecap.js.org/logo.png" width="256px" alt="bottlecap.js logo">
</p>

**Boilerplate**

```javascript
import Game from './bottlecap/game.js';
import { createCanvas } from './bottlecap/canvas.js';
import Camera from './bottlecap/camera.js';

class MyGame extends Game {

  handleKeyBound = this.handleKey.bind(this)

  init() {
    
    const { cnv, ctx, clearCanvas } = createCanvas();
    
    this.cnv = cnv;
    this.ctx = ctx;
    this.clearCanvas = clearCanvas;
    
    document.body.appendChild(cnv);
    
    this.camera = new Camera(this.ctx);
    
    this.controls = {
      left: false,
      right: false
    };
    
    this.player = {
      x: 0,
      y: 0,
      speed: 50
    };
    
    on(window, 'keydown', this.handleKeyBound);
    on(window, 'keyup', this.handleKeyBound);
    
    console.log('Game Initialised');
  
  }
  
  handleKey(e) {
    const keyState = e.type === 'keydown' ? true : false;
    switch(e.key) {
      case 'ArrowLeft':
        this.controls.left = e.keyState;
        break;
      case 'ArrowRight:
        this.controls.right = e.keyState;
        break;
    }
  }
  
  update(dt) {
    
    if(this.controls.left) {
      player.x -= player.speed * dt;
    } else if(this.controls.right) {
      player.x += player.speed * dt;
    }
    
  }
  
  render() {
  
    this.clearCanvas();
    
    this.camera.attach();
    
    this.camera.lookAt(player.x, player.y);
    
    this.camera.detach();
  
  }

}

const game = new MyGame();

game.start();
```
