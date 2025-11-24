import {
  EMPTY_MAP_VALUE,
  BRICK_MAP_VALUE,
  MAP_HEIGHT,
  MAP_WIDTH,
  type Map,
  type Brick,
} from "./type";

export const createEmptyMap = (): Map => {
  return Array.from({ length: MAP_HEIGHT }, () =>
    Array.from({ length: MAP_WIDTH }, () => EMPTY_MAP_VALUE)
  );
};

export const addBrickToMap = (tetrisMap: Map, brick: Brick): Map => {
  const brickShape = brick.shapes[0]; //todo: handle multiple shapes
  const startX = brick.position.x;
  const startY = brick.position.y;
  const copyMap: Map = tetrisMap.map(row => [...row]);
  for (let i = 0; i < brickShape.length; i++) {
    for (let j = 0; j < brickShape[i].length; j++) {
      if (
        brickShape[i][j] === 1 &&
        startY + i < MAP_HEIGHT &&
        startX + j < MAP_WIDTH
      ) {
        copyMap[startY + i][startX + j] = BRICK_MAP_VALUE;
      }
    }
  }
  return copyMap;
};
