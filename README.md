# bottlecap.js - A Minimalist 2D Game Framework

<p align="center"><img src="https://bottlecap.js.org/logo.png" width="256px" alt="bottlecap.js logo"></p>

bottlecap is a minimalist 2d game framework written in ES6. it is a collection of tiny components (called **bottlecaps**) you can combine to create a 2d game.

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

## Example

```javascript
import Game from './bottlecap/game.js';
import { getDirection } from './bottlecap/keyboard.js';

class MyGame extends Game {

  // add this static getter function
  // if you want to use the internal canvas and camera components
  static get config() {
    return {
      rootEl: '#app',
      canvas: {
        width: 512,
        height: 512,
        background: 'white'
      }
    };
  }

  init() {
  
    document.body.appendChild(this.cnv);
    
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
  
    this.clearCanvas();
    
    this.camera.attach();
    
    this.ctx.fillStyle = 'black';
    
    this.ctx.fillRect(this.player.x, this.player.y, this.player.w, this.player.h);
    
    this.camera.detach();
  
  }

}

const game = new MyGame();

game.run();
```

## Collision Detection
```javascript
import { pointInRect, pointInCircle, circleInCircle, rectInRect } from './bottlecap/collision.js';

// Point In Point
console.log(pointInRect(0, 0, 10, 10, 200, 200)); // false, because point is outside of the rect
console.log(pointInRect(20, 20, 10, 10, 200, 200)); // true

// Point In Circle
console.log(pointInCircle(0, 0, 100, 100, 100)); // false, because point is outside of the circle
console.log(pointInCircle(100, 100, 100, 100, 100)); // true

// Circle In Circle
console.log(circleInCircle(0, 0, 100, 200, 200, 250)); // false, because circle is outside of the circle
console.log(circleInCircle(100, 100, 100, 200, 200, 250)); // true

// rectInRect
console.log(rectInRect(0, 0, 100, 100, 200, 200, 100, 100)); // because rect is outside of the rect
console.log(rectInRect(100, 100, 100, 100, 200, 200, 100, 100)); true
```

## Loading Assets
```javascript
import { loadImage, loadSound, loadJSON } from './bottlecap/loader.js';

const assets = {
  image: [],
  sound: [],
  json: []
};

const render = () => {
  // render stuff
};

const loadAssets = async () => {
  await Promise.all([
    loadImage('bg', './bg.jpg'),
    loadImage('player', './player.png'),
    loadImage('enemy', './enemy.png'),
    loadSound('bgm', './bgm.mp3'),
    loadJSON('level1', './level1.json')
  ]).then(loadedAssets => {
    loadedAssets.forEach(({ name, value, type }) => {
      assets[type][name] = value;
    });
  });
  
  render();
};

loadAssets();
```

## Games made using bottlecap
* [Hydrogen](https://hypervoid.itch.io/hydrogen)
* [Play Or Die](https://hypervoid.itch.io/play-or-die)
* [Sneaky Tails](https://hypervoid.itch.io/sneaky-tails)
* [SlideToShoot](https://hypervoid.itch.io/slide-to-shoot)
