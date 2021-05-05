/* camera.js */

const round = Math.round;

export default class Camera {

  constructor({ ctx, x = 0, y = 0, dx = 0, dy = 0 }) {
  
    this.ctx = ctx;
    this.cnv = ctx.canvas;

    this.position = { x, y };
    
    this.cx = round(this.cnv.width / 2) - dx;
    this.cy = round(this.cnv.height / 2) - dy;
  
  }

  attach() {
    
    this.ctx.save();
   
    this.ctx.translate(this.cx - this.position.x, this.cy - this.position.y);
  
  }

  detach() {
    
    this.ctx.restore();
  
  }

  move(x, y) {
    
    this.position.x = x || this.position.x;
    
    this.position.y = y || this.position.y;

  }

}
