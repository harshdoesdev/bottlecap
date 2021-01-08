const _getTile = (map, layer, col, row) => {

  return layer[row * map.cols + col];

};

const _drawTile = (ctx, tileset, tile, x, y, size) => {

  const s = tileset.data[tile];

  ctx.drawImage(tileset.atlasImage, s.x, s.y, size, size, x, y, size, size);

};

export const drawMap = (ctx, map, tileset) => {

  const { layers, size, rows, cols } = map;

  for(let n = 0; n < layers.length; n++) {

    const layer = layers[n];

    for(let row = 0; row < rows; row++) {

      for(let col = 0; col < cols; col++) {

        const tile = _getTile(map, layer, col, row);

        if(tile !== 0) {

          _drawTile(ctx, tileset, tile, col * size, row * size, size);

        }

      }

    }

  }

};
