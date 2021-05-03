export const createCanvas = (width, height, bg = '#000') => {

  const cnv = document.createElement('canvas'), ctx = cnv.getContext('2d');

  cnv.width = width || window.innerWidth;

  cnv.height = height || window.innerHeight;

  cnv.style.background = bg;

  return { 
    
    cnv, // canvas element

    ctx, // 2d context

    clearCanvas: () => ctx.clearRect(0, 0, cnv.width, cnv.height)
  
  };

};
