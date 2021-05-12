export default class Signal {

    constructor() {
        this.listeners = new Set;
    }

    add(fn) {
        if(typeof fn !== 'function') throw new Error('Signal: Listener must be a function.');
        this.listeners.add(fn);
        return () => this.remove(fn);
    }

    remove(fn) {
        this.listeners.delete(fn);
    }

    emit(...args) {
        this.listeners.forEach(fn => fn(...args));
    }

}
