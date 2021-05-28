const audioCtx = new AudioContext();

export const loadImage = (name, src) => {

    return new Promise((resolve, reject) => {

        const img = new Image();

        img.crossOrigin = 'Anonymous';

        img.onload = () => resolve({ type: 'image', name, value: img });

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

    return { type: 'audio', name, value: audioBuffer };

};

export const loadJSON = async (name, src) => {

    const res = await fetch(src);

    if (!res.ok)
        throw new Error(`Couldn't load the JSON file: ${src}`);

    const json = await res.json();

    return { type: 'json', name, value: json };

};
