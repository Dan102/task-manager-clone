import React, { useEffect } from 'react'

const BoardPreview = ({board, removeBoard}) => {

    const handleRemoveClick = (e) => {
        e.preventDefault();
        removeBoard(board.id)
    }

    return (
        <a href={"/board/" + board.id}  className="dnd-board-item">
            <button className="board-remove" onClick={handleRemoveClick}>X</button>
            <div className="board-title">{board.title}</div>
        </a>
    )
}

export default BoardPreview