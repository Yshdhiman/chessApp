import { useDrag } from "react-dnd";

interface DNDProps {
    pieceKey: string; // Unique key of the piece (e.g., "wn", "bp")
    position: [number, number]; // Current position of the piece
    onDrop: (
        PieceKey: string,
        currentPosition: [number, number],
        newPosition: [number, number]
    ) => void; // Callback for drop logic
    children: React.ReactNode;
}

type DropResult = {
    newPosition: [number, number];
};

const DND: React.FC<DNDProps> = ({ pieceKey, position, onDrop, children }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "PIECE", // Drag type (matches the drop target)
        item: { pieceKey, position }, // Data passed to the drop target
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult() as DropResult;
            if (dropResult) {
                onDrop(item.pieceKey, item.position, dropResult["newPosition"]); // Handle drop
            }
        },
    }),[pieceKey, position]);

    return (
        <div
            ref={drag} // Attach drag ref
            style={{
                opacity: isDragging ? 0 : 1,
                cursor: "grab",
                scale: isDragging ? 2 : 1,
                zIndex: 999,
            }}
        >
            {children} {/* Render the piece (e.g., ♘ for a knight) */}
        </div>
    );
};

export default DND;
