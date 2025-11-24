import { type Brick } from "./type";

export const LBrick: Brick = {
  position: {
    x: 0,
    y: 0,
  },
  shapes: [
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [1, 0],
    ],
  ],
};

export const TBrick: Brick = {
  position: {
    x: 0,
    y: 0,
  },
  shapes: [
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [1, 1, 1],
      [0, 1, 0],
    ],
  ],
};

export const OBrick: Brick = {
  position: {
    x: 0,
    y: 0,
  },
  shapes: [
    [
      [1, 1],
      [1, 1],
    ],
  ],
};

export const IBrick: Brick = {
  position: {
    x: 0,
    y: 0,
  },
  shapes: [[[1, 1, 1, 1]], [[1], [1], [1], [1]]],
};
