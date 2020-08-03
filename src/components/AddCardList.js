import React from 'react'

function AddCardList(props) {
    
    function handleAddCard(e) {
        e.preventDefault();
        const title = e.target.elements.cardListTitle.value
        props.addCardList(title);
    }

    return (
        <div className="dnd-list add-card-list">
            <form onSubmit={handleAddCard}>
                <textarea className="add-card-textarea" name="cardListTitle" placeholder="New list..."></textarea>
                <button className="add-card-button">Add List</button>
            </form>
        </div>
    )
}

export default AddCardList