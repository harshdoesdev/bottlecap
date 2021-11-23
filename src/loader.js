import Sound, { audioCtx, soundMixer } from './sound.js'; 

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

    const sound = new Sound(soundMixer, audioBuffer);

    return { type: ASSET_TYPE_SOUND, name, value: sound };

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
