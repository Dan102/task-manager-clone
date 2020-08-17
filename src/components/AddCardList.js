import React from 'react'

const AddCardList = ({addCardList}) => {
    
    const handleAddCardList = (e) => {
        e.preventDefault();
        const title = e.target.elements.cardListTitle.value
        addCardList(title);
    }

    return (
        <div className="dnd-list add-card-list">
            <form onSubmit={handleAddCardList}>
                <textarea className="add-card-textarea" name="cardListTitle" placeholder="New list..."></textarea>
                <button className="add-card-button">Add List</button>
            </form>
        </div>
    )
}

export default AddCardList