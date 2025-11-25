import {
  BRICK_MAP_VALUE,
  EMPTY_MAP_VALUE,
  MAP_WIDTH,
  MAP_HEIGHT,
  type Brick,
  type Map,
} from "./type";
export const willTouchBorder = (
  brick: Brick,
  keyDown: KeyboardEvent,
  dx: number,
  dy: number
): boolean => {
  const brickShape = brick.shapes[brick.shapeIndex];
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

export const willTouchBottom = (brick: Brick, tetrisMap: Map): boolean => {
  const brickShape = brick.shapes[brick.shapeIndex];
  const startY = brick.position.y;
  const startX = brick.position.x;
  for (let i = 0; i < brickShape.length; i++) {
    for (let j = 0; j < brickShape[i].length; j++) {
      if (brickShape[i][j] === EMPTY_MAP_VALUE) continue;
      const nextY = startY + i + 1;
      const nextX = startX + j;

      if (nextY >= MAP_HEIGHT) {
        return true;
      }

      if (tetrisMap[nextY][nextX] === BRICK_MAP_VALUE) {
        return true;
      }
    }
  }
  return false;
};

const willCollide = (brick: Brick, tetrisMap: Map): boolean => {
  const shape = brick.shapes[brick.shapeIndex];
  const { x, y } = brick.position;

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] === 0) continue;
      const nextY = y + i;
      const nextX = x + j;

      if (nextY < 0 || nextY >= MAP_HEIGHT || nextX < 0 || nextX >= MAP_WIDTH) {
        return true;
      }
      if (tetrisMap[nextY][nextX] === BRICK_MAP_VALUE) {
        return true;
      }
    }
  }
  return false;
};

export const willTouchAnotherBrick = (
  brick: Brick,
  tetrisMap: Map,
  dx: number,
  dy: number
): boolean => {
  const movedBrick = {
    ...brick,
    position: {
      x: brick.position.x + dx,
      y: brick.position.y + dy,
    },
  };
  return willCollide(movedBrick, tetrisMap);
};

export const canRotateBrick = (brick: Brick, tetrisMap: Map): boolean => {
  const rotated = rotateBrick(brick);
  return !willCollide(rotated, tetrisMap);
};

export const rotateBrick = (brick: Brick): Brick => {
  const nextShapeIndex =
    brick.shapeIndex + 1 < brick.shapes.length ? brick.shapeIndex + 1 : 0;
  return {
    ...brick,
    shapeIndex: nextShapeIndex,
  };
};
