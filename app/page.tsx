import TetrisMap from "./TetrisMap";
import { createEmptyMap, addBrickToMap } from "./lib/map";
import { LBrick } from "./lib/brick";
export default function Home() {
  const tetrisMap = createEmptyMap();
  const boardWithBrick = addBrickToMap(tetrisMap, LBrick);

  return (
    <div>
      <TetrisMap boardWithBrick={boardWithBrick} />
    </div>
  );
}
