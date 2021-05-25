export const startApp = ({ load, update, render }, fps = 30) => {

    load();

    let delay = 1000 / fps,

        time = null,
    
        frame = -1;

    const loop = timestamp => {

        if (time === null) time = timestamp; 
        
        let seg = Math.floor((timestamp - time) / delay);
        
        if (seg > frame) {
            
            frame = seg;
            
            update(timestamp, frame);
        
        }

        render();

        requestAnimationFrame(loop);
    
    };

    requestAnimationFrame(loop);

};
