const audioCtx = new AudioContext();

export const ASSET_TYPE_IMAGE = 'image';

export const ASSET_TYPE_AUDIO = 'audio';

export const ASSET_TYPE_JSON = 'json';

export const loadImage = (name, src) => {

    return new Promise((resolve, reject) => {

        const img = new Image();

        img.crossOrigin = 'Anonymous';

        img.onload = () => resolve({ type: ASSET_TYPE_IMAGE, name, value: img });

        img.onerror = () => reject(new Error(`Couldn't load Image: ${src}`));

        img.src = src;

    });

};

export const loadAudio = async (name, src) => {

    const res = await fetch(src);

    if (!res.ok)
        throw new Error(`Couldn't Load Audio: ${src}`);

    const arrayBuffer = await res.arrayBuffer();

    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    return { type: ASSET_TYPE_AUDIO, name, value: audioBuffer };

};

export const loadJSON = async (name, src) => {

    const res = await fetch(src);

    if (!res.ok)
        throw new Error(`Couldn't load the JSON file: ${src}`);

    const json = await res.json();

    return { type: ASSET_TYPE_JSON, name, value: json };

};
