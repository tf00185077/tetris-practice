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
import { LBrick, TBrick, OBrick, IBrick } from "./brick";
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
  setGameState: React.Dispatch<
    React.SetStateAction<{ tetrisMap: Map; brick: Brick }>
  >
) => {
  if (event.key === "ArrowLeft") {
    setGameState((prev: { tetrisMap: Map; brick: Brick }) => {
      if (
        !willTouchBorder(prev.brick, event, -1, 0) &&
        !willTouchAnotherBrick(prev.brick, prev.tetrisMap, -1, 0)
      ) {
        return {
          ...prev,
          brick: {
            ...prev.brick,
            position: { ...prev.brick.position, x: prev.brick.position.x - 1 },
          },
        };
      }
      return prev;
    });
  }
  if (event.key === "ArrowRight") {
    setGameState((prev: { tetrisMap: Map; brick: Brick }) => {
      if (
        !willTouchBorder(prev.brick, event, 1, 0) &&
        !willTouchAnotherBrick(prev.brick, prev.tetrisMap, 1, 0)
      ) {
        return {
          ...prev,
          brick: {
            ...prev.brick,
            position: { ...prev.brick.position, x: prev.brick.position.x + 1 },
          },
        };
      }
      return prev;
    });
  }
  if (event.key === "ArrowDown") {
    setGameState((prev: { tetrisMap: Map; brick: Brick }) => {
      return handleStepDown(prev);
    });
  }
};

export const handleStepDown = (gameState: {
  tetrisMap: Map;
  brick: Brick;
}): { tetrisMap: Map; brick: Brick } => {
  if (!willTouchBottom(gameState.brick, gameState.tetrisMap)) {
    return {
      ...gameState,
      brick: {
        ...gameState.brick,
        position: {
          ...gameState.brick.position,
          y: gameState.brick.position.y + 1,
        },
      },
    };
  } else {
    const newBrick = [OBrick, TBrick, IBrick, LBrick];
    const randomIndex = Math.floor(Math.random() * newBrick.length);
    const randomBrick = newBrick[randomIndex];
    return {
      tetrisMap: addBrickToMap(gameState.tetrisMap, gameState.brick),
      brick: randomBrick,
    };
  }
};
