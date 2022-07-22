/** @module Emitter */
export default class Emitter {
    constructor() {
        this.topics = {};
    }
    emit(id, ...data) {
        const listeners = this.topics[id];
        if (!listeners || listeners.size < 0) {
            return;
        }
        listeners.forEach(listener => listener(...data));
    }
    hasTopic(id) {
        return Reflect.has(this.topics, id);
    }
    on(id, listener) {
        if (!this.hasTopic(id)) {
            this.topics[id] = new Set();
        }
        this.topics[id].add(listener);
        return () => this.off(id, listener);
    }
    once(id, listener) {
        const proxy = (...data) => {
            this.off(id, proxy);
            listener(...data);
        };
        return this.on(id, proxy);
    }
    off(id, listener) {
        if (this.hasTopic(id)) {
            this.topics[id].delete(listener);
        }
    }
    destroy() {
        this.topics = {};
    }
}
