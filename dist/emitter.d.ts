/** @module Emitter */
export default class Emitter {
    topics: {};
    emit(id: any, ...data: any[]): void;
    hasTopic(id: any): boolean;
    on(id: any, listener: any): () => void;
    once(id: any, listener: any): () => void;
    off(id: any, listener: any): void;
    destroy(): void;
}
