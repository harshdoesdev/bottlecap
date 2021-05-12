export const createCanvas = (opts = {}) => {

    const { width = 400, height = 400, background = 'black', imageSmoothingEnabled = true } = opts;

    const cnv = document.createElement('canvas'); // canvas
    
    const ctx = cnv.getContext('2d'); // context

    cnv.width = width; // set width

    cnv.height = height; // set height

    cnv.style.background = background; // change background style using css

    ctx.imageSmoothingEnabled = imageSmoothingEnabled;

    return { 
      
      cnv, // canvas element
      
      ctx, // 2d context

      clearCanvas: () => ctx.clearRect(0, 0, cnv.width, cnv.height)
    
    };

};
