export namespace ASSET_TYPES {
    const IMAGE: string;
    const SOUND: string;
    const JSON: string;
}
/**
 * Resource Loader
 */
export class ResourceLoader {
    /**
     * Asynchronously load an image from URL
     * @param {string} name - ressource id
     * @param {string} src - ressource URL
     */
    static image(name: string, src: string): Promise<any>;
    /**
     * Asynchronously load a sound file from URL
     * @param {string} name - ressource id
     * @param {string} src - ressource URL
     */
    static sound(name: string, src: string): Promise<{
        type: string;
        name: string;
        value: any;
    }>;
    /**
     * Asynchronously load a sound file from URL
     * @param {string} name - ressource id
     * @param {string} src - ressource URL
     */
    static JSON(name: string, src: string): Promise<{
        type: string;
        name: string;
        value: any;
    }>;
    /**
     * Load Multiple Assets at Once
     * @param {array} - Array of load Promises
     * @return {object} - Loaded assets are mapped to this object categorically
     */
    static loadAll(loadPromises: any): object;
}
/**
 * A Basic Asset Loader
 */
export default class Loader extends Emitter {
    queue: any[];
    loading: boolean;
    /**
     * enqueue an asset
     * @param {string} name - name of asset
     * @param {string} src - src of asset
     * @param {string} type - type of asset
     */
    enqueue(name: string, src: string, type: string): void;
    /**
     * add image to the queue
     * @param {string} name - name of image
     * @param {string} src - source of image
     */
    addImage(name: string, src: string): Loader;
    /**
     * add sound to queue
     * @param {string} name - name of sound
     * @param {string} src - source of sound
     */
    addSound(name: string, src: string): Loader;
    /**
     * add json file to queue
     * @param {string} name - name of json file
     * @param {string} src - source of json file
     */
    addJSON(name: string, src: string): Loader;
    /**
     * clears the queue
     */
    clearQueue(): void;
    /**
     * reset the loader
     */
    reset(): void;
    /**
     * Start Loading
     */
    load(): Promise<void>;
}
import Emitter from "./emitter.js";
