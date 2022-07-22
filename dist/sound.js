/** @module Sound */
import { off, on } from "./dom.js";
/**
 * WebAudio context
 */
let _audioCtx = null;
export const getAudioCtx = () => {
    if (!_audioCtx) {
        _audioCtx = new AudioContext();
    }
    return _audioCtx;
};
/**
 * output mixer
 */
let _soundMixer = null;
export const getSoundMixer = () => {
    if (!_soundMixer) {
        const audioCtx = getAudioCtx();
        _soundMixer = audioCtx.createGain();
        _soundMixer.connect(audioCtx.destination);
    }
    return _soundMixer;
};
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
    static play(gainNode, audioBuffer, time = 0, loop = false) {
        const audioCtx = getAudioCtx();
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(gainNode || getSoundMixer());
        source.loop = loop;
        source.start(time);
        return source;
    }
    static stop(source, time = 0) {
        source.stop(time);
    }
    /**
     * set the output volume
     * @param {GainNode} gainNode - output mixer
     * @param {number} v - volume
     * @example
     * setVolume(soundMixer, .5);
     */
    static setVolume(gainNode, v) {
        (gainNode || getSoundMixer()).gain.value = v;
    }
}
// hack to resume the audio ctx
const resumeAudioCtx = () => {
    const audioCtx = getAudioCtx();
    if (/interrupted|suspended/.test(audioCtx.state)) {
        audioCtx.resume();
    }
    off(window, 'click', resumeAudioCtx);
};
on(window, 'click', resumeAudioCtx);
