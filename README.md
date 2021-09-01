# bottlecap.js - A Minimalist 2D Game Framework

<p align="center"><img src="https://bottlecap.js.org/logo.png" width="256px" alt="bottlecap.js logo"></p>

bottlecap is a minimalist 2d game framework written in ES6. it is a collection of tiny components you can combine to create a 2d game.

Components:
* canvas.js - initialize canvas, clearCanvas, etc.
* camera.js - a simple 2d center-fixed camera
* input.js - simple keyboard input
* sound.js - play sound, set volume
* loader.js - load images, sounds, json files asynchronously
* game.js - main game class to give your game a structure, includes the game loop
* collision.js - simple aabb, circle-in-circle, point-in-circle, point-in-rect collision detection and resolve aabb collision of two hitboxes
* device.js - get device info
* dom.js - a tiny but powerful library for manipulating the dom
* math.js - basic math functions for game development
* utils.js - basic utility functions
* hitbox.js - a simple hitbox class, can be attached to game object
* emitter.js - simple event system

**Example**

```javascript
import Game from './bottlecap/game.js';
import { createCanvas } from './bottlecap/canvas.js';
import Camera from './bottlecap/camera.js';
import { getDirection } from './bottlecap/input.js';

class MyGame extends Game {

  init() {
    
    const { cnv, ctx, clearCanvas } = createCanvas();
    
    this.cnv = cnv;
    this.ctx = ctx;
    this.clearCanvas = clearCanvas;
    
    document.body.appendChild(this.cnv);
    
    this.camera = new Camera(this.ctx);
    
    this.player = {
      x: 0,
      y: 0,
      speed: 50
    };
    
    console.log('Game Initialised');
  
  }
  
  update(dt) {
    
    const direction = getDirection();
    
    player.x += direction.x * player.speed * dt;
    player.y += direction.y * player.speed * dt;
    
  }
  
  render() {
  
    this.clearCanvas();
    
    this.camera.attach();
    
    this.camera.lookAt(player.x, player.y);
    
    this.camera.detach();
  
  }

}

const game = new MyGame();

game.run();
```
