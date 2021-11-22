/* device.js */

/**
 * @return {boolean} true if the device have touch screen capabilities
 */
export const isTouchscreen = () => 'ontouchstart' in document.documentElement;

export const gamepadAvailable = () => !!(navigator && navigator.getGamepads);
