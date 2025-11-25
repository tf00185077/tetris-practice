const EMPTY_MAP_VALUE = 0;
const BRICK_MAP_VALUE = 1;
const MAP_WIDTH = 10;
const MAP_HEIGHT = 20;

type Map = (0 | 1)[][];

type Brick = {
  position: {
    x: number;
    y: number;
  };
  shapes: (0 | 1)[][][];
  shapeIndex: number;
}

export type { Map, Brick };
export { EMPTY_MAP_VALUE, BRICK_MAP_VALUE, MAP_WIDTH, MAP_HEIGHT };
