import { el } from "./dom.js";

export const createCanvas = (width = 400, height = 400, background = '#000') => {

    const cnv = el('canvas'); // canvas
    
    const ctx = cnv.getContext('2d'); // context

    cnv.width = width; // set width

    cnv.height = height; // set height

    cnv.style.background = background; // change background

    return { 
      
      cnv, // canvas element
      
      ctx, // 2d context

      clearCanvas: () => ctx.clearRect(0, 0, cnv.width, cnv.height)
    
    };

};
