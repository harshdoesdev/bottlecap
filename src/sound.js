import { off, on } from "./dom.js";

/**
 * WebAudio context
 */
export const audioCtx = new AudioContext();

/**
 * output mixer
 */
export const soundMixer = audioCtx.createGain();

soundMixer.connect(audioCtx.destination);

/**
 * play sound
 * @param {mixer} gainNode - output mixer
 * @param {sound} audioBuffer - sound data
 * @param {number} time - length to play, or 0 to play to the end
 * @param {boolean} loop - play the sound in loop if true
 * @example
 * import { playSound, soundMixer } from './sound.js';
 * playSound(soundMixer, jumpSound);
 */
export const playSound = (gainNode, audioBuffer, time = 0, loop = false) => {
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(gainNode);
  source.loop = loop;
  source.start(time);
  return source;
};

/**
 * set the output volume
 * @param {mixer} gainNode - output mixer
 * @param {number} v - volume
 * @example
 * setVolume(soundMixer, .5);
 */
export const setVolume = (gainNode, v) => gainNode.gain.value = v;

/**
 * stop sound
 * @param {AudioBufferSourceNode} source 
 * @param {number} time
 */
export const stopSound = (source, time = 0) => source.stop(time);

// hack to resume the audio ctx

const resumeAudioCtx = () => {
  if(/interrupted|suspended/.test(audioCtx.state)) {
    audioCtx.resume();
  }

  off(window, 'click', resumeAudioCtx);
};

on(window, 'click', resumeAudioCtx);
