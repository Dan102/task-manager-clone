import React, {useState} from 'react'

interface IAddCardListProps {
    addCardList: (title: string) => void;
}

const AddCardList = ({addCardList}: IAddCardListProps) => {
    
    const [newCardListTitle, setNewCardListTitle] = useState<string>("")

    const handleAddCardList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addCardList(newCardListTitle);
    }

    return (
        <div className="dnd-list add-card-list">
            <form onSubmit={e => handleAddCardList(e)}>
                <textarea className="add-card-textarea" name="cardListTitle" placeholder="New list..."
                    onChange={e => setNewCardListTitle(e.target.value)}></textarea>
                <button className="add-card-button">Add List</button>
            </form>
        </div>
    )
}

export default AddCardList