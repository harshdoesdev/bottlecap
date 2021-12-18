/**
 * Main class, representing the current Game state
 */
export default class Game {

    /**
     * Kickstart the game
     */
    run() {
        
        if(this.running) 
            return;
        
        this.running = true;
        
        console.log(
            "%c%s", 
            "color: #1abc9c; font-weight: bold", 
            "Made with bottlecap.js"
        );
        
        this.init();

        this._lastStep = performance.now();
    
        const loop = () => {
            this.step();
            this._lastStep = performance.now();
            this._frameRequest = requestAnimationFrame(loop);
        }
    
        requestAnimationFrame(loop);
    
    }

    stop() {
        if(this._frameRequest)
            cancelAnimationFrame(this._frameRequest);
        this._frameRequest = null;
        this.running = false;
    }

    /**
     * @ignore
     * Internal function called on each frame.
     */
    step() {
        const now = performance.now();
        const dt = (now - this._lastStep) / 1000;
        this._lastStep = now;
        this.update(dt);
        this.render();
    }

    /**
     * Called at start to initialize game states.
     */
    init() {
        console.log('Game Initialized');
    }

    /**
     * Called on each frame to update game states.
     * @param {number} dt  time since last update
     */
    update(dt) {}

    /**
     * Called on each frame to render the game.
     */
    render() {}

}
