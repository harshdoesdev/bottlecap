export default (spritesheet, sw, sh, numCol, numRow, delay) => {

  let frameWidth = sw / numCol, frameHeight = sh / numRow;

  let maxFrames = numCol * numRow - 1;

  let currentFrame = 0, then;

  let currentAnimation, prevAnimation;

  return {

    setAnimation(animation) {

      if(animation !== prevAnimation) {

        prevAnimation = currentAnimation; 
        
        currentAnimation = animation;

        currentFrame = currentAnimation.frameStart;

      }

    },

    draw(ctx, x, y, w, h, flipped = false) {

      const now = performance.now();

      const { frameEnd = maxFrames, frameStart } = currentAnimation;

      if(!then || now - then >= delay) {

        currentFrame++;

        if(currentFrame > frameEnd) {
          
          currentFrame = frameStart;

        }

        then = now;

      }

      let col = currentFrame % numCol, row = Math.floor(currentFrame / numCol);
      
      ctx.save();
      
      if(flipped) { // flips the sprite horizontally

        ctx.translate(x + w/2, y + w/2);
        
        ctx.scale(-1, 1);
        
        ctx.translate(-(x + w/2), -(y + w/2));
      
      }

      ctx.drawImage(spritesheet, col * frameWidth, row * frameHeight, frameWidth, frameHeight, x, y, w, h);
      
      ctx.restore();

    }

  }

};
