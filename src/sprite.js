/* sprite.js */

export class AnimatedSprite {

    /**
     * 
     * @param {image} spritesheet
     * @param {number} numCol number of columns
     * @param {number} numRow number of rows
     */
    constructor(spritesheet, numCol, numRow) {
        this.spritesheet = spritesheet;

        this.numCol = numCol;
        this.numRow = numRow;

        this.frameWidth = spritesheet.width / numCol;
        this.frameHeight = spritesheet.height / numRow;

        this.maxFrames = numCol * numRow - 1;
        this.currentFrame = 0;

        this.flipX = false;
        this.flipY = false;

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

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width 
     * @param {number} height 
     */
    render(ctx, x, y, width, height) {
    
        const [ col, row ] = this.currentAnimation.getFrame(this.currentFrame);

        ctx.save();
        
        if(this.flipX || this.flipY) {

            ctx.translate(x + width / 2, y + width / 2);
            
            ctx.scale(this.flipX ? -1 : 1, this.flipY ? -1 : 1);
        
            ctx.translate(-(x + width / 2), -(y + width / 2));

        }

        ctx.drawImage(
            this.spritesheet, 
            col * this.frameWidth, 
            row * this.frameHeight, 
            this.frameWidth, 
            this.frameHeight, 
            x, 
            y, 
            width, 
            height
        );

        ctx.restore();
    
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
