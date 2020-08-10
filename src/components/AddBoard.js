import React from "react"

function AddBoard(props) {

    function handleAddBoard(e) {
        e.preventDefault();
        const title = e.target.elements.cardTitle.value;
        props.addBoard(title);
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