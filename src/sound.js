export const audioContext = new AudioContext;

// For Web Audio API

// For HTML5 Audio Element

export const playAudio = aud => aud.paused && aud.play();

export const setAudioVolume = (aud, volume) => aud.volume = volume;

export const stopAudio = aud => {

  aud.pause();

  aud.currentTime = 0;

};
