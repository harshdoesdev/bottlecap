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
        
        this.__showBanner = true; // Make this false if you dont want to show the "Made with bottlecap.js" banner in the console.
        
        if(this.__showBanner) {
            console.log(
                "%c%s", 
                "color: #1abc9c; font-weight: bold", 
                "Made with bottlecap.js"
            );   
        }
        
        this.init();

        this.lastStep = performance.now();
    
        const loop = () => {
            this.step();
            this.lastStep = performance.now();
            this.frameRequest = requestAnimationFrame(loop);
        }
    
        requestAnimationFrame(loop);
    
    }

    stop() {
        if(this.frameRequest)
            cancelAnimationFrame(this.frameRequest);
        this.frameRequest = null;
        this.running = false;
    }

    /**
     * @ignore
     * Internal function called on each frame.
     */
    step() {
        const now = performance.now();
        const dt = (now - this.lastStep) / 1000;
        this.lastStep = now;
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
