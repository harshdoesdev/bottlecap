export const createCanvas = (width = 256, height = 256, bg = '#000') => {

  const cnv = document.createElement('canvas'),
        ctx = cnv.getContext('2d');

  cnv.width = width;

  cnv.height = height;

  cnv.style.background = bg;

  return { cnv, ctx };

};

export const clearCanvas = ctx => {
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

};

// converts screen point to canvas point

export const screenToCanvas = (cnv, x, y) => {

  const rect = cnv.getBoundingClientRect(), // abs. size of element
        
        scaleX = cnv.width / rect.width,    // relationship bitmap vs. element for X
        
        scaleY = cnv.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    
    x: (x - rect.left) * scaleX,   // scale mouse coordinates after they have
    
    y: (y - rect.top) * scaleY     // been adjusted to be relative to element
  
  }

};