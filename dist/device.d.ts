/** @module Device */
/**
 * Basic Device Info
 */
export default class Device {
    /**
     * @return {boolean} true if the device have touch screen capabilities
     */
    static isTouchscreen(): boolean;
    /**
     * @return {boolean} true if the browser supports gamepads
     */
    static gamepadAvailable(): boolean;
}
