/** @module Vec2 */
import { pointDistance } from "./math.js";
/**
 * Vec2 - Create Vector and Perform Basic Vector Math
 */
export default class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    static zero() {
        return new Vec2();
    }
    static create(x, y) {
        return new Vec2(x, y);
    }
    static clone({ x, y }) {
        return Vec2.create(x, y);
    }
    static copy(v, v2) {
        return Object.assign(v, v2);
    }
    static set(v, x, y) {
        v.x = x != null ? x : v.x;
        v.y = y != null ? y : v.y;
        return v;
    }
    static add(v, { x, y }) {
        v.x += x;
        v.y += y;
        return v;
    }
    static sub(v, { x, y }) {
        v.x -= x;
        v.y -= y;
        return v;
    }
    static mul(v, { x, y }) {
        v.x *= x;
        v.y *= y;
        return v;
    }
    static div(v, { x, y }) {
        v.x /= x;
        v.y /= y;
        return v;
    }
    static addScalar(v, s) {
        v.x += s;
        v.y += s;
        return v;
    }
    static subScalar(v, s) {
        v.x -= s;
        v.y -= s;
        return v;
    }
    static mulScalar(v, s) {
        v.x *= s;
        v.y *= s;
        return v;
    }
    static divScalar(v, s) {
        v.x /= s;
        v.y /= s;
        return v;
    }
    static angle(v) {
        return Math.atan2(-v.y, -v.x) + PI;
    }
    static calcLength(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }
    static equals(v, v2) {
        return ((v.x === v2.x) && (v.y === v2.y));
    }
    static dot(v, v2) {
        return v.x * v2.x + v.y * v2.y;
    }
    static cross(v, v2) {
        return v.x * v2.y - v.y * v2.x;
    }
    static lerp(v, { x, y }, alpha) {
        v.x += (x - v.x) * alpha;
        v.y += (y - v.y) * alpha;
        return v;
    }
    static normalize(v) {
        Vec2.divScalar(v, Vec2.calcLength(v) || 1);
        return v;
    }
    static distance(v, v2) {
        return pointDistance(v.x, v.y, v2.x, v2.y);
    }
}
