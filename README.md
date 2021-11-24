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
import Camera from './bottlecap/camera.js';
import { createCanvas } from './bottlecap/canvas.js';
import { getDirection } from './bottlecap/keyboard.js';
import { ready } from './bottlecap/dom.js';
import { Vec2, TWO_PI } from './bottlecap/math.js';
import { circleInCircle } from './bottlecap/collision.js';

class MyGame extends Game {

  init() {
  
    const { ctx, cnv, clearCanvas } = createCanvas(window.innerWidth, window.innerHeight, 'black');
    
    Object.assign(this, { ctx, cnv, clearCanvas });
    
    this.camera = new Camera(ctx);
  
    document.body.appendChild(cnv);
    
    this.score = 0;
    
    this.player = {
      x: 0,
      y: 0,
      w: 50,
      h: 50,
      speed: 20
    };
    
    this.coins = [];
    
    for(let i = 0; i < 20; i++) {
      this.coins.push({
        pos: Vec2.create(
          randomInt(100, this.cnv.width - 100),
          randomInt(100, this.cnv.height - 100)
        ),
        radius: 10,
        visible: true
      });
    }
    
    console.log('Game Initialised');
  
  }
  
  update(dt) {
    
    const direction = getDirection();
    
    this.player.x += direction.x * this.player.speed * dt;
    this.player.y += direction.y * this.player.speed * dt;
    
    for(let i = 0; i < this.coins.length; i++) {
      const coin = this.coins[i];
      if(coin.visible && circleInRect(coin.x, coin.y, coin.radius, this.player.x, this.player.y, this.player.w, this.player.h)) {
        coin.visible = false;
        this.score += 10;
      }
    }
    
    this.camera.lookAt(this.player.x, this.player.y);
    
  }
  
  render() {
  
    this.clearCanvas();
    
    this.camera.attach();

    this.ctx.fillStyle = 'green';

    this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height);
    
    this.ctx.fillStyle = 'yellow';
    
    for(let i = 0; i < this.coins.length; i++) {
      const coin = this.coins[i];
      this.ctx.beginPath();
      this.ctx.arc(coin.x, coin.y, coin.radius, 0, TWO_PI, false);
      this.ctx.closePath();
      this.ctx.fill();
    }

    this.ctx.fillStyle = '#fff';
    
    this.ctx.fillRect(this.player.x, this.player.y, this.player.w, this.player.h);

    this.camera.detach();
    
    this.ctx.fillText(this.score, 20, 20);
  
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
