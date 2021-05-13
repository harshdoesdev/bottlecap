import EventEmitter from "./emitter.js";
import { audioContext } from "./sound.js";

const loadImage = (name, src) => {

    return new Promise(resolve => {

        const img = new Image();

        const result = {
            name,
            value: img,
            type: 'image'
        };

        img.crossOrigin = 'Anonymous';

        img.onload = () => resolve({ result });

        img.onerror = err => resolve({ 
            result, 
            error: new Error(`Couldn't load image "${name}"`)
        });

        img.src = src;

    });

};

const loadSound = async (name, src) => {

    const result = {
        name,
        value: null,
        type: 'sound'
    };

    try {
    
        const response = await fetch(src);
    
        const arrayBuffer = await response.arrayBuffer();
    
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
        result.value = audioBuffer;

        return { result };
    
    } catch(err) {

        result.value = audioContext.createBuffer(1, 1, 22050);

        return { result, error: new Error(`Couldn't Load Sound "${name}".`) };
    
    }

};

const loadJSON = async (name, src) => {

    const res = await fetch(src);

    const result = {
        value: null,
        type: 'json',
        name
    };

    if (!res.ok) {

        return {
            
            result,

            error: new Error(`Couldn't load the JSON file "${name}".`)
        
        };

    }

    result.value = await res.json();

    return result;

};

export default class AssetLoader extends EventEmitter {

    constructor() {
        super();
        this.queue = new Set;
        this.assets = {};
        this.loaded = 0;
        this.failed = 0;
    }

    get progress() {
        return (this.loaded + this.failed) / this.queue.size * 100;
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
            
                .then(({ result, error }) => {

                    if(error) {
                        
                        this.failed++;
                        
                        this.emit('error', error);
                    
                    } else {
                    
                        this.loaded++;
                    
                        this.emit('load', result);
                    
                    }
                    
                    const { name, type, value } = result;
                    
                    if(!this.assets[type]) {
                        this.assets[type] = new Map;
                    }
                    
                    this.assets[type].set(name, value);
                    
                })
            
                .finally(() => {

                    const progress = this.progress;
                    
                    this.emit('progress', progress)
                    
                    if(progress === 100) { // everything loaded ( or failed ;) )
                    
                        this.emit('complete', this.assets);
                
                        this.queue.clear(); // clear the queue
                    
                    }
                
                })
        
        );

    }

}
