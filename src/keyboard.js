/** @module Keyboard */

import { on } from './dom.js';
import Vec2 from './vec2.js';

/**
 * @typedef {{x: number, y: number}} direction
 */

const DIRECTION = Vec2.zero();

const KEYSTATE = {};

export default class Keyboard {

  /**
   * check if a key is down
   * @param {string} key
   */
  static keyDown(key) {
    return !!KEYSTATE[key];
  }

  /** 
   * get direction for movement of player
   * @return {direction}
   * @example
   * update(dt) {
   *    const direction = Keyboard.getDirection();
   *    player.x += direction.x * player.speed;
   *    player.y += direction.y * player.speed;
   * }
   */
  static getDirection() {
    const keyDown = Keyboard.keyDown, KEYS = Keyboard.KEYS;
    
    const x = keyDown(KEYS.LEFT) ? -1 : keyDown(KEYS.RIGHT) ? 1 : 0;
    const y = keyDown(KEYS.UP) ? -1 : keyDown(KEYS.DOWN) ? 1 : 0;

    Vec2.set(DIRECTION, x, y);
    
    return DIRECTION;
  }

  static KEYS = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    SPACEBAR: ' ',
    ESCAPE: 'Escape',
    ENTER: 'Enter',
    CTRL: 'Control',
    TAB: 'Tab',
    ALT: 'Alt',
    W: 'w',
    A: 'a',
    S: 's',
    D: 'd',
    E: 'e',
    X: 'x',
    Z: 'z'
  }

}

const handleKeyDown = e => {
  if(e.defaultPrevented) {
    return;
  }
  
  KEYSTATE[e.key] = true;
  
  e.preventDefault();
};

const handleKeyUp = e => {
  return KEYSTATE[e.key] = false;
};

on(window, 'keydown', handleKeyDown);
on(window, 'keyup', handleKeyUp);