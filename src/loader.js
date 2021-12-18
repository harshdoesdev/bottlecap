import { audioCtx } from './sound.js'; 

export const ASSET_TYPE_IMAGE = 'image';

export const ASSET_TYPE_SOUND = 'sound';

export const ASSET_TYPE_JSON = 'json';

/**
 * Asynchronously load an image from URL
 * @param {string} name - ressource id
 * @param {string} src - ressource URL
 */
export const loadImage = (name, src) => {

    return new Promise((resolve, reject) => {

        const img = new Image();

        img.crossOrigin = 'Anonymous';

        img.onload = () => resolve({ type: ASSET_TYPE_IMAGE, name, value: img });

        img.onerror = () => reject(new Error(`Couldn't load Image: ${src}`));

        img.src = src;

    });

};

/**
 * Asynchronously load a sound file from URL
 * @param {string} name - ressource id
 * @param {string} src - ressource URL
 */
export const loadSound = async (name, src) => {

    const res = await fetch(src);

    if (!res.ok)
        throw new Error(`Couldn't Load Sound: ${src}`);

    const arrayBuffer = await res.arrayBuffer();

    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    return { type: ASSET_TYPE_SOUND, name, value: audioBuffer };

};

/**
 * Asynchronously load a JSON file from URL
 * @param {string} name - ressource id
 * @param {string} src - ressource URL
 */
export const loadJSON = async (name, src) => {

    const res = await fetch(src);

    if (!res.ok)
        throw new Error(`Couldn't load the JSON file: ${src}`);

    const json = await res.json();

    return { type: ASSET_TYPE_JSON, name, value: json };

};

const reduceAssets = loadedAssets => {

    return loadedAssets.reduce((assets, { name, type, value }) => {
    
        if(!assets[type]) {
            assets[type] = {};
        }
        
        assets[type][name] = value;
        
        return assets;
    
    }, {});

};

/*
 * Load Multiple Assets at Once
 * @param {array} - Array of load Promises
 * @return {object} - Loaded assets are mapped to this object categorically
 */
export const loadAll = async loadPromises => {
    
    const loadedAssets = await Promise.all(loadPromises);
    
    const reducedAssets = reduceAssets(loadedAssets);
    
    return reducedAssets;
    
};

/**
 * A Basic Asset Loader
 */
export default class Loader {

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
        this.queue.push({ name, type, src });
    }

    /**
     * add image to the queue
     * @param {string} name - name of image
     * @param {string} src - source of image
     */
    addImage(name, src) {
        this.enqueue(name, src, ASSET_TYPE_IMAGE);

        return this;
    }

    /**
     * add sound to queue
     * @param {string} name - name of sound
     * @param {string} src - source of sound
     */
    addSound(name, src) {
        this.enqueue(name, src, ASSET_TYPE_SOUND);

        return this;
    }

    /**
     * add json file to queue
     * @param {string} name - name of json file
     * @param {string} src - source of json file
     */
    addJSON(name, src) {
        this.enqueue(name, src, ASSET_TYPE_JSON);

        return this;
    }

    /**
     * clears the queue
     */
    clearQueue() {
        while(this.queue.length) {
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
     * 
     * @param {function} onComplete - called when loading complete
     * @param {function} onError - called even if a single asset load fails
     */
    load(onComplete, onError) {
        if(this.loading)
            return;

        this.loading = true;

        const loadPromises = this.queue.map(({ name, type, src }) => {
            switch(type) {
                case ASSET_TYPE_IMAGE:
                    return loadImage(name, src);
                case ASSET_TYPE_SOUND:
                    return loadSound(name, src);
                case ASSET_TYPE_JSON:
                    return loadJSON(name, src);
            }
        });

        loadAll(loadPromises)
            .then(onComplete)
            .catch(onError)
            .finally(() => {
                this.reset();
            });

    }

}
