/* camera.js */

// create camera

const round = Math.round;

export const createCam = (ctx, dx = 0, dy = 0) => {

  return { 
    
    ctx, 
    
    x: 0,
    
    y: 0,
    
    cx: round(ctx.canvas.width / 2) - dx, 
    
    cy: round(ctx.canvas.height / 2) - dy
  
  };

};

// attach camera and apply transitions

export const attachCam = ({ ctx, x, y, cx, cy }) => {

  ctx.save();

  ctx.translate(cx - x, cy - y);

};

// detach camera

export const detachCam = cam => cam.ctx.restore();

// move camera to given coordinates

export const moveCam = (cam, x, y) => {

  cam.x = x || cam.x;

  cam.y = y || cam.y;

};
