/* sprite.js */

import { Vec2 } from "./math.js";

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
    constructor(ctx, image, sx = 0, sy = 0, sw, sh, dx, dy, width, height) {
        this.ctx = ctx;
        this.image = image;
        this.sourceX = sx;
        this.sourceY = sy;
        this.sourceWidth = sw || this.image.width;
        this.sourceHeight = sh || this.image.height;
        this.pos = Vec2.create(dx, dy);
        this.width = width || this.image.width;
        this.height = height || this.image.height;

        this.rotation = 0;

        this.flipX = false;
        this.flipY = false;
    }

    render() {
        this.ctx.save();

        this.ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.width / 2);

        this.ctx.scale(this.scale, this.scale);

        this.ctx.rotate(this.rotation);

        this.ctx.scale(this.flipX ? -1 : 1, this.flipY ? -1 : 1);

        this.ctx.translate(-(this.pos.x + this.width / 2), -(this.pos.y + this.width / 2));

        this.ctx.drawImage(
            this.image,
            this.sourceX,
            this.sourceY,
            this.sourceWidth,
            this.sourceHeight,
            this.pos.x,
            this.pos.y,
            this.width,
            this.height
        );

        this.ctx.restore();
    }

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
    constructor(ctx, spritesheet, numCol, numRow, x, y, width, height) {
        this.ctx = ctx;
        this.spritesheet = spritesheet;

        this.numCol = numCol;
        this.numRow = numRow;

        this.frameWidth = spritesheet.width / numCol;
        this.frameHeight = spritesheet.height / numRow;

        this.pos = Vec2.create(x, y);

        this.width = width || this.frameWidth;
        this.height = height || this.frameHeight;

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

        if(!this.playing)
            return;

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
        const [ col, row ] = this.currentAnimation.getFrame(this.currentFrame);

        this.ctx.save();

        this.ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.width / 2);

        this.ctx.scale(this.scale, this.scale);

        this.ctx.rotate(this.rotation);

        this.ctx.scale(this.flipX ? -1 : 1, this.flipY ? -1 : 1);

        this.ctx.translate(-(this.pos.x + this.width / 2), -(this.pos.y + this.width / 2));

        this.ctx.drawImage(
            this.spritesheet, 
            col * this.frameWidth, 
            row * this.frameHeight, 
            this.frameWidth, 
            this.frameHeight, 
            this.pos.x, 
            this.pos.y, 
            this.width, 
            this.height
        );

        this.ctx.restore();
    }

}

export class SpriteAnimation {

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
