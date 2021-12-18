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

Try Out This [Live Demo](https://replit.com/@harshsinghdev/bottlecap-example1) on Replit.
![Demo](https://github.com/harshsinghdev/bottlecap/raw/gh-pages/images/demo-screenshot.png)

**MyGame.js**

```javascript
import Game from './bottlecap/game.js';
import Camera from './bottlecap/camera.js';
import { createCanvas } from './bottlecap/canvas.js';
import { getDirection } from './bottlecap/keyboard.js';
import { Vec2, TWO_PI } from './bottlecap/math.js';
import { rectInRect } from './bottlecap/collision.js';
import { randomInt } from './bottlecap/utils.js';
import Loader from './bottlecap/loader.js';
import { playSound, soundMixer } from './bottlecap/sound.js';
import { AnimatedSprite } from './bottlecap/sprite.js';

export default class MyGame extends Game {

  init() {
  
    // create a canvas with width and height equal to window's width and height and set its background color to lightgreen
  
    this.cnv = createCanvas(window.innerWidth, window.innerHeight, 'lightgreen');

    this.ctx = this.cnv.getContext('2d');

    this.ctx.imageSmoothingEnabled = false;
    
    // append the canvas element to the document's body
  
    document.body.appendChild(this.cnv);
    
    // create a camera
    
    this.camera = new Camera(this.ctx);

    this.loader = new Loader();

    this.loader
      .addImage('coin', './SpinningCoin.png')
      .addImage('playerSprite', './playerSprite.png')
      .addSound('coinpickup', './coinpickup.wav')
      .load(
        this.onLoadingComplete.bind(this),
        console.error
      );
    
    console.log('Game Initialised');
  
  }

  onLoadingComplete(loadedAssets) {

    this.assets = loadedAssets;

    // -- initial game state

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
      const x = randomInt(100, this.cnv.width - 100);
      const y = randomInt(100, this.cnv.height - 100);

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
    
    if(this.loader.loading) 
      return;

    const direction = getDirection(); // { x, y }
    
    this.player.sprite.pos.x += direction.x * this.player.speed * dt; // move player left or right depending on direction.x's value [1, -1]
    this.player.sprite.pos.y += direction.y * this.player.speed * dt; // move player up or down depending on direction.y's value [1, -1]

    if(direction.x === 1)
      this.player.sprite.flipX = false;
    else if(direction.x === -1)
      this.player.sprite.flipX = true;

    this.player.sprite.update(dt);

    this.coins.forEach(coin => {
      // if the coin is visible &&
      // the coin (circle) is colliding with the player (rect)
      coin.sprite.update(dt);
      if(coin.visible && rectInRect(coin.sprite.pos.x, coin.sprite.pos.y, coin.sprite.width, coin.sprite.height, this.player.sprite.pos.x, this.player.sprite.pos.y, this.player.sprite.width, this.player.sprite.height)) {
        coin.visible = false; // set the visiblity of the coin to false
        this.score += 10; // add 10 to player's total score
        this.camera.shake(100);
        playSound(soundMixer, this.assets.sound.coinpickup);
      }
    });
    
    this.camera.lookAt(this.player.sprite.pos.x, this.player.sprite.pos.y); // update camera's target location
    
    this.camera.update(dt); // update the camera
    
  }
  
  render() {
  
    this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);

    if(this.loader.loading) {
      this.renderLoadingScreen();
      return;
    }
    
    this.camera.attach(); // -- camera attached
    
    // Render coins
    
    this.ctx.fillStyle = 'yellow';
    
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
      this.cnv.width / 2 - textWidth / 2, 
      this.cnv.height / 2
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
