/** @module Canvas */
/**
 * Initialize a new Canvas
 * @param {number} width
 * @param {number} height
 * @param {string} background - background color
 */
export const createCanvas = (width = 400, height = 400, background) => {
    const canvas = document.createElement('canvas'); // canvas
    canvas.width = width; // set width
    canvas.height = height; // set height
    if (background) {
        canvas.style.background = background; // change background
    }
    return canvas;
};
