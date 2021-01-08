import { ready } from './bottlecap/dom.js';
import { createCanvas, clearCanvas } from './bottlecap/canvas.js';
import { drawMap } from './bottlecap/tilemap.js';
import { load_image } from './bottlecap/loader.js';

const round = Math.round;

const app = async () => {

  const { cnv, ctx } = createCanvas(32 * 8, 32 * 8);

  document.body.appendChild(cnv);

  const tileset = {

    atlasImage: await load_image('./resources/tileset.png'),

    data: {

      1: {x: 0, y: 0},

      2: {x: 32, y: 0},

      3: {x: 64, y: 0},

      4: {x: 96, y: 0},

      5: {x: 128, y: 0},

      6: {x: 0, y: 32},

      7: {x: 32, y: 32},

      8: {x: 64, y: 32},

      9: {x: 96, y: 32},

      10: {x: 96, y: 32},

    }

  };

  const map = {

    size: 32,

    rows: 8,

    cols: 8,

    layers: [

      [
  
        1, 1, 1, 1, 1, 1, 1, 1,
    
        1, 1, 3, 6, 6, 3, 1, 1,
    
        1, 1, 7, 5, 5, 7, 1, 1,
    
        1, 1, 7, 5, 5, 7, 1, 1,
    
        1, 1, 3, 6, 6, 3, 1, 1,
    
        1, 1, 1, 1, 1, 1, 1, 1,
    
        1, 1, 1, 1, 1, 1, 1, 1,
    
        1, 1, 1, 1, 1, 1, 1, 1
        
      ],
  
      [
  
        0, 0, 0, 0, 0, 0, 0, 0,
    
        0, 0, 0, 0, 0, 0, 0, 0,
    
        0, 0, 0, 0, 0, 0, 0, 0,
    
        0, 0, 0, 0, 0, 0, 0, 0,
    
        0, 0, 0, 0, 0, 0, 0, 0,
    
        0, 0, 0, 0, 0, 0, 0, 0,
    
        0, 0, 0, 0, 0, 0, 0, 0,
    
        0, 0, 0, 0, 0, 0, 0, 0
        
      ]
  
    ]

  };

  const gameloop = () => {

    requestAnimationFrame(gameloop);

    clearCanvas(ctx);

    drawMap(ctx, map, tileset);
    
  };

  requestAnimationFrame(gameloop);

};

ready(app);
