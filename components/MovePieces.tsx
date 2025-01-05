

const MovePieces = (
    pieceKey: string,
    currentPosition: [number, number],
    newPosition: [number, number]
) => {
    const [newRow, newCol] = newPosition;
    const [oldRow, oldCol]= currentPosition;
    setPiecePositions((prevState) => {
      var newState = JSON.parse(JSON.stringify((prevState)));
        newState[oldRow][oldCol] = "";
        newState[newRow][newCol] = pieceKey;
        return newState;
    });
    // console.log(row, col);
};

export default MovePieces;