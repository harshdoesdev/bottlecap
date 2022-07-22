/** @module Game */
/**
 * Main class, representing the current Game state
 */
export default class Game {
    /**
     * Kickstart the game
     */
    run(): void;
    running: boolean;
    _lastStep: number;
    _frameRequest: number;
    stop(): void;
    /**
     * @ignore
     * Internal function called on each frame.
     */
    step(): void;
    /**
     * Called at start to initialize game states.
     */
    init(): void;
    /**
     * Called on each frame to update game states.
     * @param {number} dt  time since last update
     */
    update(dt: number): void;
    /**
     * Called on each frame to render the game.
     */
    render(): void;
}
