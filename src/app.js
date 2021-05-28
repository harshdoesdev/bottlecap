export const startApp = async (app, fps = 30) => {
    
    await app.init(); // wait till the async function finishes
    
    let delay = 1000 / fps,

        time = null,
    
        frame = -1;

    const loop = timestamp => {

        if (time === null) time = timestamp; 
        
        let seg = Math.floor((timestamp - time) / delay);
        
        if (seg > frame) {
            
            frame = seg;
            
            app.update(timestamp, frame); // call the update function at a fix rate
        
        }

        app.render(); // call the render function at a rate fixed by the browser

        requestAnimationFrame(loop);
    
    };

    requestAnimationFrame(loop);

};
