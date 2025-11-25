import {
  EMPTY_MAP_VALUE,
  BRICK_MAP_VALUE,
  MAP_HEIGHT,
  MAP_WIDTH,
  type Map,
  type Brick,
} from "./type";
import {
  willTouchBorder,
  willTouchAnotherBrick,
  willTouchBottom,
} from "./canMove";

export const createEmptyMap = (): Map => {
  return Array.from({ length: MAP_HEIGHT }, () =>
    Array.from({ length: MAP_WIDTH }, () => EMPTY_MAP_VALUE)
  );
};

export const addBrickToMap = (tetrisMap: Map, brick: Brick): Map => {
  const brickShape = brick.shapes[0]; //todo: handle multiple shapes
  const startX = brick.position.x;
  const startY = brick.position.y;
  const copyMap: Map = tetrisMap.map((row) => [...row]);
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

export const handleKeyDown = (
  event: KeyboardEvent,
  setBrick: React.Dispatch<React.SetStateAction<Brick>>,
  tetrisMap: Map
) => {
  if (event.key === "ArrowLeft") {
    setBrick((prev: Brick) => {
      if (
        !willTouchBorder(prev, event, -1, 0) &&
        !willTouchAnotherBrick(prev, tetrisMap, -1, 0)
      ) {
        return {
          ...prev,
          position: { ...prev.position, x: prev.position.x - 1 },
        };
      }
      return prev;
    });
  }
  if (event.key === "ArrowRight") {
    setBrick((prev: Brick) => {
      if (
        !willTouchBorder(prev, event, 1, 0) &&
        !willTouchAnotherBrick(prev, tetrisMap, 1, 0)
      ) {
        return {
          ...prev,
          position: { ...prev.position, x: prev.position.x + 1 },
        };
      }
      return prev;
    });
  }
  if (event.key === "ArrowDown") {
    setBrick((prev: Brick) => {
      if (!willTouchBottom(prev, tetrisMap)) {
        return {
          ...prev,
          position: { ...prev.position, y: prev.position.y + 1 },
        };
      }
      return prev;
    });
  }
};
