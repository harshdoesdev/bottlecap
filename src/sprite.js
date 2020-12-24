export default (spritesheet, numCol, numRow, delay) => {

  let frameWidth = spritesheet.width / numCol, frameHeight = spritesheet.height / numRow;

  let maxFrames = numCol * numRow - 1;

  let currentFrame = 0, then;

  let currentAnimation = { frameStart: 0 }, prevAnimation;

  return {

    setAnimation(animation) {

      if(animation !== prevAnimation) {

        prevAnimation = currentAnimation; 
        
        currentAnimation = animation;

        currentFrame = currentAnimation.frameStart;

      }

    },

    draw(ctx, x, y, w = frameWidth, h = frameHeight, flippedX = false, flippedY = false) {

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
      
      if(flippedX || flippedY) {

        ctx.translate(x + w/2, y + w/2);
        
        ctx.scale(flippedX ? -1 : 1, flippedY ? -1 : 1);
      
        ctx.translate(-(x + w/2), -(y + w/2));

      }

      ctx.drawImage(spritesheet, col * frameWidth, row * frameHeight, frameWidth, frameHeight, x, y, w, h);

      ctx.restore();

    }

  }

};