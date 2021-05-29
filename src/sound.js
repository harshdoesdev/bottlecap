export const audioCtx = new AudioContext();

export const soundMixer = audioCtx.createGainNode();

soundMixer.connect(audioCtx.destination);

export const playSound = (sound, time) => {
  const source = audioCtx.createBufferSource();
  source.buffer = sound;
  source.connect(soundMixer);
  source.noteOn(time);
  return source;
};

export const setVolume = v => soundMixer.gain.value = v;
