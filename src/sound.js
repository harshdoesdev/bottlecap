export const audioContext = new AudioContext;

export const playSound = sound => sound.play();

export const playMusic = sound => sound.paused && playSound(sound);

export const setVolume = (sound, volume) => sound.volume = volume;

export const stopSound = sound => {

  sound.pause();

  sound.currentTime = 0;

};
