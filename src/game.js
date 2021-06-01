export default class Game {

    run() {
        if(this.running) 
            return;
        this.running = true;
        this.init();
        const loop = () => {
            this.step();
            this.lastStep = new Date();
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

    step() {
        const now = new Date;
        const dt = (now - this.lastStep) / 1000;
        this.lastStep = now;
        this.update(dt);
        this.render();
    }

    init() {
        console.log('Game Initialized');
    }

    update(dt) {}

    render() {}

}
