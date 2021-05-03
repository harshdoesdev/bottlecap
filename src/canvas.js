export const createCanvas = ({ width = 400, height = 400, background = 'black' } = {}) => {

    const cnv = document.createElement('canvas'), ctx = cnv.getContext('2d'); // canvas and context

    cnv.width = width; // set width

    cnv.height = height; // set height

    cnv.style.background = background; // change background style using css

    return { 
      
      cnv, // canvas element
      
      ctx, // 2d context

      clearCanvas: () => ctx.clearRect(0, 0, cnv.width, cnv.height)
    
    };

};
