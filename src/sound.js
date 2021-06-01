export const audioCtx = new AudioContext();

export const soundMixer = audioCtx.createGain();

soundMixer.connect(audioCtx.destination);

// play sound
// Example:
// import { playSound, soundMixer } from './sound.js';
// playSound(soundMixer, jumpSound);

export const playSound = (gainNode, audioBuffer, time = 0) => {
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(gainNode);
  source.start(time);
  return source;
};

// setVolume(soundMixer, .5);

export const setVolume = (gainNode, v) => gainNode.gain.value = v;
