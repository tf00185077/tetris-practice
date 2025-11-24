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
        !willTouchAnotherBrick(prev, tetrisMap, -1, 0) &&
        !willTouchBottom(prev)
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
        !willTouchAnotherBrick(prev, tetrisMap, 1, 0) &&
        !willTouchBottom(prev)
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
      if (!willTouchBottom(prev)) {
        return {
          ...prev,
          position: { ...prev.position, y: prev.position.y + 1 },
        };
      }
      return prev;
    });
  }
};

export const willTouchBorder = (
  brick: Brick,
  keyDown: KeyboardEvent,
  dx: number,
  dy: number
): boolean => {
  const brickShape = brick.shapes[0];
  const startX = brick.position.x + dx;
  const startY = brick.position.y + dy;
  if (keyDown.key === "ArrowLeft") {
    return startX < 0;
  }
  if (keyDown.key === "ArrowRight") {
    return startX + brickShape[0].length > MAP_WIDTH;
  }
  if (keyDown.key === "ArrowDown") {
    return startY + brickShape.length >= MAP_HEIGHT;
  }
  return true;
};

export const willTouchBottom = (brick: Brick): boolean => {
  const brickShape = brick.shapes[0];
  const startY = brick.position.y;
  return startY + brickShape.length >= MAP_HEIGHT;
};

export const willTouchAnotherBrick = (
  brick: Brick,
  tetrisMap: Map,
  dx: number,
  dy: number
): boolean => {
  const brickShape = brick.shapes[0];
  const startX = brick.position.x + dx;
  const startY = brick.position.y + dy;
  for (let i = 0; i < brickShape.length; i++) {
    for (let j = 0; j < brickShape[i].length; j++) {
      if (
        brickShape[i][j] === 1 &&
        tetrisMap[startY + i][startX + j] === BRICK_MAP_VALUE
      ) {
        return true;
      }
    }
  }
  return false;
};
