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

  const R = [];
    
  for (let i = 0; i < arr.length; i += chunkSize) {
    
    R.push(arr.slice(i, i + chunkSize));

  }
    
  return R;

};
