/* utils.js */

import Vec2 from "./vec2.js";

const MOUSE = Vec2.create();

// get exact mouse position

export const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;    // relationship bitmap vs. element for X
  const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

  Vec2.set(MOUSE, (evt.clientX - rect.left) * scaleX, (evt.clientY - rect.top) * scaleY);
  
  return MOUSE;
};

// random stuff

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
