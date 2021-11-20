# bottlecap.js - A Minimalist 2D Game Framework For Hypercasual Games

<p align="center"><img src="https://bottlecap.js.org/logo.png" width="256px" alt="bottlecap.js logo"></p>

bottlecap is a minimalist 2d game framework written in ES6. it is a collection of tiny components (called **bottlecaps**) you can combine to create a 2d game.

Components:
* canvas.js - initialize canvas, clearCanvas, etc.
* camera.js - a simple 2d center-fixed camera
* keyboard.js - simple keyboard input
* sound.js - play sound, set volume
* loader.js - load images, sounds, json files asynchronously
* game.js - main game class to give your game a structure, includes the game loop
* collision.js - simple aabb, circle-in-circle, point-in-circle, point-in-rect collision detection and resolve aabb collision of two hitboxes
* device.js - get device info
* dom.js - a tiny but powerful library for manipulating the dom
* math.js - basic math functions for game development
* utils.js - basic utility functions
* emitter.js - simple event system

## Example

```javascript
import Game from './bottlecap/game.js';
import { Camera } from './bottlecap/camera.js';
import { createCanvas } from './bottlecap/canvas.js';
import { getDirection } from './bottlecap/keyboard.js';
import { ready } from './bottlecap/dom.js';

const { ctx, cnv, clearCanvas } = createCanvas(window.innerWidth, window.innerHeight, 'black');

class MyGame extends Game {

  init() {
    
    this.camera = new Camera(ctx);
  
    document.body.appendChild(cnv);
    
    this.player = {
      x: 0,
      y: 0,
      w: 50,
      h: 50,
      speed: 20
    };
    
    console.log('Game Initialised');
  
  }
  
  update(dt) {
    
    const direction = getDirection();
    
    this.player.x += direction.x * this.player.speed * dt;
    this.player.y += direction.y * this.player.speed * dt;
    
    this.camera.lookAt(this.player.x, this.player.y);
    
  }
  
  render() {
  
    clearCanvas();
    
    this.camera.attach();

    ctx.fillStyle = 'red';

    ctx.fillRect(0, 0, 200, 200);

    ctx.fillStyle = '#fff';
    
    ctx.fillRect(this.player.x, this.player.y, this.player.w, this.player.h);

    this.camera.detach();
  
  }

}

ready(() => {
  const game = new MyGame();

  game.run();
});
```

## Games made using bottlecap
* [Hydrogen](https://hypervoid.itch.io/hydrogen)
* [Play Or Die](https://hypervoid.itch.io/play-or-die)
* [Sneaky Tails](https://hypervoid.itch.io/sneaky-tails)
* [SlideToShoot](https://hypervoid.itch.io/slide-to-shoot)
