
// image / spritesheet loader

/*

  const playerSprite = async load_image('./playerSprite.png');

  returns <Image>

*/

export const load_image = src => {

  return new Promise((resolve, reject) => {

    const img = new Image();

    img.onload = () => resolve(img);

    img.onerror = reject;

    img.src = src;

  });

};

/*

  const interiorSprites = async load_images(['./table.png', './chair.png', 'tv.png']);

  returns <Array> of Images

*/

export const load_images = srcs => Promise.all(srcs.map(load_image));

/*

Loads sounds

*/

export const load_sound = src => {

  return new Promise((resolve, reject) => {

    const sound = new Audio();

    sound.canplaythrough = () => resolve(sound);

    sound.onerror = reject;

    sound.src = src;

  });

};

// load multiple sounds

export const load_sounds = srcs => Promise.all(srcs.map(load_sound));