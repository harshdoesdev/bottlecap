/* device.js */

/**
 * @return {boolean} true if the device have touch screen capabilities
 */
export const isTouchscreen = () => 'ontouchstart' in document.documentElement;
