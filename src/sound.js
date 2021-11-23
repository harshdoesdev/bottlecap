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

export default class Sound {

  /**
   * 
   * @param {mixer} soundMixer - output mixer
   * @param {ArrayBuffer} audioBuffer - sound data
   */
  constructor(soundMixer, audioBuffer) {
    this.soundMixer = soundMixer;
    this.gainNode = audioCtx.createGain();
    this.audioBuffer = audioBuffer;
    this.state = '';
  }

  /**
   * play the sound
   * @param {number} time - length to play, or 0 to play to the end
   */
  play(time) {
    this.source = audioCtx.createBufferSource();
    this.source.buffer = this.audioBuffer;
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.soundMixer);
    this.source.start(time);
    this.state = 'playing';
  }

  /**
   * stop the sound
   */
  stop() {
    if(this.state && this.state !== 'stopped') {
      return;
    }
    this.source.stop();
    this.state = 'stopped';
  }

  /**
   * set the output volume
   * @param {number} volume 
   */
  setVolume(volume) {
    this.gainNode.gain.value = volume;
  }

  pause() {
    this.source.stop();
    this.state = 'paused';
  }

}

// hack to resume the audio ctx

const resumeAudioCtx = () => {
  if(/interrupted|suspended/.test(audioCtx.state)) {
    audioCtx.resume();
  }

  off(window, 'click', resumeAudioCtx);
};

on(window, 'click', resumeAudioCtx);
