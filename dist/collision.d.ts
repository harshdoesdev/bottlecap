export namespace COLLISION_SIDE {
    const TOP: string;
    const BOTTOM: string;
    const LEFT: string;
    const RIGHT: string;
}
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
    static circleInCircle(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): boolean;
    /**
     * point in circle collision check
     * @param {number} px - point
     * @param {number} py - point
     * @param {number} cx - center of circle
     * @param {number} cy - center of circle
     * @param {number} cr - radius of circle
     * @return {boolean} true if point is inside circle
     */
    static pointInCircle(px: number, py: number, cx: number, cy: number, cr: number): boolean;
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
    static rectInRect(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number): boolean;
    /**
     * point in rectangle check detection
     * @param {number} px - point
     * @param {number} py - point
     * @param {number} rx - left side of rectangle
     * @param {number} ry - top side of rectangle
     * @param {number} rw - width of rectangle
     * @param {number} rh - height of rectangle
     */
    static pointInRect(px: number, py: number, rx: number, ry: number, rw: number, rh: number): boolean;
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
    static circleInRect(cx: number, cy: number, r: number, rx: number, ry: number, w: number, h: number): boolean;
    /**
     * Resolve Collision Between Two Rects
     * @typedef {postition: Vec2, size: Vec2} Rect
     * @param {Rect} A
     * @param {Rect} B
     * @returns
     */
    static resolveCollision(A: Rect, B: Rect): string;
}
