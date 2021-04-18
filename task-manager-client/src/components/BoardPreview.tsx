import React from 'react'
import { Link } from 'react-router-dom';
import IBoardPreview from '../models/interfaces/IBoardPreview';

interface IBoardPreviewProps {
    boardPreview: IBoardPreview;
    removeBoard: (boardId: number) => void;
}

const BoardPreview = ({boardPreview, removeBoard}: IBoardPreviewProps) => {

    const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        removeBoard(boardPreview.id)
    }

    return (
        <Link to={"/Board/" + boardPreview.id}  className="dnd-board-item">
            <button className="board-remove" onClick={e => handleRemoveClick(e)}>X</button>
            <div className="board-title">{boardPreview.title}</div>
        </Link>
    )
}

export default BoardPreview