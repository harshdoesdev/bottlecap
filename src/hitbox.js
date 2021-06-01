export default class Hitbox {
 
  isColliding = false
  
  constructor(x = 0, y = 0, w = 32, h = 32) {
    Object.assign(this, { x, y, w, h });
  }
  
  hitTest(box) {
    if(rectInRect(this.x, this.y, this.w, this.h, box.x, box.y, box.w, box.h)) {
      this.isColliding = true; 
    } else {
      this.isColliding = false;
    }
    
    return this.isColliding;
  }
  
}
