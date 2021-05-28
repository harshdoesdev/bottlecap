export const startApp = (app, fps = 30) => {

    let delay = 1000 / fps,

        time = null,
    
        frame = -1;

    const loop = timestamp => {

        if (time === null) time = timestamp; 
        
        let seg = Math.floor((timestamp - time) / delay);
        
        if (seg > frame) {
            
            frame = seg;
            
            app.update(timestamp, frame);
        
        }

        app.render();

        requestAnimationFrame(loop);
    
    };

    requestAnimationFrame(loop);

};
