export const audioCtx = new AudioContext();

export const soundMixer = audioCtx.createGain();

soundMixer.connect(audioCtx.destination);

export const playSound = (audioBuffer, time = 0) => {
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(soundMixer);
  source.start(time);
  return source;
};

export const setVolume = (gainNode, v) => gainNode.gain.value = v;
