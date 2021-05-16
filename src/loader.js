import { audioContext } from "./sound.js";

export const loadImage = (name, src) => {

    return new Promise((resolve, reject) => {

        const img = new Image();

        img.crossOrigin = "Anonymous";

        img.onload = () => resolve({ type: 'image', name, value: img });

        img.onerror = () => reject(new Error(`Could'nt Load Image "${src}"`));

        img.src = src;

    });

};

export const loadSound = async (name, src) => {

    try {
    
        const response = await fetch(src);
    
        const arrayBuffer = await response.arrayBuffer();
    
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        return { type: 'sound', name, value: audioBuffer };
    
    } catch {

        throw new Error(`Couldn't Load Sound ${src}.`);
    
    }

};

export const loadJSON = async (name, src) => {

    const res = await fetch(src);

    if (!res.ok) {

        throw new Error(`Couldn't load the JSON file "${name}".`)

    }

    const value = await res.json();

    return { type: 'json', name, value };

};

export const loadAll = (list, onProgress) => {

    let loaded = 0, total = list.length;

    for(let i = 0; i < total; i++) {

        list[i].then(asset => {

            loaded++;

            onProgress && onProgress(loaded / total * 100, asset);

        });

    }

    return Promise.all(list);

};

export const createAssetMap = list => list.reduce((assets, { name, type, value }) => {

    if(!assets[type]) {
        assets[type] = new Map;
    }

    assets[type].set(name, value);

    return assets;

}, {});
