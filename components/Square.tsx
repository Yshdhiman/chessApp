import Pieces, { PieceKey } from "./Pieces";
import { useDrop } from "react-dnd";
import DND from "./DND";
import ValidateMove from "./ValidateMove";
import Overlay from "./Overlay";

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

type itemType = {
    pieceKey: string;
    position: number[];
};

const Square = ({
    id,
    isLightSq,
    PieceKey,
    piecePosition,
    handleDrop,
}: SquareProps) => {
    const [{ isOver, isWhite, canDrop }, drop] = useDrop(() => ({
        accept: "PIECE", // Accept the piece type
        drop: (item: itemType) => {
            const isValidMove = ValidateMove(
                item.pieceKey,
                item.position,
                piecePosition
            );
            if (!isValidMove) {
                return { newPosition: item.position }; // set oldPosition as new
            }

            return { newPosition: piecePosition }; // set new position where piece needs to drop
        }, // Pass new position on drop
        canDrop: (item) =>
            ValidateMove(item.pieceKey, item.position, piecePosition),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            isWhite: monitor.getItem(),
            canDrop: !!monitor.canDrop(),
        }),
    }));

    var piece = <Pieces PieceKey={PieceKey} />;

    return (
        <div
            id={`${id}`}
            ref={drop}
            className="w-8 sm:w-10 md:w-12 lg:w-16 flex align-center justify-center"
            style={{
                backgroundColor: isLightSq
                    ? "#8f8e8c" // light sq
                    : "#6d6c6a", // dark sq
                position: "relative",
            }}
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
            {isOver && (
                <Overlay
                    bgColor={
                        isWhite["pieceKey"].startsWith("w")
                            ? "#457eb0" // black turn
                            : "#c65050" // white turn
                    }
                />
            )}
            {canDrop && (
                <Overlay bgColor="radial-gradient(closest-side, #b3b3b3, #3e3e3e3d, transparent)" />
            )}
            {/* {isOver && canDrop && <Overlay bgColor="green" />} */}
        </div>
    );
};

export default Square;
