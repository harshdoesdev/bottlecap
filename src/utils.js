/* utils.js */

// number stuff

export const clamp = (num, min, max) => Math.max(min, Math.min(num, max));

export const random = (min = 0, max = 1) => Math.random() * (max - min) + min;

export const randomInt = (min = 0, max = 1) => {

  min = Math.ceil(min);

  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;

};

// array stuff

export const unique = arr => [...new Set(arr)];

export const shuffle = arr => arr.sort(() => Math.random() - 0.5);

export const chunk = (arr, chunkSize) => {

  const chunks = [];
    
  for (let i = 0; i < arr.length; i += chunkSize) {
    
    chunks.push(arr.slice(i, i + chunkSize));

  }
    
  return chunks;

};

// other stuff

export const screenToCanvas = (cnv, x, y) => {

  const rect = cnv.getBoundingClientRect(), // abs. size of element
        
        scaleX = cnv.width / rect.width,    // relationship bitmap vs. element for X
        
        scaleY = cnv.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    
    x: (x - rect.left) * scaleX,   // scale mouse coordinates after they have
    
    y: (y - rect.top) * scaleY     // been adjusted to be relative to element
  
  }

};
