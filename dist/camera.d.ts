/**
 * Camera - Basic PointLocked Camera
 */
export default class Camera {
    /**
     * @param {CanvasRenderingContext2D} ctx - current canvas context
     * @param {number} x - initial point to look at (x)
     * @param {number} y - initial point to look at (y)
     * @param {number} dx - offset from screen center (x)
     * @param {number} dy - offset from screen center (y)
     */
    constructor(ctx: CanvasRenderingContext2D, x?: number, y?: number, dx?: number, dy?: number);
    ctx: CanvasRenderingContext2D;
    pos: Vec2;
    target: Vec2;
    cx: number;
    cy: number;
    /**
     * Start rendering through this camera
     */
    attach(): void;
    /**
     * Stop rendering through this camera
     */
    detach(): void;
    /**
     * update the camera
     * @param {*} dt
     */
    update(dt: any): void;
    /**
     * Move the focus point of the camera
     * @param {number} x - where to look
     * @param {number} y - where to look
     */
    lookAt(x: number, y: number): void;
}
import Vec2 from "./vec2.js";
