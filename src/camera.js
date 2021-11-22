import { Vec2 } from './math.js';
import { randomInt } from './utils.js';

/* camera.js */

const round = Math.round;

/**
 * Camera
 */
export class Camera {

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
    
    this.cx = round(ctx.canvas.width / 2) - dx;
    this.cy = round(ctx.canvas.height / 2) - dy;

    this.isShaking = false;
    this.shakeDuration = 0;
    this.shakeIntensity = 0;
  
  }


  /**
   * Start rendering through this camera
   */
  attach() {
    
    this.ctx.save();
   
    this.ctx.translate(this.cx - this.pos.x, this.cy - this.pos.y);
    if(this.shakeDuration > 0) {
      this.ctx.translate(
          randomInt(-this.shakeIntensity, this.shakeIntensity), 
          randomInt(-this.shakeIntensity, this.shakeIntensity)
      );
    }
  
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
    if(this.shakeDuration > 0) {
      this.shakeDuration -= dt;
    } else if(this.isShaking) {
      this.isShaking = false;
    }
  }

  /**
   * Move the focus point of the camera
   * @param {number} x - where to look
   * @param {number} y - where to look
   */
  lookAt(x, y) {
    
    Vec2.set(this.pos, x, y);

  }

  /**
   * makes the camera shake
   * @param {number} duration duration of camera shake effect 
   * @param {number} intensity intensity of camera shake
   */
  shake(duration = 1000, intensity = 5) {
    if(this.isShaking)
      return;
    this.shakeDuration = duration / 1000;
    this.shakeIntensity = intensity;
    this.isShaking = true;
  }

}
