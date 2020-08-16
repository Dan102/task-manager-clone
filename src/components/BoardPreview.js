import React, { useEffect } from 'react'

function BoardPreview(props) {

    const handleRemoveClick = (e) => {
        e.preventDefault();
        props.removeBoard(props.board.id)
    }

    return (
        <a href={"/board/" + props.board.id}  className="dnd-board-item">
            <button className="board-remove" onClick={handleRemoveClick}>X</button>
            <div className="board-title">{props.board.title}</div>
        </a>
    )
}

export default BoardPreview