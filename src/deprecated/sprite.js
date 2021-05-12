const createSprite = (spritesheet, numCol, numRow, delay) => {

  const frameWidth = spritesheet.width / numCol, frameHeight = spritesheet.height / numRow;

  const maxFrames = numCol * numRow - 1;

  let currentFrame = 0, then;

  let currentAnimation = { frameStart: 0 }, prevAnimation;

  return {

    setAnimation(animation) {

      if(animation !== prevAnimation) return;

      prevAnimation = currentAnimation; 
        
      currentAnimation = animation;

      currentFrame = currentAnimation.frameStart;

    },

    draw(ctx, x, y, w = frameWidth, h = frameHeight, flipX = false, flipY = false) {

      const { frameEnd = maxFrames, frameStart } = currentAnimation;

      const now = performance.now();

      if(!then || (now - then) >= delay) {

        currentFrame++;

        if(currentFrame > frameEnd) {
          
          currentFrame = frameStart;

        }

        then = now;

      }

      const col = currentFrame % numCol, row = Math.floor(currentFrame / numCol);

      ctx.save();
      
      if(flipX || flipY) {

        ctx.translate(x + w / 2, y + w / 2);
        
        ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
      
        ctx.translate(-(x + w / 2), -(y + w / 2));

      }

      ctx.drawImage(spritesheet, col * frameWidth, row * frameHeight, frameWidth, frameHeight, x, y, w, h);

      ctx.restore();

    }

  }

};

export default createSprite;
