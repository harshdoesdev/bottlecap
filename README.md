# bottlecap.js - 2D Game Framework

![bottlecap.js](https://github.com/harshsinghdev/bottlecap/raw/main/banner_new.png)

## Table of Contents
- [About](#about)
- [Installation and Setup](#installation-and-setup)
  - [NPM](#npm)
  - [CDN](#cdn)
- [Docs](#docs)
- [Example](#example)

## About

**bottlecap.js** is a lightweight 2D game framework written in ES6. It offers a set of modular components, referred to as **bottlecaps**, that can be easily combined to create engaging 2D games.

## Installation and Setup

### NPM

```shell
npm create vite@latest my-bottlecap-game -- --template vanilla # vanilla-ts for TypeScript

npm i bottlecap
```

**src/main.js:**

```javascript
import * as Bottlecap from 'bottlecap';

// your code
```

### CDN

**src/main.js:**

```javascript
import * as Bottlecap from 'https://unpkg.com/bottlecap@latest';

// your code
```

## Docs

Explore the comprehensive documentation in the [wiki](https://github.com/harshsinghdev/bottlecap/wiki) to get started with **bottlecap.js**.

## Example

Check out a live demo on [Replit](https://replit.com/@harshsinghdev/bottlecap-example1).

![Demo](https://github.com/harshsinghdev/bottlecap/raw/gh-pages/images/demo-screenshot.png)

**game.js:**
```javascript
import * as Bottlecap from 'https://unpkg.com/bottlecap@latest';

class MyGame extends Bottlecap.Game {
  constructor() {
    super();
    this.score = 0;
  }

  init() {
    this.setupCanvas();
    this.setupCamera();
    this.loaderSetup();
    console.log('Game Initialized');
  }

  setupCanvas() {
    this.canvas = Bottlecap.createCanvas(window.innerWidth, window.innerHeight, 'lightgreen');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    document.body.appendChild(this.canvas);
  }

  setupCamera() {
    this.camera = new Bottlecap.Camera(this.ctx);
  }

  loaderSetup() {
    this.loader = new Bottlecap.Loader();
    this.loader.on('load', this.onLoadingComplete.bind(this));
    this.loader.on('error', console.error);

    this.loader
      .addImage('coin', './coin.png')
      .addImage('playerSprite', './player.png')
      .addSound('coinpickup', './coin-pickup.wav')
      .load();
  }

  onLoadingComplete(assets) {
    this.assets = assets;
    this.createPlayer();
    this.createCoins();
  }

  createPlayer() {
    const playerSprite = new Bottlecap.AnimatedSprite(this.ctx, this.assets.image.playerSprite, 6, 1, 0, 0, 64, 64);
    playerSprite.addAnimation("default", 0, 5, 80);
    playerSprite.play("default");

    this.player = {
      speed: 100,
      sprite: playerSprite
    };
  }

  createCoins() {
    this.coins = [];

    for (let i = 0; i < 20; i++) {
      const x = Bottlecap.Utils.randomInt(100, this.canvas.width - 100);
      const y = Bottlecap.Utils.randomInt(100, this.canvas.height - 100);
      const sprite = new Bottlecap.AnimatedSprite(this.ctx, this.assets.image.coin, 18, 1, x, y, 16, 16);
      sprite.addAnimation("spin", 0, 8, 30);
      sprite.play("spin");

      this.coins.push({
        sprite,
        visible: true
      });
    }
  }

  update(dt) {
    if (this.loader.loading) return;

    this.updatePlayer(dt);
    this.updateCoins(dt);
    this.updateCamera(dt);
  }

  updatePlayer(dt) {
    const direction = Bottlecap.Keyboard.getDirection();
    this.player.sprite.position.x += direction.x * this.player.speed * dt;
    this.player.sprite.position.y += direction.y * this.player.speed * dt;

    this.player.sprite.flipX = direction.x === -1;
    this.player.sprite.update(dt);
  }

  updateCoins(dt) {
    this.coins.forEach(coin => {
      if (coin.visible && this.checkCoinCollision(coin)) {
        coin.visible = false;
        this.score += 10;
        Bottlecap.Sound.play(null, this.assets.sound.coinpickup);
      }
      coin.sprite.update(dt);
    });
  }

  checkCoinCollision(coin) {
    return coin.visible && Bottlecap.Collision.rectInRect(
      coin.sprite.position.x, coin.sprite.position.y, coin.sprite.size.x, coin.sprite.size.y,
      this.player.sprite.position.x, this.player.sprite.position.y, this.player.sprite.size.x, this.player.sprite.size.y
    );
  }

  updateCamera(dt) {
    this.camera.lookAt(this.player.sprite.position.x, this.player.sprite.position.y);
    this.camera.update(dt);
  }

  render() {
    this.clearCanvas();
    if (this.loader.loading) {
      this.renderLoadingScreen();
      return;
    }

    this.camera.attach();
    this.renderCoins();
    this.player.sprite.render();
    this.camera.detach();

    this.renderScore();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderCoins() {
    this.coins.forEach(coin => {
      if (coin.visible) coin.sprite.render();
    });
  }

  renderScore() {
    this.ctx.fillStyle = "#000";
    this.ctx.font = "32px sans-serif";
    this.ctx.fillText(`Score: ${this.score}`, 32, 32 + 20);
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

const initGame = () => {
  const game = new MyGame();
  game.run();
};

Bottlecap.DOM.ready(initGame);
```

**index.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Game</title>
</head>
<body>

  <script type="module" src="./game.js"></script>

</body>
</html>
```

## Games made using bottlecap

- [Hydrogen](https://hypervoid.itch.io/hydrogen)
- [Play Or Die](https://hypervoid.itch.io/play-or-die)
- [Sneaky Tails](https://hypervoid.itch.io/sneaky-tails)
- [SlideToShoot](https://hypervoid.itch.io/slide-to-shoot)

Feel inspired by these creations? Start your own journey with **bottlecap.js** and join the growing community of game developers. Share your masterpiece and let the world experience your unique vision! If you have a game developed using **bottlecap.js** that you'd like to showcase, consider adding it to the list by opening a pull request. Happy gaming!
