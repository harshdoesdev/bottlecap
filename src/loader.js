import EventEmitter from "./emitter.js";
import { audioContext } from "./sound.js";

const loadImage = (name, src) => {

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

const loadSound = async (name, src) => {

    try {
    
        const response = await fetch(src);
    
        const arrayBuffer = await response.arrayBuffer();
    
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
        return { type: 'sound', name, value: audioBuffer };
    
    } catch {

        throw new Error(`Couldn't Load Sound "${name}".`);
    
    }

};

const loadJSON = async (name, src) => {

    const res = await fetch(src);

    if (!res.ok) {

        throw new Error(`Couldn't load the JSON file "${name}".`);

    }

    const value = await res.json();

    return { name, type: 'json', value };

};

export default class AssetLoader extends EventEmitter {

    constructor() {
        super();
        this.queue = new Set;
        this.assets = {};
        this.numLoaded = 0;
        this.numFailed = 0;
    }

    get progress() {
        return (this.numLoaded + this.numFailed) / this.queue.size * 100;
    }

    addImage(name, src) {
        this.queue.add(() => loadImage(name, src));
    }

    addSound(name, src) {
        this.queue.add(() => loadSound(name, src));
    }

    addJSON(name, src) {
        this.queue.add(() => loadJSON(name, src));
    }

    load() {
        this.queue.forEach(load =>
            load()
                .then(item => {
                    const { name, type, value } = item;
                    this.numLoaded++;
                    this.emit('load', item);
                    if(!this.assets[type]) {
                        this.assets[type] = new Map;
                    }
                    this.assets[type].set(name, value);
                })
                .catch(e => {
                    this.numFailed++;
                    this.emit('error', e);
                })
                .finally(() => {
                    const progress = this.progress;
                    this.emit('progress', this.progress)
                    if(progress === 100) { // everything loaded ( or failed ;) )
                        this.emit('complete', this.assets);
                        this.queue.clear(); // clear the queue
                    }
                })
        );
    }

}
