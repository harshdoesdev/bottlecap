// image / spritesheet loader

/*

const playerSprite = await loadImage('./playerSprite.png');

returns Image

*/

export const loadImage = (name, src) => {

    return new Promise((resolve, reject) => {

        const img = new Image();

        img.crossOrigin = 'Anonymous';

        img.onload = () => resolve({
            name,
            value: img,
            type: 'image'
        });

        img.onerror = e => reject(new Error(`Couldn't Load Image "${name}".`));

        img.src = src;

    });

};

/*

Loads sounds

*/

export const loadSound = (name, src) => {

    return new Promise((resolve, reject) => {

        const sound = new Audio();

        sound.oncanplaythrough = () => resolve({
            name,
            value: sound,
            type: 'sound'
        });

        sound.onerror = () => reject(new Error(`Couldn't Load Sound "${name}".`));

        sound.src = src;

    });

};

// load JSON file

// const lvl1 = await loadJSON('./lvl1.json');

export const loadJSON = async (name, src) => {

    const res = await fetch(src);

    if (!res.ok) {

        throw new Error(`Couldn't load the JSON file "${name}".`);

    }

    const value = await res.json();

    return { name, type: 'json', value };

};

// loadAll, for loading multiple assets at once
// inspired by https://github.com/rgruesbeck/game-asset-loader
// kudos to @rgruesbeck

export const loadAll = (list, onProgress, onError) => {

    let numLoaded = 0, total = list.length;

    for(let i = 0; i < total; i++) {

        list[i].then(asset => {

            numLoaded++;

            onProgress(numLoaded / total * 100, asset);

        });

    }

    return Promise.all(list).then(loaded => {

        return loaded.reduce((assets, { name, value, type }) => {

            if(!assets[type]) {
                assets[type] = new Map;
            }

            assets[type].set(name, value);

            return assets;

        }, {});

    });

};
