import { el } from "./dom.js";

export const createCanvas = (opts = {}) => {

    const cnv = el('canvas'); // canvas
    
    const ctx = cnv.getContext('2d'); // context

    cnv.width = opts.width || 400; // set width

    cnv.height = opts.height || 400; // set height

    cnv.style.background = opts.background || 'black'; // change background

    return { 
      
      cnv, // canvas element
      
      ctx, // 2d context

      clearCanvas: () => ctx.clearRect(0, 0, cnv.width, cnv.height)
    
    };

};
