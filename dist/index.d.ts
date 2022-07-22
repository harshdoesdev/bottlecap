export type direction = {
    x: number;
    y: number;
};
export class AnimatedSprite {
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
    constructor(ctx: CanvasRenderingContext2D, spritesheet: image, numCol: number, numRow: number, x: number, y: number, width: number, height: number);
    ctx: CanvasRenderingContext2D;
    spritesheet: image;
    numCol: number;
    numRow: number;
    frameWidth: number;
    frameHeight: number;
    position: Vec2;
    size: Vec2;
    maxFrames: number;
    currentFrame: number;
    flipX: boolean;
    flipY: boolean;
    rotation: number;
    scale: number;
    animations: any;
    currentAnimation: any;
    playing: boolean;
    time: number;
    /**
     * add animation
     * @param {string} animationName name of animation
     * @param {number} frameStart frame to begin from
     * @param {number} frameEnd frame to end at
     * @param {number} delay delay between each frame
     */
    addAnimation(animationName: string, frameStart: number, frameEnd: number, delay: number): AnimatedSprite;
    /**
     * play animation
     * @param {string} animationName name of animation to play
     */
    play(animationName: string): void;
    /**
     * stop the sprite animation
     */
    stop(): void;
    /**
     * Called on each frame to update sprite states
     * @param {number} dt delta time
     * @returns
     */
    update(dt: number): void;
    render(): void;
}
/**
 * Camera - Basic PointLocked Camera
 */
export class Camera {
    /**
     * @param {CanvasRenderingContext2D} ctx - current canvas context
     * @param {number} x - initial point to look at (x)
     * @param {number} y - initial point to look at (y)
     * @param {number} dx - offset from screen center (x)
     * @param {number} dy - offset from screen center (y)
     */
    constructor(ctx: CanvasRenderingContext2D, x?: number, y?: number, dx?: number, dy?: number);
    ctx: CanvasRenderingContext2D;
    pos: Vec2;
    target: Vec2;
    cx: number;
    cy: number;
    /**
     * Start rendering through this camera
     */
    attach(): void;
    /**
     * Stop rendering through this camera
     */
    detach(): void;
    /**
     * update the camera
     * @param {*} dt
     */
    update(dt: any): void;
    /**
     * Move the focus point of the camera
     * @param {number} x - where to look
     * @param {number} y - where to look
     */
    lookAt(x: number, y: number): void;
}
/**
 * Collision - Basic Collision Handling
 */
export class Collision {
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
    static circleInCircle(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): boolean;
    /**
     * point in circle collision check
     * @param {number} px - point
     * @param {number} py - point
     * @param {number} cx - center of circle
     * @param {number} cy - center of circle
     * @param {number} cr - radius of circle
     * @return {boolean} true if point is inside circle
     */
    static pointInCircle(px: number, py: number, cx: number, cy: number, cr: number): boolean;
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
    static rectInRect(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number): boolean;
    /**
     * point in rectangle check detection
     * @param {number} px - point
     * @param {number} py - point
     * @param {number} rx - left side of rectangle
     * @param {number} ry - top side of rectangle
     * @param {number} rw - width of rectangle
     * @param {number} rh - height of rectangle
     */
    static pointInRect(px: number, py: number, rx: number, ry: number, rw: number, rh: number): boolean;
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
    static circleInRect(cx: number, cy: number, r: number, rx: number, ry: number, w: number, h: number): boolean;
    /**
     * Resolve Collision Between Two Rects
     * @typedef {postition: Vec2, size: Vec2} Rect
     * @param {Rect} A
     * @param {Rect} B
     * @returns
     */
    static resolveCollision(A: Rect, B: Rect): string;
}
declare var dom: Readonly<{
    __proto__: any;
    el: (selector: any) => any;
    svg: (selector: any) => any;
    frag: () => DocumentFragment;
    text: (data?: string) => Text;
    qs: (selectors: any, ctx?: Document) => any;
    qsa: (selectors: any, ctx?: Document) => NodeListOf<any>;
    setStyle: (element: any, styleObj: any) => any;
    attr: (element: any, attributeName: any, value: any) => any;
    on: (element: any, type: any, handler: any) => any;
    off: (element: any, type: any, handler: any) => any;
    ready: (app: any) => void;
}>;
/** @module Device */
/**
 * Basic Device Info
 */
export class Device {
    /**
     * @return {boolean} true if the device have touch screen capabilities
     */
    static isTouchscreen(): boolean;
    /**
     * @return {boolean} true if the browser supports gamepads
     */
    static gamepadAvailable(): boolean;
}
/** @module Emitter */
export class Emitter {
    topics: {};
    emit(id: any, ...data: any[]): void;
    hasTopic(id: any): any;
    on(id: any, listener: any): () => void;
    once(id: any, listener: any): () => void;
    off(id: any, listener: any): void;
    destroy(): void;
}
/** @module Game */
/**
 * Main class, representing the current Game state
 */
export class Game {
    /**
     * Kickstart the game
     */
    run(): void;
    running: boolean;
    _lastStep: number;
    _frameRequest: number;
    stop(): void;
    /**
     * @ignore
     * Internal function called on each frame.
     */
    step(): void;
    /**
     * Called at start to initialize game states.
     */
    init(): void;
    /**
     * Called on each frame to update game states.
     * @param {number} dt  time since last update
     */
    update(dt: number): void;
    /**
     * Called on each frame to render the game.
     */
    render(): void;
}
declare var math: Readonly<{
    __proto__: any;
    PI: number;
    TWO_PI: number;
    HALF_PI: number;
    pointDistance: (x1: number, y1: number, x2: number, y2: number) => number;
    pointToAngle: (x: number, y: any) => number;
    clamp: (num: any, min: any, max: any) => number;
}>;
export class Keyboard {
    /**
     * check if a key is down
     * @param {string} key
     */
    static keyDown(key: string): boolean;
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
    static getDirection(): direction;
    static KEYS: {
        LEFT: string;
        RIGHT: string;
        UP: string;
        DOWN: string;
        SPACEBAR: string;
        ESCAPE: string;
        ENTER: string;
        CTRL: string;
        TAB: string;
        ALT: string;
        W: string;
        A: string;
        S: string;
        D: string;
        E: string;
        X: string;
        Z: string;
    };
}
/**
 * A Basic Asset Loader
 */
export class Loader extends Emitter {
    queue: any[];
    loading: boolean;
    /**
     * enqueue an asset
     * @param {string} name - name of asset
     * @param {string} src - src of asset
     * @param {string} type - type of asset
     */
    enqueue(name: string, src: string, type: string): void;
    /**
     * add image to the queue
     * @param {string} name - name of image
     * @param {string} src - source of image
     */
    addImage(name: string, src: string): Loader;
    /**
     * add sound to queue
     * @param {string} name - name of sound
     * @param {string} src - source of sound
     */
    addSound(name: string, src: string): Loader;
    /**
     * add json file to queue
     * @param {string} name - name of json file
     * @param {string} src - source of json file
     */
    addJSON(name: string, src: string): Loader;
    /**
     * clears the queue
     */
    clearQueue(): void;
    /**
     * reset the loader
     */
    reset(): void;
    /**
     * Start Loading
     */
    load(): Promise<void>;
}
/**
 * Resource Loader
 */
export class ResourceLoader {
    /**
     * Asynchronously load an image from URL
     * @param {string} name - ressource id
     * @param {string} src - ressource URL
     */
    static Image(name: string, src: string): any;
    /**
     * Asynchronously load a sound file from URL
     * @param {string} name - ressource id
     * @param {string} src - ressource URL
     */
    static Sound(name: string, src: string): Promise<{
        type: string;
        name: string;
        value: any;
    }>;
    /**
     * Asynchronously load a sound file from URL
     * @param {string} name - ressource id
     * @param {string} src - ressource URL
     */
    static JSON(name: string, src: string): Promise<{
        type: string;
        name: string;
        value: any;
    }>;
    /**
     * Load Multiple Assets at Once
     * @param {array} - Array of load Promises
     * @return {object} - Loaded assets are mapped to this object categorically
     */
    static loadAll(loadPromises: any): object;
}
/**
 * Sound Player
 */
export class Sound {
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
    static play(gainNode: GainNode, audioBuffer: AudioBuffer, time?: number, loop?: boolean): any;
    static stop(source: any, time?: number): void;
    /**
     * set the output volume
     * @param {GainNode} gainNode - output mixer
     * @param {number} v - volume
     * @example
     * setVolume(soundMixer, .5);
     */
    static setVolume(gainNode: GainNode, v: number): void;
}
/** @module Sprite */
export class Sprite {
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
    constructor(ctx: CanvasRenderingContext2D, image: image, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, width: number, height: number);
    ctx: CanvasRenderingContext2D;
    image: image;
    sourceX: number;
    sourceY: number;
    sourceWidth: any;
    sourceHeight: any;
    position: Vec2;
    size: Vec2;
    rotation: number;
    flipX: boolean;
    flipY: boolean;
    render(): void;
}
export class SpriteAnimation {
    /**
     *
     * @param {AnimatedSprite} sprite
     * @param {number} frameStart
     * @param {number} frameEnd
     * @param {number} delay
     */
    constructor(sprite: AnimatedSprite, frameStart: number, frameEnd: number, delay?: number);
    sprite: AnimatedSprite;
    frameStart: number;
    frameEnd: number;
    delay: number;
    frames: number[][];
    /**
     *
     * @param {number} frame
     * @returns {array} [col, row]
     */
    getFrame(frame: number): any[];
}
declare var utils: Readonly<{
    __proto__: any;
    getMousePos: (canvas: any, evt: any) => Vec2;
    random: (min?: number, max?: number) => number;
    randomInt: (min?: number, max?: number) => number;
    unique: (arr: any) => any[];
    shuffle: (arr: any) => any;
    chunk: (arr: any, chunkSize: any) => any[];
}>;
/** @module Vec2 */
/**
 * Vec2 - Create Vector and Perform Basic Vector Math
 */
export class Vec2 {
    static zero(): Vec2;
    static create(x: any, y: any): Vec2;
    static clone({ x, y }: {
        x: any;
        y: any;
    }): Vec2;
    static copy(v: any, v2: any): any;
    static set(v: any, x: any, y: any): any;
    static add(v: any, { x, y }: {
        x: any;
        y: any;
    }): any;
    static sub(v: any, { x, y }: {
        x: any;
        y: any;
    }): any;
    static mul(v: any, { x, y }: {
        x: any;
        y: any;
    }): any;
    static div(v: any, { x, y }: {
        x: any;
        y: any;
    }): any;
    static addScalar(v: any, s: any): any;
    static subScalar(v: any, s: any): any;
    static mulScalar(v: any, s: any): any;
    static divScalar(v: any, s: any): any;
    static angle(v: any): any;
    static calcLength(v: any): number;
    static equals(v: any, v2: any): boolean;
    static dot(v: any, v2: any): number;
    static cross(v: any, v2: any): number;
    static lerp(v: any, { x, y }: {
        x: any;
        y: any;
    }, alpha: any): any;
    static normalize(v: any): any;
    static distance(v: any, v2: any): number;
    constructor(x?: number, y?: number);
    x: number;
    y: number;
}
/** @module Canvas */
/**
 * Initialize a new Canvas
 * @param {number} width
 * @param {number} height
 * @param {string} background - background color
 */
export function createCanvas(width: number, height: number, background: string): HTMLCanvasElement;
export function getAudioCtx(): any;
export function getSoundMixer(): any;
export { dom as DOM, math as GameMath, utils as Utils };
