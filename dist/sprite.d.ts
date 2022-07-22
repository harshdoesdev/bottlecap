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
    animations: Map<any, any>;
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
import Vec2 from "./vec2.js";
