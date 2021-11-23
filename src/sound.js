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
 *
 * Example:
 * import { playSound, soundMixer } from './sound.js';
 * playSound(soundMixer, jumpSound);
 * 
 * @param {mixer} soundMixer - output mixer
 * @param {sound} audioBuffer - sound data
 * @param {number} time - length to play, or 0 to play to the end
 * @param {boolean} loop - play the sound in loop if true
 */
export const playSound = (soundMixer, audioBuffer, time = 0, loop = false) => {
  const gainNode = audioCtx.createGain();
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(gainNode);
  gainNode.connect(soundMixer);
  source.loop = loop;
  source.start(time);
  return { gainNode, source };
};

/**
 * set the output volume
 *
 * Example:
 * setVolume(soundMixer, .5);
 *
 * @param {mixer} gainNode - output mixer
 * @param {number} v - volume
 */
export const setVolume = (gainNode, v) => gainNode.gain.value = v;

// hack to resume the audio ctx

const resumeAudioCtx = () => {
  if(/interrupted|suspended/.test(audioCtx.state)) {
    audioCtx.resume();
  }

  off(window, 'click', resumeAudioCtx);
};

on(window, 'click', resumeAudioCtx);
