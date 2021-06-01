export default class EventEmitter {

    events = new Map

    on(type, listener) {
        
        if(!this.events.has(type)) {
            this.events.set(type, new Set);
        }
        
        const listeners = this.events.get(type);
        
        listeners.add(listener);
    
    }

    off(type, listener) {

        const listeners = this.events.get(type);

        if(!listeners) return;
        
        listeners.delete(listener);
        
        if(!listeners.size) this.events.delete(type);
    
    }

    emit(type, ...args) {

        const listeners = this.events.get(type);

        if(!listeners) return;

        listeners.forEach(listener => listener(...args));

    }

}
