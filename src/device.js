/* device.js */

/**
 * @return {boolean} true if the device have touch screen capabilities
 */
export const isTouchscreen = () => 'ontouchstart' in document.documentElement;

/**
 * @return {boolean} true if the browser supports gamepads
 */
export const gamepadAvailable = () => !!(navigator && navigator.getGamepads);
