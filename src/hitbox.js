import { rectInRect } from './collision.js';

/**
 * A basic hitbox.
 */
export default class Hitbox {
 
  isColliding = false
  
  /**
   * @param {number} x - left side
   * @param {number} y - top side
   * @param {number} w - rectangle width
   * @param {number} h - rectangle height
   */
  constructor(x = 0, y = 0, w = 32, h = 32) {
    Object.assign(this, { x, y, w, h });
  }
  
  /**
   * @param {Hitbox} box - another hibox object
   * @returns {boolean} true if box collide with this
   */
  hitTest(box) {
    if(rectInRect(this.x, this.y, this.w, this.h, box.x, box.y, box.w, box.h)) {
      this.isColliding = true; 
    } else {
      this.isColliding = false;
    }
    
    return this.isColliding;
  }
  
}
