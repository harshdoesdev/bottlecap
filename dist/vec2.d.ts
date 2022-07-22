/**
 * Vec2 - Create Vector and Perform Basic Vector Math
 */
export default class Vec2 {
    static zero(): Vec2;
    static create(x: any, y: any): Vec2;
    static clone({ x, y }: {
        x: any;
        y: any;
    }): Vec2;
    static copy(v: any, v2: any): any;
    static set(v: any, x: any, y: any): any;
    static add(v: any, { x, y }: {
        x: any;
        y: any;
    }): any;
    static sub(v: any, { x, y }: {
        x: any;
        y: any;
    }): any;
    static mul(v: any, { x, y }: {
        x: any;
        y: any;
    }): any;
    static div(v: any, { x, y }: {
        x: any;
        y: any;
    }): any;
    static addScalar(v: any, s: any): any;
    static subScalar(v: any, s: any): any;
    static mulScalar(v: any, s: any): any;
    static divScalar(v: any, s: any): any;
    static angle(v: any): any;
    static calcLength(v: any): number;
    static equals(v: any, v2: any): boolean;
    static dot(v: any, v2: any): number;
    static cross(v: any, v2: any): number;
    static lerp(v: any, { x, y }: {
        x: any;
        y: any;
    }, alpha: any): any;
    static normalize(v: any): any;
    static distance(v: any, v2: any): number;
    constructor(x?: number, y?: number);
    x: number;
    y: number;
}
