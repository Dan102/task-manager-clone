import React from "react"

const AddCard = ({listIndex, listSize, addCard, handleDragEnter}) => {

    const handleAddCard = (e) => {
        e.preventDefault();
        const title = e.target.elements.cardTitle.value;
        addCard(title, listIndex);
    }

    return (
        <div onDragEnter={(e) => handleDragEnter(e, listIndex, listSize - 1)}
            onDragOver = {(e) => e.preventDefault()} className="add-card">
            <form onSubmit={(e) => handleAddCard(e)}>
                <textarea className="add-card-textarea" name="cardTitle" placeholder="New card..."></textarea>
                <button className="add-card-button">Add Card</button>
            </form>
        </div>
    )
}

export default AddCard;