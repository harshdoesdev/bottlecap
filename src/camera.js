import Vec2 from './vec2.js';

/* camera.js */

const round = Math.round;

/**
 * Camera
 */
export default class Camera {

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

    this.target = Vec2.create();
    
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
