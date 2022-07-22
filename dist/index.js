/** @module Game */

/**
 * Main class, representing the current Game state
 */
class Game {

    /**
     * Kickstart the game
     */
    run() {
        if(this.running) {
            return;
        }
        
        this.running = true;
        
        console.log(
            "%c%s", 
            "color: #1abc9c; font-weight: bold", 
            "Made with bottlecap.js"
        );
        
        this.init();

        this._lastStep = performance.now();
    
        const loop = () => {
            this.step();
            this._lastStep = performance.now();
            this._frameRequest = requestAnimationFrame(loop);
        };
    
        requestAnimationFrame(loop);
    }

    stop() {
        if(this._frameRequest) {
            cancelAnimationFrame(this._frameRequest);
        }

        this._frameRequest = null;
        this.running = false;
    }

    /**
     * @ignore
     * Internal function called on each frame.
     */
    step() {
        const now = performance.now();
        const dt = (now - this._lastStep) / 1000;
        this._lastStep = now;
        this.update(dt);
        this.render();
    }

    /**
     * Called at start to initialize game states.
     */
    init() {
        console.log('Game Initialized');
    }

    /**
     * Called on each frame to update game states.
     * @param {number} dt  time since last update
     */
    update(dt) {}

    /**
     * Called on each frame to render the game.
     */
    render() {}

}

/** @module GameMath */

// Math constants

const PI$1 = Math.PI;

const TWO_PI = PI$1 * 2;

const HALF_PI = PI$1 / 2;

// measures distance between two points

/**
 * Euclidean distance
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
const pointDistance = (x1, y1, x2, y2) => {

  const dx = x1 - x2,

        dy = y1 - y2;

  return Math.sqrt(dx * dx + dy * dy);

};

// converts point to angle

/**
 * Angle from the (1, 0) direction in radians
 * @param {number} x
 * @param {number} z
 */
const pointToAngle = (x, y) => -Math.atan2(-y, x);

/**
 * clamp num between min and max
 */
const clamp = (num, min, max) => Math.max(min, Math.min(num, max));

var math = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PI: PI$1,
    TWO_PI: TWO_PI,
    HALF_PI: HALF_PI,
    pointDistance: pointDistance,
    pointToAngle: pointToAngle,
    clamp: clamp
});

/** @module Vec2 */

/**
 * Vec2 - Create Vector and Perform Basic Vector Math
 */
class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    static zero() {
        return new Vec2();
    }

    static create(x, y) {
        return new Vec2(x, y);
    }

    static clone({ x, y }) {
        return Vec2.create(x, y);
    }

    static copy(v, v2) {
        return Object.assign(v, v2);
    }

    static set(v, x, y) {
        v.x = x != null ? x : v.x;
        v.y = y != null ? y : v.y;
    
        return v;    
    }

    static add(v, { x, y }) {
        v.x += x;
        v.y += y;

        return v;
    }

    static sub(v, { x, y }) {
        v.x -= x;
        v.y -= y;

        return v;
    }

    static mul(v, { x, y }) {
        v.x *= x;
        v.y *= y;

        return v;
    }

    static div(v, { x, y }) {
        v.x /= x;
        v.y /= y;

        return v;
    }

    static addScalar(v, s) {
        v.x += s;
        v.y += s;

        return v;
    }

    static subScalar(v, s) {
        v.x -= s;
        v.y -= s;
    
        return v;    
    }

    static mulScalar(v, s) {
        v.x *= s;
        v.y *= s;
    
        return v;
    }

    static divScalar(v, s) {
        v.x /= s;
        v.y /= s;
    
        return v;    
    }

    static angle(v) {
        return Math.atan2(-v.y, -v.x) + PI;
    }

    static calcLength(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    static equals(v, v2) {
        return ((v.x === v2.x) && (v.y === v2.y));
    }

    static dot(v, v2) { 
        return v.x * v2.x + v.y * v2.y;
    }

    static cross(v, v2) {
        return v.x * v2.y - v.y * v2.x;
    }

    static lerp(v, { x, y }, alpha) {
        v.x += (x - v.x) * alpha;
        v.y += (y - v.y) * alpha;

        return v;
    }

    static normalize(v) {
        Vec2.divScalar(v, Vec2.calcLength(v) || 1);

        return v;
    }

    static distance(v, v2) {
        return pointDistance(v.x, v.y, v2.x, v2.y);
    }
}

/** @module Camera */

const round = Math.round;

/**
 * Camera - Basic PointLocked Camera
 */
class Camera {

  /**
   * @param {CanvasRenderingContext2D} ctx - current canvas context
   * @param {number} x - initial point to look at (x)
   * @param {number} y - initial point to look at (y)
   * @param {number} dx - offset from screen center (x)
   * @param {number} dy - offset from screen center (y)
   */
  constructor(ctx, x = 0, y = 0, dx = 0, dy = 0) {
  
    this.ctx = ctx;

    this.pos = Vec2.create(x, y);

    this.target = Vec2.zero();
    
    this.cx = round(ctx.canvas.width / 2) - dx;
    this.cy = round(ctx.canvas.height / 2) - dy;
  
  }


  /**
   * Start rendering through this camera
   */
  attach() {
    
    this.ctx.save();
   
    this.ctx.translate(this.pos.x, this.pos.y);
  
  }

  /**
   * Stop rendering through this camera
   */
  detach() {
    
    this.ctx.restore();
  
  }

  /**
   * update the camera
   * @param {*} dt 
   */
  update(dt) {
    Vec2.set(this.pos, this.cx - this.target.x, this.cy - this.target.y);
  }

  /**
   * Move the focus point of the camera
   * @param {number} x - where to look
   * @param {number} y - where to look
   */
  lookAt(x, y) {
    Vec2.set(this.target, x, y);
  }

}

/** @module Emitter */

class Emitter {

    constructor() {
        this.topics = {};
    }

    emit(id, ...data) {
        const listeners = this.topics[id];
        
        if(!listeners || listeners.size < 0) {
            return;
        }

        listeners.forEach(listener => listener(...data));
    }

    hasTopic(id) {
        return Reflect.has(this.topics, id);
    }

    on(id, listener) {
        if(!this.hasTopic(id)) {
            this.topics[id] = new Set();
        }

        this.topics[id].add(listener);

        return () => this.off(id, listener);
    }

    once(id, listener) {
        const proxy = (...data) => {
            this.off(id, proxy);

            listener(...data);
        };

        return this.on(id, proxy);
    }

    off(id, listener) {
        if(this.hasTopic(id)) {
            this.topics[id].delete(listener);
        }
    }
    
    destroy() {
        this.topics = {};
    }

}

/** @module DOM */

/* Tejas | Tejas Contributors | MIT License */

const doc = document;
const selectorRegex = /([.#])/;
const ns = 'http://www.w3.org/2000/svg';

const parseSelector = selector => {
  const tokens = selector.split(selectorRegex);
  let id = '', className = '';

  for (let i = 1; i < tokens.length; i += 2) {
    switch (tokens[i]) {
      case '.':
        className += ` ${tokens[i + 1]}`;
        break;
      case '#':
        id = tokens[i + 1];
    }
  }

  return {
    tag: tokens[0] || 'div',
    className: className.trim(),
    id
  };
};

const el = selector => {
  const { tag, id, className } = parseSelector(selector);
  const element = doc.createElement(tag);

  if (id) 
    element.id = id;

  if (className) 
    element.className = className;

  return element;
};

const svg = selector => {
  const { tag, id, className } = parseSelector(selector);
  const element = doc.createElementNS(ns, tag);

  if (id)
    element.id = id;

  if (className)
    attr(element, 'class', className);

  return element;
};

const frag = () => doc.createDocumentFragment();

const text = (data = '') => doc.createTextNode(data);

const qs = (selectors, ctx = doc) => ctx.querySelector(selectors);

const qsa = (selectors, ctx = doc) => ctx.querySelectorAll(selectors);

const setStyle = (element, styleObj) => Object.assign(element.style, styleObj);

const attr = (element, attributeName, value) => {
  if (value === undefined)
    return element.getAttribute(attributeName);
  
  if (value === false) {
    element.removeAttribute(attributeName);
  } else {
    element.setAttribute(attributeName, value);
  }
};

const on = (element, type, handler) => element.addEventListener(type, handler, false);

const off = (element, type, handler) => element.removeEventListener(type, handler, false);

const ready = app => {
  if (/complete|loaded|interactive/.test(doc.readyState) && doc.body) {
    setTimeout(app, 1);
  } else {
    on(doc, 'DOMContentLoaded', app);
  }
};

var dom = /*#__PURE__*/Object.freeze({
    __proto__: null,
    el: el,
    svg: svg,
    frag: frag,
    text: text,
    qs: qs,
    qsa: qsa,
    setStyle: setStyle,
    attr: attr,
    on: on,
    off: off,
    ready: ready
});

/** @module Keyboard */

/**
 * @typedef {{x: number, y: number}} direction
 */

const DIRECTION = Vec2.zero();

const KEYSTATE = {};

class Keyboard {

  /**
   * check if a key is down
   * @param {string} key
   */
  static keyDown(key) {
    return !!KEYSTATE[key];
  }

  /** 
   * get direction for movement of player
   * @return {direction}
   * @example
   * update(dt) {
   *    const direction = Keyboard.getDirection();
   *    player.x += direction.x * player.speed;
   *    player.y += direction.y * player.speed;
   * }
   */
  static getDirection() {
    const keyDown = Keyboard.keyDown, KEYS = Keyboard.KEYS;
    
    const x = keyDown(KEYS.LEFT) ? -1 : keyDown(KEYS.RIGHT) ? 1 : 0;
    const y = keyDown(KEYS.UP) ? -1 : keyDown(KEYS.DOWN) ? 1 : 0;

    Vec2.set(DIRECTION, x, y);
    
    return DIRECTION;
  }

  static KEYS = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    SPACEBAR: ' ',
    ESCAPE: 'Escape',
    ENTER: 'Enter',
    CTRL: 'Control',
    TAB: 'Tab',
    ALT: 'Alt',
    W: 'w',
    A: 'a',
    S: 's',
    D: 'd',
    E: 'e',
    X: 'x',
    Z: 'z'
  }

}

const handleKeyDown = e => {
  if(e.defaultPrevented) {
    return;
  }
  
  KEYSTATE[e.key] = true;
  
  e.preventDefault();
};

const handleKeyUp = e => {
  return KEYSTATE[e.key] = false;
};

on(window, 'keydown', handleKeyDown);
on(window, 'keyup', handleKeyUp);

/** @module Device */

/**
 * Basic Device Info
 */
class Device {
    
    /**
     * @return {boolean} true if the device have touch screen capabilities
     */
    static isTouchscreen() {
        return !!('ontouchstart' in document.documentElement);
    }

    /**
     * @return {boolean} true if the browser supports gamepads
     */
    static gamepadAvailable() {
        return !!(navigator && navigator.getGamepads);
    }

}

/** @module Collision */

const abs = Math.abs;

const COLLISION_SIDE = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right'
};

/**
 * Collision - Basic Collision Handling
 */
class Collision {

  /**
   * circle in circle collision detection
   * @param {number} x1 - center of first circle
   * @param {number} y1 - center of first circle
   * @param {number} r1 - radius of first circle
   * @param {number} x2 - center of second circle
   * @param {number} y2 - center of second circle
   * @param {number} r2 - radius of second circle
   * @return {boolean} true if circles are overlapping
   */
  static circleInCircle(x1, y1, r1, x2, y2, r2) {
    return pointDistance( x1, y1, x2, y2 ) <= r1 + r2;
  }

  /**
   * point in circle collision check
   * @param {number} px - point
   * @param {number} py - point
   * @param {number} cx - center of circle
   * @param {number} cy - center of circle
   * @param {number} cr - radius of circle
   * @return {boolean} true if point is inside circle
   */
  static pointInCircle(px, py, cx, cy, cr) {
    return pointDistance( px, py, cx, cy ) <= cr;
  }

  /**
   * checks if a point is in a rectangle
   * AABB rectangle in rectangle collision detection
   * @param {number} x1 - left side of first rectangle
   * @param {number} y1 - top side of first rectangle
   * @param {number} w1 - width of first rectangle
   * @param {number} h1 - height of first rectangle
   * @param {number} x2 - left side of second rectangle
   * @param {number} y2 - top side of second rectangle
   * @param {number} w2 - width of second rectangle
   * @param {number} h2 - height of second rectangle
   */
  static rectInRect(x1, y1, w1, h1, x2, y2, w2, h2) {
    if( x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2 ) {
      return true;
    }
  
    return false;
  }

  /**
   * point in rectangle check detection
   * @param {number} px - point
   * @param {number} py - point
   * @param {number} rx - left side of rectangle
   * @param {number} ry - top side of rectangle
   * @param {number} rw - width of rectangle
   * @param {number} rh - height of rectangle
   */
  static pointInRect(px, py, rx, ry, rw, rh) {
    if(rx <= px && px <= rx + rw && ry <= py && py <= ry + rh) {
      return true;
    }
    
    return false;
  }

  /**
   * Circle in Rectangle collision detection
   * @param {number} cx center of circle
   * @param {number} cy center of circle
   * @param {number} r radius of the circle
   * @param {number} rx left side of rectangle
   * @param {number} ry top side of rectangle
   * @param {number} w width of rectangle
   * @param {number} h height of rectangle
   * @returns {boolean}
   */
  static circleInRect(cx, cy, r, rx, ry, w, h) {
    const halfWidth = w / 2;
    const halfHeight = h / 2;

    const distX = abs(cx - rx - halfWidth);
    const distY = abs(cy - ry - halfHeight);
    
    if (distX > (halfWidth + r)) { return false; }
    if (distY > (halfHeight + r)) { return false; }
    
    if (distX <= halfWidth) { return true; } 
    if (distY <= halfHeight) { return true; }
    
    const dx = distX - halfWidth;
    const dy = distY - halfHeight;

    return (dx * dx + dy * dy <= (r * r));
  }

  /**
   * Resolve Collision Between Two Rects
   * @typedef {postition: Vec2, size: Vec2} Rect
   * @param {Rect} A 
   * @param {Rect} B 
   * @returns 
   */
  static resolveCollision(A, B) {
    const vX = (A.position.x + (A.size.x / 2)) - (B.position.x + (B.size.x / 2));        
    const vY = (A.position.y + (A.size.y / 2)) - (B.position.y + (B.size.y / 2));
    const ww2 = (A.size.x / 2) + (B.size.x / 2);
    const hh2 = (A.size.y / 2) + (B.size.y / 2);

    let colDir = '';

    if(abs(vX) < ww2 && abs(vY) < hh2) {
      const oX = ww2 - abs(vX), oY = hh2 - abs(vY);

      if(oX >= oY) {
        if(vY > 0) {
          colDir = COLLISION_SIDE.TOP;
          
          A.position.y += oY;
        } else {
          colDir = COLLISION_SIDE.BOTTOM;
          
          A.position.y -= oY;
        }
      } else {
        if(vX > 0) {
          colDir = COLLISION_SIDE.LEFT;
          
          A.position.x += oX;
        } else {
          colDir = COLLISION_SIDE.RIGHT;
          
          A.position.x -= oX;
        }
      }
    }

    return colDir;
  }

}

/** @module Sound */

/**
 * WebAudio context
 */
let _audioCtx = null;

const getAudioCtx = () => {
  if(!_audioCtx) {
    _audioCtx = new AudioContext();
  }

  return _audioCtx;
};

/**
 * output mixer
 */
let _soundMixer = null;

const getSoundMixer = () => {
  if(!_soundMixer) {
    const audioCtx = getAudioCtx();

    _soundMixer = audioCtx.createGain();

    _soundMixer.connect(audioCtx.destination);
  }

  return _soundMixer;
};

/**
 * Sound Player
 */
class Sound {

  /**
   * play sound
   * @param {GainNode} gainNode - output mixer
   * @param {AudioBuffer} audioBuffer - sound data
   * @param {number} time - length to play, or 0 to play to the end
   * @param {boolean} loop - play the sound in loop if true
   * @example
   * import Sound from './sound.js';
   * Sound.play(soundMixer, jumpSound);
   */
  static play(gainNode, audioBuffer, time = 0, loop = false) {
    const audioCtx = getAudioCtx();

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(gainNode || getSoundMixer());
    source.loop = loop;
    source.start(time);

    return source;
  }

  static stop(source, time = 0) {
    source.stop(time);
  }

  /**
   * set the output volume
   * @param {GainNode} gainNode - output mixer
   * @param {number} v - volume
   * @example
   * setVolume(soundMixer, .5);
   */
  static setVolume(gainNode, v) {
    (gainNode || getSoundMixer()).gain.value = v;
  }

}

// hack to resume the audio ctx

const resumeAudioCtx = () => {
  const audioCtx = getAudioCtx();
  
  if(/interrupted|suspended/.test(audioCtx.state)) {
    audioCtx.resume();
  }

  off(window, 'click', resumeAudioCtx);
};

on(window, 'click', resumeAudioCtx);

/** @module Loader */

const ASSET_TYPES = {
    IMAGE: 'image',
    SOUND: 'sound',
    JSON: 'json'
};

/**
 * Asset Reducer
 */
const reduceAssets = (assets, { name, type, value }) => {
    if(!assets[type]) {
        assets[type] = {};
    }
    
    assets[type][name] = value;
    
    return assets;
};

/**
 * Resource Loader
 */
class ResourceLoader {

    /**
     * Asynchronously load an image from URL
     * @param {string} name - ressource id
     * @param {string} src - ressource URL
     */
    static Image(name, src) {
        return new Promise((resolve, reject) => {

            const img = new Image();
    
            img.crossOrigin = 'Anonymous';
    
            img.onload = () => resolve({ type: ASSET_TYPES.IMAGE, name, value: img });
    
            img.onerror = () => reject(new Error(`Couldn't load Image: ${src}`));
    
            img.src = src;
    
        });
    }

    /**
     * Asynchronously load a sound file from URL
     * @param {string} name - ressource id
     * @param {string} src - ressource URL
     */
    static async Sound(name, src) {
        const audioCtx = getAudioCtx();

        const res = await fetch(src);

        if (!res.ok) {
            throw new Error(`Couldn't Load Sound: ${src}`);
        }

        const arrayBuffer = await res.arrayBuffer();

        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

        return { type: ASSET_TYPES.SOUND, name, value: audioBuffer };
    }

    /**
     * Asynchronously load a sound file from URL
     * @param {string} name - ressource id
     * @param {string} src - ressource URL
     */
    static async JSON(name, src) {
        const res = await fetch(src);

        if (!res.ok) {
            throw new Error(`Couldn't load the JSON file: ${src}`);
        }

        const json = await res.json();

        return { type: ASSET_TYPES.JSON, name, value: json };
    }

    /**
     * Load Multiple Assets at Once
     * @param {array} - Array of load Promises
     * @return {object} - Loaded assets are mapped to this object categorically
     */
    static async loadAll(loadPromises) {
        const loadedAssets = await Promise.all(loadPromises);
    
        const reducedAssets = loadedAssets.reduce(reduceAssets, {});
        
        return reducedAssets;
    }

}

const createLoadPromise = ({ name, type, src }) => {
    switch(type) {
        case ASSET_TYPES.IMAGE:
            return ResourceLoader.Image(name, src);
        case ASSET_TYPES.SOUND:
            return ResourceLoader.Sound(name, src);
        case ASSET_TYPES.JSON:
            return ResourceLoader.JSON(name, src);
        default:
            throw new Error(`Unknown Asset Type: "${type}"`);
    }
};

/**
 * A Basic Asset Loader
 */
class Loader extends Emitter {

    constructor() {
        super();
        this.queue = [];
        this.loading = false;
    }

    /**
     * enqueue an asset
     * @param {string} name - name of asset
     * @param {string} src - src of asset
     * @param {string} type - type of asset
     */
    enqueue(name, src, type) {
        if(this.loading) {
            throw new Error(`Can't Enqueue Assets While The Loader is Loading.`);
        }

        this.queue.push({ name, type, src });
    }

    /**
     * add image to the queue
     * @param {string} name - name of image
     * @param {string} src - source of image
     */
    addImage(name, src) {
        this.enqueue(name, src, ASSET_TYPES.IMAGE);

        return this;
    }

    /**
     * add sound to queue
     * @param {string} name - name of sound
     * @param {string} src - source of sound
     */
    addSound(name, src) {
        this.enqueue(name, src, ASSET_TYPES.SOUND);

        return this;
    }

    /**
     * add json file to queue
     * @param {string} name - name of json file
     * @param {string} src - source of json file
     */
    addJSON(name, src) {
        this.enqueue(name, src, ASSET_TYPES.JSON);

        return this;
    }

    /**
     * clears the queue
     */
    clearQueue() {
        while(this.queue.length) {
            this.queue.pop();
        }
    }

    /**
     * reset the loader
     */
    reset() {
        this.clearQueue();
        this.loading = false;
    }

    /**
     * Start Loading
     */
    async load() {
        if(this.loading) {
            console.error('Loader is already loading.');

            return;
        }

        this.loading = true;

        const loadPromises = this.queue.map(createLoadPromise);

        try {
            const assets = await ResourceLoader.loadAll(loadPromises);

            this.emit('load', assets);
        } catch(e) {
            this.emit('error', e);
        } finally {
            this.reset();
        }
    }

}

/** @module Sprite */

class Sprite {

    /**
     * @param {CanvasRenderingContext2D} ctx 
     * @param {image} image sprite image
     * @param {number} sx source x
     * @param {number} sy source y
     * @param {number} sw source width
     * @param {number} sh source height
     * @param {number} dx destination x
     * @param {number} dy destination y
     * @param {number} width destination width
     * @param {number} height destination height
     */
    constructor(ctx, image, sx = 0, sy = 0, sw, sh, dx, dy, width, height) {
        this.ctx = ctx;
        this.image = image;
        this.sourceX = sx;
        this.sourceY = sy;
        this.sourceWidth = sw || this.image.width;
        this.sourceHeight = sh || this.image.height;
        this.position = Vec2.create(dx, dy);
        this.size = Vec2.create(
            width || this.image.width, 
            height || this.image.height
        );

        this.rotation = 0;

        this.flipX = false;
        this.flipY = false;
    }

    render() {
        this.ctx.save();

        this.ctx.translate(this.position.x + this.size.x / 2, this.position.y + this.size.x / 2);

        this.ctx.scale(this.scale, this.scale);

        this.ctx.rotate(this.rotation);

        this.ctx.scale(this.flipX ? -1 : 1, this.flipY ? -1 : 1);

        this.ctx.translate(-(this.position.x + this.size.x / 2), -(this.position.y + this.size.x / 2));

        this.ctx.drawImage(
            this.image,
            this.sourceX,
            this.sourceY,
            this.sourceWidth,
            this.sourceHeight,
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
        );

        this.ctx.restore();
    }

}

class AnimatedSprite {

    /**
     * @param {CanvasRenderingContext2D} ctx 
     * @param {image} spritesheet
     * @param {number} numCol number of columns
     * @param {number} numRow number of rows
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width 
     * @param {number} height 
     */
    constructor(ctx, spritesheet, numCol, numRow, x, y, width, height) {
        this.ctx = ctx;
        this.spritesheet = spritesheet;

        this.numCol = numCol;
        this.numRow = numRow;

        this.frameWidth = spritesheet.width / numCol;
        this.frameHeight = spritesheet.height / numRow;

        this.position = Vec2.create(x, y);

        this.size = Vec2.create(
            width || this.frameWidth, 
            height || this.frameHeight
        );

        this.maxFrames = numCol * numRow - 1;
        this.currentFrame = 0;

        this.flipX = false;
        this.flipY = false;
        this.rotation = 0;
        this.scale = 1;

        this.animations = new Map();

        this.currentAnimation = null;
        this.playing = false;

        this.time = 0;
    }
    
    /**
     * add animation
     * @param {string} animationName name of animation
     * @param {number} frameStart frame to begin from
     * @param {number} frameEnd frame to end at
     * @param {number} delay delay between each frame
     */
    addAnimation(animationName, frameStart, frameEnd, delay) {
        if(this.animations.has(animationName)) {
            throw new Error(`Animation with name "${animationName}" already exists.`);
        }

        const animation = new SpriteAnimation(this, frameStart, frameEnd, delay);

        this.animations.set(animationName, animation);
        
        return this;
    }

    /**
     * play animation
     * @param {string} animationName name of animation to play
     */
    play(animationName) {
        if(!this.animations.has(animationName)) {
            throw new Error(`Animation with name "${animationName}" does not exists.`);
        }

        this.currentAnimation = this.animations.get(animationName);
        this.currentFrame = this.currentAnimation.frameStart;
        this.playing = true;
        this.time = 0;
    }

    /**
     * stop the sprite animation
     */
    stop() {
        this.playing = false;
    }

    /**
     * Called on each frame to update sprite states
     * @param {number} dt delta time
     * @returns 
     */
    update(dt) {
        if(!this.playing) {
            return;
        }

        const { frameStart, frameEnd, delay } = this.currentAnimation;

        if(this.time >= delay) {

            this.currentFrame++;

            if(this.currentFrame > frameEnd) {
            
                this.currentFrame = frameStart;

            }

            this.time = 0;

        }

        this.time += dt;

    }

    render() {    
        if(!this.currentAnimation) {
            throw new Error("Can't Render AnimatedSprite. No current animation has been set.");
        }
        
        const [ col, row ] = this.currentAnimation.getFrame(this.currentFrame);

        this.ctx.save();

        this.ctx.translate(this.position.x + this.size.x / 2, this.position.y + this.size.x / 2);

        this.ctx.scale(this.scale, this.scale);

        this.ctx.rotate(this.rotation);

        this.ctx.scale(this.flipX ? -1 : 1, this.flipY ? -1 : 1);

        this.ctx.translate(-(this.position.x + this.size.x / 2), -(this.position.y + this.size.x / 2));

        this.ctx.drawImage(
            this.spritesheet, 
            col * this.frameWidth, 
            row * this.frameHeight, 
            this.frameWidth, 
            this.frameHeight, 
            this.position.x, 
            this.position.y, 
            this.size.x, 
            this.size.y
        );

        this.ctx.restore();
    }

}

class SpriteAnimation {

    /**
     * 
     * @param {AnimatedSprite} sprite 
     * @param {number} frameStart 
     * @param {number} frameEnd 
     * @param {number} delay 
     */
    constructor(sprite, frameStart, frameEnd, delay = 100) {
        this.sprite = sprite;

        this.frameStart = frameStart;
        this.frameEnd = frameEnd || this.sprite.maxFrames;
        this.delay = delay / 1000;
        this.frames = [];

        for(let frame = this.frameStart; frame <= this.frameEnd; frame++) {
            this.frames[frame] = [
                frame % this.sprite.numCol, // col
                Math.floor(frame / this.sprite.numCol) // row
            ];
        }
    }

    /**
     * 
     * @param {number} frame 
     * @returns {array} [col, row]
     */
    getFrame(frame) {
        return this.frames[frame];
    }

}

/** @module Utils */

const MOUSE = Vec2.create();

// get exact mouse position

const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;    // relationship bitmap vs. element for X
  const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

  Vec2.set(MOUSE, (evt.clientX - rect.left) * scaleX, (evt.clientY - rect.top) * scaleY);
  
  return MOUSE;
};

// random stuff

/**
 * return a random float between min and max
 */
const random = (min = 0, max = 1) => Math.random() * (max - min) + min;

/**
 * return a random integer between min and max
 */
const randomInt = (min = 0, max = 1) => {

  min = Math.ceil(min);

  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;

};

// array stuff

/**
 * Copy the array without duplicates
 */
const unique = arr => [...new Set(arr)];

/**
 * Randomly shufflet elements of an array in place.
 */
const shuffle = arr => arr.sort(() => Math.random() - 0.5);

/**
 * Split an array into chunks of constant sizes.
 */
const chunk = (arr, chunkSize) => {

  const chunks = [];
    
  for (let i = 0; i < arr.length; i += chunkSize) {
    
    chunks.push(arr.slice(i, i + chunkSize));

  }
    
  return chunks;

};

var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getMousePos: getMousePos,
    random: random,
    randomInt: randomInt,
    unique: unique,
    shuffle: shuffle,
    chunk: chunk
});

/** @module Canvas */

/**
 * Initialize a new Canvas
 * @param {number} width
 * @param {number} height
 * @param {string} background - background color
 */
const createCanvas = (width = 400, height = 400, background) => {

    const canvas = document.createElement('canvas'); // canvas

    canvas.width = width; // set width

    canvas.height = height; // set height

    if(background) {
        canvas.style.background = background; // change background
    }

    return canvas;

};

export { ASSET_TYPES, AnimatedSprite, COLLISION_SIDE, Camera, Collision, dom as DOM, Device, Emitter, Game, math as GameMath, Keyboard, Loader, ResourceLoader, Sound, Sprite, SpriteAnimation, utils as Utils, Vec2, createCanvas, getAudioCtx, getSoundMixer };
