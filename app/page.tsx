"use client";
import { useState, useEffect } from "react";

import TetrisMap from "./TetrisMap";
import { createEmptyMap, addBrickToMap } from "./lib/map";
import { LBrick } from "./lib/brick";
import { handleKeyDown } from "./lib/map";

export default function Home() {
  const [tetrisMap] = useState(createEmptyMap());
  const [brick, setBrick] = useState(LBrick);
  const mapWithBrick = addBrickToMap(tetrisMap, brick);
  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) =>
      handleKeyDown(event, setBrick, tetrisMap);
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
