/** @module Sound */

import { off, on } from "./dom.js";

/**
 * WebAudio context
 */
let _audioCtx = null;

export const getAudioCtx = () => {
  if(!_audioCtx) {
    _audioCtx = new AudioContext();
  }

  return _audioCtx;
};

/**
 * output mixer
 */
let _soundMixer = null;

export const getSoundMixer = () => {
  if(!_soundMixer) {
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
   * @param {AudioBuffer} audioBuffer - sound data
   * @param {number} time - length to play, or 0 to play to the end
   * @param {boolean} loop - play the sound in loop if true
   * @param {GainNode} gainNode - output mixer
   * @example
   * import Sound from './sound.js';
   * Sound.play(jumpSound);
   */
  static play(audioBuffer, time = 0, loop = false, gainNode = getSoundMixer()) {
    const audioCtx = getAudioCtx();

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(gainNode);
    source.loop = loop;
    source.start(time);

    return source;
  }

  static stop(source, time = 0) {
    source.stop(time);
  }

  /**
   * set the output volume
   * @param {number} v - volume
   * @param {GainNode} gainNode - output mixer
   * @example
   * setVolume(.5);
   */
  static setVolume(v, gainNode = getSoundMixer()) {
    gainNode.gain.value = v;
  }

}

// hack to resume the audio ctx

const resumeAudioCtx = () => {
  const audioCtx = getAudioCtx();
  
  if(/interrupted|suspended/.test(audioCtx.state)) {
    audioCtx.resume();
  }

  off(window, 'click', resumeAudioCtx);
};

on(window, 'click', resumeAudioCtx);
