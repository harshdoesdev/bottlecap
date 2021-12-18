/* math.js */

// Math constants

export const PI = Math.PI;

export const TWO_PI = PI * 2;

export const HALF_PI = PI / 2;

// measures distance between two points
0
/**
 * Euclidean distance
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
export const pointDistance = (x1, y1, x2, y2) => {

  const dx = x1 - x2,

        dy = y1 - y2;

  return Math.sqrt(dx * dx + dy * dy);

};

// converts point to angle

/**
 * Angle from the (1, 0) direction in radians
 * @param {number} x
 * @param {number} z
 */
export const pointToAngle = (x, y) => -Math.atan2(-y, x);

/**
 * clamp num between min and max
 */
export const clamp = (num, min, max) => Math.max(min, Math.min(num, max));