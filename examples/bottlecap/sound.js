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
 * @param {mixer} gainNode - output mixer
 * @param {sound} audioBuffer - sound data
 * @param {number} time - length to play, or 0 to play to the end
 */
export const playSound = (gainNode, audioBuffer, time = 0) => {
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(gainNode);
  source.start(time);
  return source;
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
