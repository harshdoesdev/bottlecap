/* math.js */

export const PI = Math.PI;

export const TWO_PI = PI * 2;

export const HALF_PI = PI / 2;

// measures distance between two points

/**
 * Euclidean distance
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
export const pointDistance = (x1, y1, x2, y2) => {

  const dx = x1 - x2,

        dy = y1 - y2;

  return Math.sqrt(dx * dx + dy * dy);

};

// converts point to angle

/**
 * Angle from the (1, 0) direction in radians
 * @param {number} x
 * @param {number} z
 */
export const pointToAngle = (x, y) => -Math.atan2(-y, x);

/**
 * clamp num between min and max
 */
 export const clamp = (num, min, max) => Math.max(min, Math.min(num, max));

// Vec2

export class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

/**
 * create a Vector 2D Object
 * @param {number} x
 * @param {number} y
 */

Vec2.create = (x, y) => new Vec2(x, y);

// clone a Vec2

Vec2.clone = ({ x, y }) => Vec2.create(x, y);

// copy properties of Vec2 "v2" into Vec2 "v"

Vec2.copy = (v, v2) => Object.assign(v, v2);

// set Vec2

Vec2.set = (v, x, y) => {
    v.x = x != null ? x : v.x;
    v.y = y != null ? y : v.y;

    return v;
};

// add two vectors

Vec2.add = (v, { x, y }) => {
    v.x += x;
    v.y += y;

    return v;
};

// substract two vectors

Vec2.sub = (v, { x, y }) => {
    v.x -= x;
    v.y -= y;

    return v;
};

// multiply two vectors

Vec2.mul = (v, { x, y }) => {
    v.x *= x;
    v.y *= y;

    return v;
};

// divide two vectors

Vec2.div = (v, { x, y }) => {
    v.x /= x;
    v.y /= y;

    return v;
};

Vec2.addScalar = (v, s) => {
    v.x += s;
    v.y += s;

    return v;
};

Vec2.subScalar = (v, s) => {
    v.x -= s;
    v.y -= s;

    return v;
};

Vec2.mulScalar = (v, s) => {
    v.x *= s;
    v.y *= s;

    return v;
};

Vec2.divScalar = (v, s) => {
    v.x /= s;
    v.y /= s;

    return v;
};

Vec2.angle = v => Math.atan2(-v.y, -v.x) + PI;

Vec2.calcLength = v => Math.sqrt(v.x * v.x + v.y * v.y);

Vec2.equals = (v, v2) => ((v.x === v2.x) && (v.y === v2.y));

Vec2.dot = (v, v2) => v.x * v2.x + v.y * v2.y;

Vec2.cross = (v, v2) => v.x * v2.y - v.y * v2.x;

Vec2.lerp = (v, { x, y }, alpha) => {
    v.x += (x - v.x) * alpha;
    v.y += (y - v.y) * alpha;

    return v;
};

Vec2.normalize = v => {
    Vec2.divScalar(v, Vec2.calcLength(v) || 1);

    return v;
};

Vec2.distance = (v, v2) => pointDistance(v.x, v.y, v2.x, v2.y);
