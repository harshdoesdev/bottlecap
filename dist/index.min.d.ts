declare class H {
    constructor(t: any, e: any, s: any, i: any, r: any, a: any, o: any, c: any);
    ctx: any;
    spritesheet: any;
    numCol: any;
    numRow: any;
    frameWidth: number;
    frameHeight: number;
    position: n;
    size: n;
    maxFrames: number;
    currentFrame: number;
    flipX: boolean;
    flipY: boolean;
    rotation: number;
    scale: number;
    animations: any;
    currentAnimation: any;
    playing: boolean;
    time: number;
    addAnimation(t: any, e: any, s: any, i: any): H;
    play(t: any): void;
    stop(): void;
    update(t: any): void;
    render(): void;
}
declare class c {
    constructor(t: any, e?: number, s?: number, i?: number, r?: number);
    ctx: any;
    pos: n;
    target: n;
    cx: number;
    cy: number;
    attach(): void;
    detach(): void;
    update(t: any): void;
    lookAt(t: any, e: any): void;
}
declare class b {
    static circleInCircle(t: any, e: any, s: any, i: any, a: any, n: any): boolean;
    static pointInCircle(t: any, e: any, s: any, i: any, a: any): boolean;
    static rectInRect(t: any, e: any, s: any, i: any, r: any, a: any, n: any, o: any): boolean;
    static pointInRect(t: any, e: any, s: any, i: any, r: any, a: any): boolean;
    static circleInRect(t: any, e: any, s: any, i: any, r: any, a: any, n: any): boolean;
    static resolveCollision(t: any, e: any): string;
}
declare var y: Readonly<{
    __proto__: any;
    el: (t: any) => any;
    svg: (t: any) => any;
    frag: () => DocumentFragment;
    text: (t?: string) => Text;
    qs: (t: any, e?: Document) => any;
    qsa: (t: any, e?: Document) => NodeListOf<any>;
    setStyle: (t: any, e: any) => any;
    attr: (t: any, e: any, s: any) => any;
    on: (t: any, e: any, s: any) => any;
    off: (t: any, e: any, s: any) => any;
    ready: (t: any) => void;
}>;
declare class A {
    static isTouchscreen(): boolean;
    static gamepadAvailable(): boolean;
}
declare class h {
    topics: {};
    emit(t: any, ...e: any[]): void;
    hasTopic(t: any): any;
    on(t: any, e: any): () => void;
    once(t: any, e: any): () => void;
    off(t: any, e: any): void;
    destroy(): void;
}
declare class t {
    run(): void;
    running: boolean;
    _lastStep: number;
    _frameRequest: number;
    stop(): void;
    step(): void;
    init(): void;
    update(t: any): void;
    render(): void;
}
declare var a: Readonly<{
    __proto__: any;
    PI: number;
    TWO_PI: number;
    HALF_PI: number;
    pointDistance: (t: any, e: any, s: any, i: any) => number;
    pointToAngle: (t: any, e: any) => number;
    clamp: (t: any, e: any, s: any) => number;
}>;
declare class w {
    static keyDown(t: any): boolean;
    static getDirection(): n;
    static KEYS: {
        LEFT: string;
        RIGHT: string;
        UP: string;
        DOWN: string;
        SPACEBAR: string;
        ESCAPE: string;
        ENTER: string;
        CTRL: string;
        TAB: string;
        ALT: string;
        W: string;
        A: string;
        S: string;
        D: string;
        E: string;
        X: string;
        Z: string;
    };
}
declare class P extends h {
    queue: any[];
    loading: boolean;
    enqueue(t: any, e: any, s: any): void;
    addImage(t: any, e: any): P;
    addSound(t: any, e: any): P;
    addJSON(t: any, e: any): P;
    clearQueue(): void;
    reset(): void;
    load(): Promise<any>;
}
declare class N {
    static Image(t: any, e: any): any;
    static Sound(t: any, e: any): Promise<{
        type: string;
        name: any;
        value: any;
    }>;
    static JSON(t: any, e: any): Promise<{
        type: string;
        name: any;
        value: any;
    }>;
    static loadAll(t: any): Promise<any>;
}
declare class C {
    static play(t: any, e: any, s?: number, i?: boolean): any;
    static stop(t: any, e?: number): void;
    static setVolume(t: any, e: any): void;
}
declare class W {
    constructor(t: any, e: any, s: number, i: number, r: any, a: any, o: any, c: any, h: any, u: any);
    ctx: any;
    image: any;
    sourceX: number;
    sourceY: number;
    sourceWidth: any;
    sourceHeight: any;
    position: n;
    size: n;
    rotation: number;
    flipX: boolean;
    flipY: boolean;
    render(): void;
}
declare class Y {
    constructor(t: any, e: any, s: any, i?: number);
    sprite: any;
    frameStart: any;
    frameEnd: any;
    delay: number;
    frames: number[][];
    getFrame(t: any): number[];
}
declare var X: Readonly<{
    __proto__: any;
    getMousePos: (t: any, e: any) => n;
    random: (t?: number, e?: number) => number;
    randomInt: (t?: number, e?: number) => number;
    unique: (t: any) => any[];
    shuffle: (t: any) => any;
    chunk: (t: any, e: any) => any[];
}>;
declare class n {
    static zero(): n;
    static create(t: any, e: any): n;
    static clone({ x: t, y: e }: {
        x: any;
        y: any;
    }): n;
    static copy(t: any, e: any): any;
    static set(t: any, e: any, s: any): any;
    static add(t: any, { x: e, y: s }: {
        x: any;
        y: any;
    }): any;
    static sub(t: any, { x: e, y: s }: {
        x: any;
        y: any;
    }): any;
    static mul(t: any, { x: e, y: s }: {
        x: any;
        y: any;
    }): any;
    static div(t: any, { x: e, y: s }: {
        x: any;
        y: any;
    }): any;
    static addScalar(t: any, e: any): any;
    static subScalar(t: any, e: any): any;
    static mulScalar(t: any, e: any): any;
    static divScalar(t: any, e: any): any;
    static angle(t: any): any;
    static calcLength(t: any): number;
    static equals(t: any, e: any): boolean;
    static dot(t: any, e: any): number;
    static cross(t: any, e: any): number;
    static lerp(t: any, { x: e, y: s }: {
        x: any;
        y: any;
    }, i: any): any;
    static normalize(t: any): any;
    static distance(t: any, e: any): number;
    constructor(t?: number, e?: number);
    x: number;
    y: number;
}
declare function $(t: number, e: number, s: any): HTMLCanvasElement;
declare function _(): any;
declare function T(): any;
export { H as AnimatedSprite, c as Camera, b as Collision, y as DOM, A as Device, h as Emitter, t as Game, a as GameMath, w as Keyboard, P as Loader, N as ResourceLoader, C as Sound, W as Sprite, Y as SpriteAnimation, X as Utils, n as Vec2, $ as createCanvas, _ as getAudioCtx, T as getSoundMixer };
