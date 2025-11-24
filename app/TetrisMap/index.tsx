export default function TetrisMap({boardWithBrick}:{boardWithBrick: (0|1)[][]}) {
  return (
    <div className="w-full h-full bg-gray-200">
      {boardWithBrick.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((isBrick, cellIndex) => (
            <div
              key={cellIndex}
              className={`w-10 h-10 ${isBrick === 1 ? "bg-blue-300 border border-blue-400" : " border border-gray-400 bg-transparent"}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
