/* collision.js */

import { pointDistance } from './math.js';

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

const pointInRect = (px, py, rx, ry, rw, rh) => px > rx && px < rx && py > ry && py < ry;

// resolve 2d rect vs rect collision

export const resolveCollision = (A, B) => {

  const vX = (A.x + (A.w / 2))  - (B.x + (B.w / 2)),

        vY = (A.y + (A.h / 2)) - (B.y + (B.h / 2)),

        ww2 = (A.w / 2) + (B.w / 2),

        hh2 = (A.h / 2) + (B.h / 2);

  let colDir = "";

  if (Math.abs(vX) < ww2 && Math.abs(vY) < hh2) {

    const oX = ww2 - Math.abs(vX),

          oY = hh2 - Math.abs(vY);

    if (oX >= oY) {

      if (vY > 0) {

        colDir = "TOP";

        A.y += oY;

      } else {

        colDir = "BOTTOM";

        A.y -= oY;

      }

    } else {

      if (vX > 0) {

        colDir = "LEFT";

        A.x += oX;

      } else {

        colDir = "RIGHT";

        A.x -= oX;

      }

    }

  }

  return colDir;

};