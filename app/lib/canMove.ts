import { BRICK_MAP_VALUE,MAP_WIDTH, MAP_HEIGHT,type Brick, type Map } from "./type";
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
  