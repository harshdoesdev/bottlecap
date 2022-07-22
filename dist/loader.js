/** @module Loader */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Emitter from './emitter.js';
import { getAudioCtx } from './sound.js';
export const ASSET_TYPES = {
    IMAGE: 'image',
    SOUND: 'sound',
    JSON: 'json'
};
/**
 * Asset Reducer
 */
const reduceAssets = (assets, { name, type, value }) => {
    if (!assets[type]) {
        assets[type] = {};
    }
    assets[type][name] = value;
    return assets;
};
/**
 * Resource Loader
 */
export class ResourceLoader {
    /**
     * Asynchronously load an image from URL
     * @param {string} name - ressource id
     * @param {string} src - ressource URL
     */
    static image(name, src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => resolve({ type: ASSET_TYPES.IMAGE, name, value: img });
            img.onerror = () => reject(new Error(`Couldn't load Image: ${src}`));
            img.src = src;
        });
    }
    /**
     * Asynchronously load a sound file from URL
     * @param {string} name - ressource id
     * @param {string} src - ressource URL
     */
    static sound(name, src) {
        return __awaiter(this, void 0, void 0, function* () {
            const audioCtx = getAudioCtx();
            const res = yield fetch(src);
            if (!res.ok) {
                throw new Error(`Couldn't Load Sound: ${src}`);
            }
            const arrayBuffer = yield res.arrayBuffer();
            const audioBuffer = yield audioCtx.decodeAudioData(arrayBuffer);
            return { type: ASSET_TYPES.SOUND, name, value: audioBuffer };
        });
    }
    /**
     * Asynchronously load a sound file from URL
     * @param {string} name - ressource id
     * @param {string} src - ressource URL
     */
    static JSON(name, src) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(src);
            if (!res.ok) {
                throw new Error(`Couldn't load the JSON file: ${src}`);
            }
            const json = yield res.json();
            return { type: ASSET_TYPES.JSON, name, value: json };
        });
    }
    /**
     * Load Multiple Assets at Once
     * @param {array} - Array of load Promises
     * @return {object} - Loaded assets are mapped to this object categorically
     */
    static loadAll(loadPromises) {
        return __awaiter(this, void 0, void 0, function* () {
            const loadedAssets = yield Promise.all(loadPromises);
            const reducedAssets = loadedAssets.reduce(reduceAssets);
            return reducedAssets;
        });
    }
}
const createLoadPromise = ({ name, type, src }) => {
    switch (type) {
        case ASSET_TYPES.IMAGE:
            return loadImage(name, src);
        case ASSET_TYPES.SOUND:
            return loadSound(name, src);
        case ASSET_TYPES.JSON:
            return loadJSON(name, src);
        default:
            throw new Error(`Unknown Asset Type: "${type}"`);
    }
};
/**
 * A Basic Asset Loader
 */
export default class Loader extends Emitter {
    constructor() {
        this.queue = [];
        this.loading = false;
    }
    /**
     * enqueue an asset
     * @param {string} name - name of asset
     * @param {string} src - src of asset
     * @param {string} type - type of asset
     */
    enqueue(name, src, type) {
        if (this.loading) {
            throw new Error(`Can't Enqueue Assets While The Loader is Loading.`);
        }
        this.queue.push({ name, type, src });
    }
    /**
     * add image to the queue
     * @param {string} name - name of image
     * @param {string} src - source of image
     */
    addImage(name, src) {
        this.enqueue(name, src, ASSET_TYPES.IMAGE);
        return this;
    }
    /**
     * add sound to queue
     * @param {string} name - name of sound
     * @param {string} src - source of sound
     */
    addSound(name, src) {
        this.enqueue(name, src, ASSET_TYPES.SOUND);
        return this;
    }
    /**
     * add json file to queue
     * @param {string} name - name of json file
     * @param {string} src - source of json file
     */
    addJSON(name, src) {
        this.enqueue(name, src, ASSET_TYPES.JSON);
        return this;
    }
    /**
     * clears the queue
     */
    clearQueue() {
        while (this.queue.length) {
            this.queue.pop();
        }
    }
    /**
     * reset the loader
     */
    reset() {
        this.clearQueue();
        this.loading = false;
    }
    /**
     * Start Loading
     */
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.loading) {
                console.error('Loader is already loading.');
                return;
            }
            this.loading = true;
            const loadPromises = this.queue.map(createLoadPromise);
            try {
                const assets = yield loadAll(loadPromises);
                this.emit('load', assets);
            }
            catch (e) {
                this.emit('error', e);
            }
            finally {
                this.reset();
            }
        });
    }
}
