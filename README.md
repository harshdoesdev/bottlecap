# bottlecap.js - 2D Game Framework

![bottlecap.js](https://github.com/harshsinghdev/bottlecap/raw/main/banner_new.png)

### Table of Contents  
- [About](#about)  
- [Docs](#Docs)  
- [Components](#components)
- [Example](#example)
- [Installation](#installation)

### About

bottlecap is a minimalist 2d game framework written in ES6. it is a collection of tiny components (called **bottlecaps**) you can combine to create a 2d game.

### Docs

You can read the Docs at bottlecap.js's [wiki](https://github.com/harshsinghdev/bottlecap/wiki).

### Components

* canvas.js - create/initialize canvas, clearCanvas, etc.
* camera.js - a simple 2d center-fixed camera
* keyboard.js - simple keyboard input
* sprite.js - basic sprite animation
* sound.js - play sound, set volume, stop sound
* loader.js - load images, sounds, json files asynchronously
* game.js - main game class to give your game a structure, includes the game loop
* collision.js - simple aabb, circle-in-circle, point-in-circle, point-in-rect, circle-in-rect collision detection and resolve aabb collision of two hitboxes
* device.js - get device info
* dom.js - a tiny but powerful library for manipulating the dom
* math.js - basic math functions for game development, Vec2 class
* utils.js - basic utility functions
* emitter.js - simple event system

### Example

**Warning: THIS EXAMPLE IS OUTDATED** 
Try Out This [Live Demo](https://replit.com/@harshsinghdev/bottlecap-example1) on Replit.
![Demo](https://github.com/harshsinghdev/bottlecap/raw/gh-pages/images/demo-screenshot.png)

**MyGame.js**

```javascript
import Game from './bottlecap/game.js';
import Camera from './bottlecap/camera.js';
import Loader from './bottlecap/loader.js';
import Sound from './bottlecap/sound.js';
import Vec2 from './bottlecap/vec2.js';
import Collision from './bottlecap/collision.js';
import Keyboard from './bottlecap/keyboard.js';
import { createCanvas } from './bottlecap/canvas.js';
import { TWO_PI } from './bottlecap/math.js';
import { randomInt } from './bottlecap/utils.js';
import { AnimatedSprite } from './bottlecap/sprite.js';

export default class MyGame extends Game {

  init() {
  
    // create a canvas with width and height equal to window's width and height and set its background color to lightgreen
  
    this.canvas = createCanvas(window.innerWidth, window.innerHeight, 'lightgreen');

    this.ctx = this.canvas.getContext('2d');

    this.ctx.imageSmoothingEnabled = false;
    
    // append the canvas element to the document's body
  
    document.body.appendChild(this.canvas);
    
    // create a camera
    
    this.camera = new Camera(this.ctx);

    this.loader = new Loader();

    this.loader.on('load', this.onLoadingComplete.bind(this));

    this.loader.on('error', console.error);

    this.loader
      .addImage('coin', './SpinningCoin.png')
      .addImage('playerSprite', './playerSprite.png')
      .addSound('coinpickup', './coinpickup.wav')
      .load();
    
    console.log('Game Initialised');
  
  }

  onLoadingComplete(assets) {
    this.assets = assets;

    this.score = 0;
  
    const playerSprite = new AnimatedSprite(this.ctx, this.assets.image.playerSprite, 6, 1, 0, 0, 64, 64);

    playerSprite.addAnimation("default", 0, 5, 80);

    playerSprite.play("default");

    this.player = {
      speed: 100,
      sprite: playerSprite
    };

    this.coins = [];
  
    for(let i = 0; i < 20; i++) {
      const x = randomInt(100, this.canvas.width - 100);
      const y = randomInt(100, this.canvas.height - 100);

      const sprite = new AnimatedSprite(this.ctx, this.assets.image.coin, 18, 1, x, y, 16, 16);
      
      sprite.addAnimation("spin", 0, 8, 30);

      sprite.play("spin");
      
      this.coins.push({
        sprite,
        visible: true
      });
    }

  }
  
  update(dt) {
    if(this.loader.loading) {
      return;
    }

    const direction = Keyboard.getDirection(); // { x, y }
    
    this.player.sprite.position.x += direction.x * this.player.speed * dt; // move player left or right depending on direction.x's value [1, -1]
    this.player.sprite.position.y += direction.y * this.player.speed * dt; // move player up or down depending on direction.y's value [1, -1]

    if(direction.x === 1) {
      this.player.sprite.flipX = false;
    } else if(direction.x === -1) {
      this.player.sprite.flipX = true;
    }

    this.player.sprite.update(dt);

    this.coins.forEach(coin => {
      // if the coin is visible &&
      // the coin (circle) is colliding with the player (rect)
      coin.sprite.update(dt);

      if(
        coin.visible && 
        rectInRect(
          coin.sprite.position.x, 
          coin.sprite.position.y, 
          coin.sprite.width, 
          coin.sprite.height, 
          this.player.sprite.position.x, 
          this.player.sprite.position.y, 
          this.player.sprite.size.x, 
          this.player.sprite.size.y
        )
      ) {
        coin.visible = false; // set the visiblity of the coin to false
        this.score += 10; // add 10 to player's total score
        Sound.play(null, this.assets.sound.coinpickup); // play sound, use default gainNode
      }
    });
    
    this.camera.lookAt(this.player.sprite.position.x, this.player.sprite.position.y); // update camera's target location
    
    this.camera.update(dt); // update the camera
    
  }
  
  render() {
  
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if(this.loader.loading) {
      this.renderLoadingScreen();
      return;
    }
    
    this.camera.attach(); // -- camera attached
    
    // Render coins
    
    this.coins.forEach(coin => {
      // render coin only if it is visible
      if(coin.visible) {
        coin.sprite.render();
      }
    });

    this.player.sprite.render();
    
    this.camera.detach(); // -- camera detached
    
    this.ctx.fillStyle = "#000";

    this.ctx.font = "32px sans-serif";

    this.ctx.fillText(`Score: ${this.score}`, 32, 32 + 20); // display the score
  
  }

  renderLoadingScreen() {
    this.ctx.font = "32px sans-serif";
    this.ctx.fillStyle = '#000';
    const text = "Loading...";
    const textWidth = this.ctx.measureText(text).width;
    this.ctx.fillText(
      text,
      this.canvas.width / 2 - textWidth / 2, 
      this.canvas.height / 2
    );
  }

}
```

**main.js**

```javascript

import { ready } from './bottlecap/dom.js';
import MyGame from './MyGame.js';

const initGame = () => {
  const game = new MyGame(); // create an instance of the game

  game.run(); // runs the game
};

// call initGame when DOM state is ready

ready(initGame);
```

**index.html**

```html
<!Doctype html>
<html>
<head>
  <title>My Game</title>
</head>
<body>

  <script src="./main.js" type="module"></script>

</body>
</html>
```

### Installation

We have decided to use Native Javascript Module Import/Export to avoid any build steps. So you can simply clone this repo or Download the latest release from [Releases](https://github.com/harshsinghdev/bottlecap/releases).

### Games made using bottlecap
* [Hydrogen](https://hypervoid.itch.io/hydrogen)
* [Play Or Die](https://hypervoid.itch.io/play-or-die)
* [Sneaky Tails](https://hypervoid.itch.io/sneaky-tails)
* [SlideToShoot](https://hypervoid.itch.io/slide-to-shoot)
