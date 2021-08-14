/* camera.js */

const round = Math.round;

export class Camera {

  /**
   * @param {CanvasRenderingContext2D} ctx  current canvas context
   * @param {number} x  initial point to look at (x)
   * @param {number} y  initial point to look at (y)
   * @param {number} dx  offset from screen center (x)
   * @param {number} dy  offset from screen center (y)
   */
  constructor(ctx, x = 0, y = 0, dx = 0, dy = 0) {
  
    this.ctx = ctx;

    this.position = { x, y };
    
    this.cx = round(ctx.canvas.width / 2) - dx;
    this.cy = round(ctx.canvas.height / 2) - dy;
  
  }


  /**
   * Start rendering through this camera
   */
  attach() {
    
    this.ctx.save();
   
    this.ctx.translate(this.cx - this.position.x, this.cy - this.position.y);
  
  }

  /**
   * Stop rendering through this camera
   */
  detach() {
    
    this.ctx.restore();
  
  }

  /**
   * Move the focus point of the camera
   * @param {number} x  where to look
   * @param {number} y  where to look
   */
  lookAt(x, y) {
    
    this.position.x = x || this.position.x;
    
    this.position.y = y || this.position.y;

  }

}
