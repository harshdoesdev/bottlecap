
// image / spritesheet loader

/*

  const playerSprite = await loadImage('./playerSprite.png');

  returns Image

*/

export const loadImage = src => {

  return new Promise((resolve, reject) => {

    const img = new Image();

    img.onload = () => resolve(img);

    img.onerror = reject;

    img.src = src;

  });

};

/*

  const interiorSprites = await loadImages(['./table.png', './chair.png', 'tv.png']);

  returns Array of Images

*/

export const loadImages = srcs => Promise.all(srcs.map(loadImage));

/*

Loads sounds

*/

export const loadSound = src => {

  return new Promise((resolve, reject) => {

    const sound = new Audio();

    sound.oncanplaythrough = () => resolve(sound);

    sound.onerror = reject;

    sound.src = src;

  });

};

// load multiple sounds

export const loadSounds = srcs => Promise.all(srcs.map(loadSound));

// load JSON file

// const lvl1 = await loadJSON('./lvl1.json');

export const loadJSON = async src => {

  const res = await fetch(src);
  
  if (!res.ok) {

    throw new Error("couldn't load the json file.");

  }
  
  return res.json();

};
