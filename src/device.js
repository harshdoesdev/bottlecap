/* device.js */

export default class Device {
    
    /**
     * @return {boolean} true if the device have touch screen capabilities
     */
    static isTouchscreen() {
        return !!('ontouchstart' in document.documentElement);
    }

    /**
     * @return {boolean} true if the browser supports gamepads
     */
    static gamepadAvailable() {
        return !!(navigator && navigator.getGamepads);
    }

}