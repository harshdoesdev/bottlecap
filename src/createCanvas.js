export const createCanvas = (width = 256, height = 256, bg = '#000') => {

  const cnv = document.createElement('canvas'),
        ctx = cnv.getContext('2d');

  cnv.width = width;

  cnv.height = height;

  cnv.style.background = bg;

  return { cnv, ctx };

};