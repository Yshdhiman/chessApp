const getPiece = {
    bk: "b-k.svg",
    bq: "b-q.svg",
    bn: "b-n.svg",
    bb: "b-b.svg",
    br: "b-r.svg",
    bp: "b-p.svg",
    wk: "w-k.svg",
    wq: "w-q.svg",
    wn: "w-n.svg",
    wb: "w-b.svg",
    wr: "w-r.svg",
    wp: "w-p.svg",
};

export type PieceKey = keyof typeof getPiece;

interface PiecesProps {
    PieceKey: PieceKey;
    pieceStyle?: string; // need to apply later
}

const Pieces = ({ PieceKey, pieceStyle = "default" }: PiecesProps) => {
    if (!PieceKey) {
        return null;
    }

    const piecesPath = `/../src/assets/pieces/${pieceStyle}/`;
    const pieceImage = getPiece[PieceKey] || null;

    return (
        <img src={piecesPath + pieceImage} alt={PieceKey} />
    );
};

export default Pieces;
