/** @module Collision */
import { pointDistance } from './math.js';
const abs = Math.abs;
export const COLLISION_SIDE = {
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right'
};
/**
 * Collision - Basic Collision Handling
 */
export default class Collision {
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
    static circleInCircle(x1, y1, r1, x2, y2, r2) {
        return pointDistance(x1, y1, x2, y2) <= r1 + r2;
    }
    /**
     * point in circle collision check
     * @param {number} px - point
     * @param {number} py - point
     * @param {number} cx - center of circle
     * @param {number} cy - center of circle
     * @param {number} cr - radius of circle
     * @return {boolean} true if point is inside circle
     */
    static pointInCircle(px, py, cx, cy, cr) {
        return pointDistance(px, py, cx, cy) <= cr;
    }
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
    static rectInRect(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2) {
            return true;
        }
        return false;
    }
    /**
     * point in rectangle check detection
     * @param {number} px - point
     * @param {number} py - point
     * @param {number} rx - left side of rectangle
     * @param {number} ry - top side of rectangle
     * @param {number} rw - width of rectangle
     * @param {number} rh - height of rectangle
     */
    static pointInRect(px, py, rx, ry, rw, rh) {
        if (rx <= px && px <= rx + rw && ry <= py && py <= ry + rh) {
            return true;
        }
        return false;
    }
    /**
     * Circle in Rectangle collision detection
     * @param {number} cx center of circle
     * @param {number} cy center of circle
     * @param {number} r radius of the circle
     * @param {number} rx left side of rectangle
     * @param {number} ry top side of rectangle
     * @param {number} w width of rectangle
     * @param {number} h height of rectangle
     * @returns {boolean}
     */
    static circleInRect(cx, cy, r, rx, ry, w, h) {
        const halfWidth = w / 2;
        const halfHeight = h / 2;
        const distX = abs(cx - rx - halfWidth);
        const distY = abs(cy - ry - halfHeight);
        if (distX > (halfWidth + r)) {
            return false;
        }
        if (distY > (halfHeight + r)) {
            return false;
        }
        if (distX <= halfWidth) {
            return true;
        }
        if (distY <= halfHeight) {
            return true;
        }
        const dx = distX - halfWidth;
        const dy = distY - halfHeight;
        return (dx * dx + dy * dy <= (r * r));
    }
    /**
     * Resolve Collision Between Two Rects
     * @typedef {postition: Vec2, size: Vec2} Rect
     * @param {Rect} A
     * @param {Rect} B
     * @returns
     */
    static resolveCollision(A, B) {
        const vX = (A.position.x + (A.size.x / 2)) - (B.position.x + (B.size.x / 2));
        const vY = (A.position.y + (A.size.y / 2)) - (B.position.y + (B.size.y / 2));
        const ww2 = (A.size.x / 2) + (B.size.x / 2);
        const hh2 = (A.size.y / 2) + (B.size.y / 2);
        let colDir = '';
        if (abs(vX) < ww2 && abs(vY) < hh2) {
            const oX = ww2 - abs(vX), oY = hh2 - abs(vY);
            if (oX >= oY) {
                if (vY > 0) {
                    colDir = COLLISION_SIDE.TOP;
                    A.position.y += oY;
                }
                else {
                    colDir = COLLISION_SIDE.BOTTOM;
                    A.position.y -= oY;
                }
            }
            else {
                if (vX > 0) {
                    colDir = COLLISION_SIDE.LEFT;
                    A.position.x += oX;
                }
                else {
                    colDir = COLLISION_SIDE.RIGHT;
                    A.position.x -= oX;
                }
            }
        }
        return colDir;
    }
}
