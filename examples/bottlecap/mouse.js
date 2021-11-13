import { on } from "./dom.js";

export const Mouse = {
    x: 0,
    y: 0,
    isDown: false
};

/**
 * Convert screen coordinates into canvas coordinates.
 * example: const adjMouse = screenToCanvas(cnv, Mouse.x, Mouse.y); // { x, y }
 */
export const screenToCanvas = (cnv, x, y) => {

  const rect = cnv.getBoundingClientRect(), // abs. size of element
        
        scaleX = cnv.width / rect.width,    // relationship bitmap vs. element for X
        
        scaleY = cnv.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    
    x: (x - rect.left) * scaleX,   // scale mouse coordinates after they have
    
    y: (y - rect.top) * scaleY     // been adjusted to be relative to element
  
  }

};

const handleMouse = ({ clientX, clientY, type }) => {
    Mouse.x = clientX;
    Mouse.y = clientY;
    Mouse.isDown = type === 'mousedown';
};

const handleMouseMove = ({ clientX, clientY }) => {
    Mouse.x = clientX;
    Mouse.y = clientY;
};

on(window, 'mousedown', handleMouse);
on(window, 'mouseup', handleMouse);
on(window, 'mousemove', handleMouseMove);
