import { useState } from "react";
import Square from "./Square";
import { PieceKey } from "./Pieces";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

var initialBoardState: { [keyof: number]: string[] } = [];
initialBoardState[0] = ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"];
initialBoardState[1] = ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"];
initialBoardState[6] = ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"];
initialBoardState[7] = ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"];

const ChessBoard = () => {
    const [piecePosition, setPiecePositions] = useState(initialBoardState);

    const handleDrop = (
        pieceKey: string,
        currentPosition: [number, number],
        newPosition: [number, number]
    ) => {
      console.log(pieceKey)
      console.log(currentPosition)
      console.log(newPosition)
        const [newRow, newCol] = newPosition;
        const [oldRow, oldCol] = currentPosition;
        setPiecePositions((prevState) => {
            var newState = JSON.parse(JSON.stringify(prevState));
            newState[oldRow][oldCol] = "";
            newState[newRow][newCol] = pieceKey;
            return newState;
        });
    };

    function renderSquare(
        id: number,
        row: number,
        col: number,
        pieceName: string
    ) {
        const isLightSq = (row + col) % 2;
        return (
            <Square
                id={id}
                key={`${row}${col}`}
                isLightSq={isLightSq}
                PieceKey={pieceName as PieceKey}
                piecePosition={[row, col]}
                handleDrop={handleDrop}
            />
        );
    }

    const squares: JSX.Element[] = [];
    for (let i = 0; i < 64; i++) {
        var row = Math.floor(i / 8);
        var col = Math.floor(i % 8);
        if (!piecePosition[row]) {
            piecePosition[row] = [];
        }
        if (!piecePosition[row][col]) {
            piecePosition[row][col] = "";
        }

        let piece = piecePosition[row][col];
        squares.push(renderSquare(i, row, col, piece));
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-8 grid-rows-8 w-fit mx-auto my-6 select-none">
                {squares}
            </div>
        </DndProvider>
    );
};

export default ChessBoard;
