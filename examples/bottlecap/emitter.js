/**
 * A complementary event system.
 */
export default class EventEmitter {

    events = new Map

    /**
     * Bind a new event listener
     * @param {string} type - event type
     * @param {function} listener - event handler
     */
    on(type, listener) {
        
        if(!this.events.has(type)) {
            this.events.set(type, new Set);
        }
        
        const listeners = this.events.get(type);
        
        listeners.add(listener);
    
    }

    /**
     * Disable an event listener
     * @param {string} type - event type
     * @param {function} listener - event handler to disable
     */
    off(type, listener) {

        const listeners = this.events.get(type);

        if(!listeners) return;
        
        listeners.delete(listener);
        
        if(!listeners.size) this.events.delete(type);
    
    }

    /**
     * Emit an event and handle it.
     * @param {string} - event type
     * @params {} args - event handlers parameters
     */
    emit(type, ...args) {

        const listeners = this.events.get(type);

        if(!listeners) return;

        listeners.forEach(listener => listener(...args));

    }

}
