export function getAudioCtx(): any;
export function getSoundMixer(): any;
/**
 * Sound Player
 */
export default class Sound {
    /**
     * play sound
     * @param {GainNode} gainNode - output mixer
     * @param {AudioBuffer} audioBuffer - sound data
     * @param {number} time - length to play, or 0 to play to the end
     * @param {boolean} loop - play the sound in loop if true
     * @example
     * import Sound from './sound.js';
     * Sound.play(soundMixer, jumpSound);
     */
    static play(gainNode: GainNode, audioBuffer: AudioBuffer, time?: number, loop?: boolean): any;
    static stop(source: any, time?: number): void;
    /**
     * set the output volume
     * @param {GainNode} gainNode - output mixer
     * @param {number} v - volume
     * @example
     * setVolume(soundMixer, .5);
     */
    static setVolume(gainNode: GainNode, v: number): void;
}
