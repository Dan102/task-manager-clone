import React, { useEffect } from 'react'

function BoardPreview(props) {

    const handleRemoveClick = (e) => {
        e.preventDefault();
        props.removeBoard(e, props.board.id)
    }

    return (
        <a href="/board" className="dnd-board-item">
            <button className="board-remove" onClick={handleRemoveClick}>X</button>
            <div className="board-title">{props.board.title}</div>
        </a>
    )
}

export default BoardPreview