import * as Bottlecap from 'https://unpkg.com/bottlecap@0.1.5';

export default class MyGame extends Bottlecap.Game {

  init() {

    // create a canvas with width and height equal to window's width and height and set its background color to lightgreen

    this.canvas = Bottlecap.createCanvas(window.innerWidth, window.innerHeight, 'lightgreen');

    this.ctx = this.canvas.getContext('2d');

    this.ctx.imageSmoothingEnabled = false;

    // append the canvas element to the document's body

    document.body.appendChild(this.canvas);

    // create a camera

    this.camera = new Bottlecap.Camera(this.ctx);

    this.loader = new Bottlecap.Loader();

    this.loader.on('load', this.onLoadingComplete.bind(this));

    this.loader.on('error', console.error);

    this.loader
      .addImage('coin', './SpinningCoin.png')
      .addImage('playerSprite', './playerSprite.png')
      .addSound('coinpickup', './coinpickup.wav')
      .load();

    console.log(this.loader.loading);

    console.log('Game Initialised');

  }

  onLoadingComplete(assets) {
    this.assets = assets;

    this.score = 0;

    const playerSprite = new Bottlecap.AnimatedSprite(this.ctx, this.assets.image.playerSprite, 6, 1, 0, 0, 64, 64);

    playerSprite.addAnimation("default", 0, 5, 80);

    playerSprite.play("default");

    this.player = {
      speed: 100,
      sprite: playerSprite
    };

    this.coins = [];

    for (let i = 0; i < 20; i++) {
      const x = Bottlecap.Util.randomInt(100, this.canvas.width - 100);
      const y = Bottlecap.Util.randomInt(100, this.canvas.height - 100);

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
    if (this.loader.loading) {
      return;
    }

    const direction = Bottlecap.Keyboard.getDirection(); // { x, y }

    this.player.sprite.position.x += direction.x * this.player.speed * dt; // move player left or right depending on direction.x's value [1, -1]
    this.player.sprite.position.y += direction.y * this.player.speed * dt; // move player up or down depending on direction.y's value [1, -1]

    if (direction.x === 1) {
      this.player.sprite.flipX = false;
    } else if (direction.x === -1) {
      this.player.sprite.flipX = true;
    }

    this.player.sprite.update(dt);

    this.coins.forEach(coin => {
      // if the coin is visible &&
      // the coin (circle) is colliding with the player (rect)
      coin.sprite.update(dt);

      if (
        coin.visible &&
        Bottlecap.Collision.rectInRect(
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
        Bottlecap.Sound.play(null, this.assets.sound.coinpickup); // play sound, use default gainNode
      }
    });

    this.camera.lookAt(this.player.sprite.position.x, this.player.sprite.position.y); // update camera's target location

    this.camera.update(dt); // update the camera

  }

  render() {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.loader.loading) {
      this.renderLoadingScreen();
      return;
    }

    this.camera.attach(); // -- camera attached

    // Render coins

    this.coins.forEach(coin => {
      // render coin only if it is visible
      if (coin.visible) {
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
