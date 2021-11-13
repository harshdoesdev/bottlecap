/* collision.js */

import { pointDistance } from './math.js';

const abs = Math.abs;

export const COLLISION_SIDE_LEFT = 'left';

export const COLLISION_SIDE_RIGHT = 'right';

export const COLLISION_SIDE_TOP = 'top';

export const COLLISION_SIDE_BOTTOM = 'bottom';

/**
 * circle in circle collision detection
 * @param {number} x1 - center of first circle
 * @param {number} y1 - center of first circle
 * @param {number} r1 - radius of first circle
 * @param {number} x2 - center of second circle
 * @param {number} y2 - center of second circle
 * @param {number} r2 - radius of second circle
 * @return {boolean} true if circles are overlapping
 */
export const circleInCircle = (x1, y1, r1, x2, y2, r2) => {
  
  return pointDistance( x1, y1, x2, y2 ) <= r1 + r2;

};

// 

/**
 * point in circle collision check
 * @param {number} px - point
 * @param {number} py - point
 * @param {number} cx - center of circle
 * @param {number} cy - center of circle
 * @param {number} cr - radius of circle
 * @return {boolean} true if point is inside circle
 */
export const pointInCircle = (px, py, cx, cy, cr) => {

  return pointDistance( px, py, cx, cy ) <= cr;

};

/**
 * checks if a point is in a rectangle
 * AABB rectangle in rectangle collision detection
 * @param {number} x1 - left side of first rectangle
 * @param {number} y1 - top side of first rectangle
 * @param {number} w1 - width of first rectangle
 * @param {number} h1 - height of first rectangle
 * @param {number} x2 - left side of second rectangle
 * @param {number} y2 - top side of second rectangle
 * @param {number} w2 - width of second rectangle
 * @param {number} h2 - height of second rectangle
 */
export const rectInRect = (x1, y1, w1, h1, x2, y2, w2, h2) => {

  if( x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2 ) {

    return true;

  }

  return false;

};


/**
 * point in rectangle check detection
 * @param {number} px - point
 * @param {number} py - point
 * @param {number} rx - left side of rectangle
 * @param {number} ry - top side of rectangle
 * @param {number} rw - width of rectangle
 * @param {number} rh - height of rectangle
 */
export const pointInRect = (px, py, rx, ry, rw, rh) => {
  
  if(rx <= px && px <= rx + rw && ry <= py && py <= ry + rh) {
    
    return true;
  
  }
  
  return false;
  
};

// resolve 2d rect vs rect collision

export const resolveCollision = (A, B) => {
  
  const vX = (A.x + (A.w / 2))  - (B.x + (B.w / 2)),
        
        vY = (A.y + (A.h / 2)) - (B.y + (B.h / 2)),
        
        ww2 = (A.w / 2) + (B.w / 2),
        
        hh2 = (A.h / 2) + (B.h / 2);

  let colDir = '';

  if (abs(vX) < ww2 && abs(vY) < hh2) {
  
    const oX = ww2 - abs(vX),
    
          oY = hh2 - abs(vY);

    if (oX >= oY) {
      
      if (vY > 0) {
      
        colDir = COLLISION_SIDE_TOP;
        
        A.y += oY;
      
      } else {
      
        colDir = COLLISION_SIDE_BOTTOM;
        
        A.y -= oY;
      
      }
   
    } else {
    
      if (vX > 0) {
      
        colDir = COLLISION_SIDE_LEFT;
        
        A.x += oX;
      
      } else {
      
        colDir = COLLISION_SIDE_RIGHT;
        
        A.x -= oX;
      
      }
    
    }
  
  }

  return colDir;
  
};
