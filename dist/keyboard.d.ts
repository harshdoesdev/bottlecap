export default class Keyboard {
    /**
     * check if a key is down
     * @param {string} key
     */
    static keyDown(key: string): boolean;
    /**
     * get direction for movement of player
     * @return {direction}
     * @example
     * update(dt) {
     *    const direction = Keyboard.getDirection();
     *    player.x += direction.x * player.speed;
     *    player.y += direction.y * player.speed;
     * }
     */
    static getDirection(): direction;
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
