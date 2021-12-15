import { Vec2 } from './math.js';
import { randomInt } from './utils.js';

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

    this.isShaking = false;
    this.shakeOffset = Vec2.create();
    this.shakeDuration = 0;
    this.shakeIntensity = 0;
  
  }


  /**
   * Start rendering through this camera
   */
  attach() {
    
    this.ctx.save();
   
    this.ctx.translate(this.pos.x, this.pos.y);

    if(this.shakeDuration > 0) {
      this.ctx.translate(this.shakeOffset.x, this.shakeOffset.y);
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
    Vec2.set(this.pos, this.cx - this.target.x, this.cy - this.target.y);

    if(this.shakeDuration > 0) {
      this.shakeDuration -= dt;
      this.updateShakeOffset();
    } else if(this.isShaking) {
      this.isShaking = false;
    }
  }

  /**
   * @ignore internal function to update the shake offset
   */
  updateShakeOffset() {
    Vec2.set(
      this.shakeOffset,
      randomInt(-this.shakeIntensity, this.shakeIntensity),
      randomInt(-this.shakeIntensity, this.shakeIntensity)
    );
  }

  /**
   * Move the focus point of the camera
   * @param {number} x - where to look
   * @param {number} y - where to look
   */
  lookAt(x, y) {
    
    Vec2.set(this.target, x, y);

  }

  /**
   * makes the camera shake
   * @param {number} duration duration of camera shake effect 
   * @param {number} intensity intensity of camera shake
   */
  shake(duration = 1000, intensity = 5) {
    this.shakeDuration = duration / 1000;
    this.shakeIntensity = intensity;
    this.isShaking = true;
  }

}
