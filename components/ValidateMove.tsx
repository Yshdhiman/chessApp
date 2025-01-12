var whiteTurn = true;
const pieceRules: Record<
    string,
    (startX: number, startY: number, endX: number, endY: number) => boolean
> = {
    p: (startX, startY, endX, endY) => {
        return startY == endY && Math.abs(startX - endX) == 1;
    },
    n: (startX, startY, endX, endY) => {
        return (
            (Math.abs(startY - endY) == 2 && Math.abs(startX - endX) == 1) ||
            (Math.abs(startY - endY) == 1 && Math.abs(startX - endX) == 2)
        );
    },
    r: (startX, startY, endX, endY) => {
        return startY == endY || startX == endX;
    },
    b: (startX, startY, endX, endY) => {
        return Math.abs(startX - endX) == Math.abs(startY - endY);
    },
    k: (startX, startY, endX, endY) => {
        return (
            (Math.abs(startX - endX) == 1 && startY == endY) ||
            (Math.abs(startY - endY) == 1 && startX == endX) ||
            (Math.abs(startX - endX) == 1 && Math.abs(startY - endY) == 1)
        );
    },
    q: (startX, startY, endX, endY) => {
        return (
            startY == endY ||
            startX == endX ||
            Math.abs(startX - endX) == Math.abs(startY - endY)
            
        );
    },
};
const ValidateMove = (PieceKey: string, start: number[], end: number[]) => {
    const isWhite = PieceKey.startsWith("w");
    const pieceType = PieceKey.slice(1);
    // if ((whiteTurn && !isWhite) || (!whiteTurn && isWhite)) {
    //     return false;
    // }

    // Destructure the positions only once
    const [startX, startY] = start;
    const [endX, endY] = end;

    const isValidMove = pieceRules[pieceType](startX, startY, endX, endY);

    //if the move is valid only then change the turn
    if (isValidMove) whiteTurn = !whiteTurn;

    return isValidMove;
};

export default ValidateMove;
