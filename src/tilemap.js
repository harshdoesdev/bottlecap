/* tilemap.js */

/*

  // Structure of Map Object
  
  const map = {
  
    size: 32, // size of tiles
    
    rows: 8, // no of rows
    
    cols: 8, // no of cols
  
    layers: [
    
      [
        // 8 Cols and 8 Rows
    
        0, 0, 0, 0, 0, 0, 0, 0, // the tile 0 is reserved for transparent tiles

        0, 0, 0, 0, 0, 0, 0, 0,

        0, 0, 0, 0, 0, 0, 0, 0,

        0, 0, 0, 0, 0, 0, 0, 0,
        
        0, 0, 0, 0, 0, 0, 0, 0,

        0, 0, 0, 0, 0, 0, 0, 0,

        0, 0, 0, 0, 0, 0, 0, 0,

        0, 0, 0, 0, 0, 0, 0, 0
      ],
      
      // you can add multiple layers, layers will be rendered from top to bottom
    
    ]
  
  };
  
  // Structure of Tileset
  
  const tileset = {
  
    atlasImage, // any image containing your tiles
    
    data: { // source coordinates of tiles in the image
    
      1: { x: 0, y: 0 },
      
      2: { x: 32, y: 0 }
    
    }
  
  };

*/

export const drawMap = (ctx, map, tileset) => {

  const { layers, size, rows, cols } = map;

  for(let n = 0; n < layers.length; n++) {

    const layer = layers[n];

    for(let row = 0; row < rows; row++) {

      for(let col = 0; col < cols; col++) {

        const tile = layer[row * cols + col];

        if(tile !== 0) {

          const source = tileset.data[tile];

          ctx.drawImage(
            
            tileset.atlasImage, 
            
            source.x,
            
            source.y, 
            
            size, 
            
            size, 
            
            col * size, 
            
            row * size, 
            
            size, 
            
            size
            
          );

        }

      }

    }

  }

};
