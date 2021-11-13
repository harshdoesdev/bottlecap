/* utils.js */

// number stuff

/**
 * clamp num between min and max
 */
export const clamp = (num, min, max) => Math.max(min, Math.min(num, max));

/**
 * return a random float between min and max
 */
export const random = (min = 0, max = 1) => Math.random() * (max - min) + min;

/**
 * return a random integer between min and max
 */
export const randomInt = (min = 0, max = 1) => {

  min = Math.ceil(min);

  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;

};

// array stuff

/**
 * Copy the array without duplicates
 */
export const unique = arr => [...new Set(arr)];

/**
 * Randomly shufflet elements of an array in place.
 */
export const shuffle = arr => arr.sort(() => Math.random() - 0.5);

/**
 * Split an array into chunks of constant sizes.
 */
export const chunk = (arr, chunkSize) => {

  const chunks = [];
    
  for (let i = 0; i < arr.length; i += chunkSize) {
    
    chunks.push(arr.slice(i, i + chunkSize));

  }
    
  return chunks;

};
