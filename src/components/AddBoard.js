import React from "react"

const AddBoard = ({addBoard}) => {

    const handleAddBoard = (e) => {
        e.preventDefault();
        const title = e.target.elements.cardTitle.value;
        addBoard(title);
    }

    return (        
        <div className="dnd-board-item" style={{background: "transparent"}}>
            <form onSubmit={(e) => handleAddBoard(e)}>
                <textarea className="add-board-textarea" name="cardTitle" placeholder="New board..."></textarea>
                <button className="add-board-button">Add Board</button>
            </form>
        </div>
    )
}

export default AddBoard;