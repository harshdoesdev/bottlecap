/* math.js */

// measures distance between two points

export const pointDistance = (x1, y1, x2, y2) => {

  const dx = x1 - x2,

        dy = y1 - y2;

  return Math.sqrt(dx * dx + dy * dy);

};

// converts point to angle

export const pointToAngle = (x, y) => -Math.atan2(-y, x);