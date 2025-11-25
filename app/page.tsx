"use client";
import { useState, useEffect } from "react";

import TetrisMap from "./TetrisMap";
import { createEmptyMap, addBrickToMap } from "./lib/map";
import { LBrick } from "./lib/brick";
import { handleKeyDown } from "./lib/map";
import { type Map, type Brick } from "./lib/type";

export default function Home() {
  const [gameState, setGameState] = useState<{ tetrisMap: Map; brick: Brick }>({
    tetrisMap: createEmptyMap(),
    brick: LBrick,
  });
  const mapWithBrick = addBrickToMap(gameState.tetrisMap, gameState.brick);
  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) =>
      handleKeyDown(event, setGameState);
    document.addEventListener("keydown", handleKeyDownEvent);
    return () => {
      document.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, []);

  return (
    <div>
      <TetrisMap boardWithBrick={mapWithBrick} />
    </div>
  );
}
