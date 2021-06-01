export default class Hitbox {
 
  isColliding = false
  
  constructor(x, y, w, h) {
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
