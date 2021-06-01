/* collision.js */

import { pointDistance } from './math.js';

const abs = Math.abs;

export const COLLISION_SIDE_LEFT = 'left';

export const COLLISION_SIDE_RIGHT = 'right';

export const COLLISION_SIDE_TOP = 'top';

export const COLLISION_SIDE_BOTTOM = 'bottom';

// circle in circle collision detection

export const circleInCircle = (x1, y1, r1, x2, y2, r2) => {
  
  return pointDistance( x1, y1, x2, y2 ) <= r1 + r2;

};

// point in circle collision check

export const pointInCircle = (px, py, cx, cy, cr) => {

  return pointDistance( px, py, cx, cy ) <= cr;

};

// aabb rectangle in rectangle collision detection

export const rectInRect = (x1, y1, w1, h1, x2, y2, w2, h2) => {

  if( x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2 ) {

    return true;

  }

  return false;

};

// checks if a point is in a rectangle

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
