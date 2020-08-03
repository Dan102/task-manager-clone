import React from "react"

function AddCard(props) {

    function handleAddCard(e) {
        e.preventDefault();
        const title = e.target.elements.cardTitle.value;
        props.addCard(title, props.listIndex);
    }

    return (
        <div onDragEnter={(e) => props.handleDragEnter(e, props.listIndex, props.listSize - 1)} className="add-card">
            <form onSubmit={(e) => handleAddCard(e)}>
                <textarea className="add-card-textarea" name="cardTitle" placeholder="New card..."></textarea>
                <button className="add-card-button">Add Card</button>
            </form>
        </div>
    )
}

export default AddCard;