import { ready } from './bottlecap/dom.js';
import { load_image, load_images } from './bottlecap/loader.js';

const app = async () => {

  const res = './resources/images/';
  
  // Load Single Image / Sprite

  const img1 = await load_image(res + 'img1.png'); // returns new Image
  
  // Load Multiple Images and Sprites
  
  const imgs = await load_images(res + 'img2.png', res + 'img3.png', res + 'img4.png'); // returns Array of Image Objects
  
  /*
  
  YOUR REST OF GAME LOGIC HERE
  
  CODE BELOW THIS LINE WILL RUN ONLY AFTER EVERYTHING GETS LOADED
  
  */

};

ready(app);
