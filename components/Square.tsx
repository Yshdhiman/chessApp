import React from "react";
import Pieces, { PieceKey } from "./Pieces";
import { useDrop } from "react-dnd";
import DND from "./DND";

interface SquareProps {
    id: number;
    isLightSq: number;
    PieceKey: PieceKey;
    piecePosition: [number, number];
    handleDrop: (
        PieceKey: string,
        currentPosition: [number, number],
        newPosition: [number, number]
    ) => void;
}

const Square = ({
    id,
    isLightSq,
    PieceKey,
    piecePosition,
    handleDrop,
}: SquareProps) => {
    const [, drop] = useDrop(() => ({
        accept: "PIECE", // Accept the piece type
        drop: () => ({ newPosition: piecePosition }), // Pass new position on drop
    }));

    var piece = <Pieces PieceKey={PieceKey} />;

    return (
        <div
            id={`${id}`}
            ref={drop}
            className="h-16 w-16 flex align-center justify-center"
            style={{ backgroundColor: isLightSq ? "#8f8e8c" : "#6d6c6a" }}
        >
            {PieceKey && (
                <DND
                    pieceKey={PieceKey}
                    position={piecePosition}
                    onDrop={handleDrop}
                >
                    {piece}
                </DND>
            )}
        </div>
    );
};

export default Square;
