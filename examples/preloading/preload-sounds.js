import { ready } from './bottlecap/dom.js';
import { load_sound, load_sounds } from './bottlecap/loader.js';

const app = async () => {

  const res = './resources/sounds/';
  
  // Load Single Sound

  const sound1 = await load_sound(res + 'sound1.png'); // returns new Audio Object
  
  // Load Multiple Sounds
  
  const sounds = await load_sounds(res + 'sound2.png', res + 'sound3.png', res + 'sound4.png'); // returns Array of Audio Objects
  
  /*
  
  YOUR REST OF GAME LOGIC HERE
  
  CODE BELOW THIS LINE WILL RUN ONLY AFTER EVERYTHING GETS LOADED
  
  */

};

ready(app);
