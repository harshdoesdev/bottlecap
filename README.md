# bottlecap

<p align="center">

<img src="https://bottlecap.js.org/logo.png" width="256" alt="bottlecap.js logo">

</p>

bottlecap - Lightweight JavaScript Game Engine For Making Cross-Platform HyperCasual Games

**Warning: its currently under developement and in its very early stages. things may change radically as more feature gets added**

### Features

1) Image/Sound Preloader

2) Spritesheet Animations

3) Collision Detection ( Rect 2 Rect, Circle 2 Circle, Point To Circle, Point To Rectangle )

4) Utility + Tiny Math Library ( randomInt, random floats, shuffle array, etc. )

5) Device info ( isTouchscreen check ) 

6) Dom Manipulation ( select element(s), on/off event listeners, get/set attributes, dom ready check )

### Simple and Modern Syntax

**Basic structure**

```javascript
import { ready } from './bottlecap/dom.js';

const app = () => {
  
  // DOM has loaded
  // put your game logic here

};

ready(app);
```

**Loading Stuff**

Bottlecap offers several tiny functions for loading assets whom you can use together to load different types of assets for your game.
you can also use these functions to create your own custom asset loader. all of these functions (excepting createAssetMap function) return a promise.

```javascript
import { loadImage, loadSound, loadJSON, loadAll, createAssetMap } from './bottlecap/loader.js'; 

const state = {
  isLoading: false
};

let assets = null;

const onProgress = progress => {

  console.log(`${progress} loading...`);

};

const startGame = res => {

  state.isLoading = false;

  assets = createAssetMap(res);
  
  assets.image.get('spritesheet');
  
  assets.sound.get('bgm');

};

loadAll([ 
  loadImage('spritesheet', './spritesheet.png'), 
  loadSound('bgm', './bgm.mp3') 
], onProgress)

.then(startGame) // loading complete

.catch(console.error); // loading failed
```

### Experimental Stuff

1) camera.js is a simple, 2d camera based on the HTML5 Canvas
```javascript
import { createCamera } from './bottlecap/camera.js'; 

const camera = createCamera(ctx);

camera.attach();

// draw stuff here

camera.detach();
```

### Where Do I Start?

You can start by testing out the example code in the examples folder. 
I am planning to add a few tutorials but for now the comments in the code are your guide.

Here are some live examples:-

1) [Resolve Rectangle Collision](https://bottlecap.js.org/examples/collisions/resolve-rectangle-collision.html)

2) [Circle in Circle Collision Detection](https://bottlecap.js.org/examples/collisions/circle-in-circle-collision.html)

3) [Basic 2D Sprite Animation](https://bottlecap.js.org/examples/animations/basic-sprite-animation2.html)

### Community

You can post your questions/suggestions on itch.io. [Bottlecap's Community Page](https://rwbeast.itch.io/bottlecap/community)

### Games made with bottlecap:-

1) [Play or Die](https://rwbeast.itch.io/play-or-die)

2) [Sneaky Tails](https://rwbeast.itch.io/sneaky-tails)
