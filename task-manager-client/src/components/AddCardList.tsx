import React, { useState } from 'react';
import ListColors from '../models/enums/ListColors';

interface IAddCardListProps {
    addCardList: (title: string, color: string) => void;
}

const AddCardList = ({ addCardList }: IAddCardListProps) => {
    const [newCardListColor, setNewCardListColor] = useState<ListColors>(ListColors.Pink);
    const [newCardListTitle, setNewCardListTitle] = useState<string>('');

    const handleAddCardList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addCardList(newCardListTitle, newCardListColor);
    };

    const handleSetListColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCardListColor(e.target.value as ListColors);
    };

    return (
        <div className="dnd-list add-card-list">
            <form onSubmit={(e) => handleAddCardList(e)}>
                <textarea
                    className="add-card-textarea"
                    name="cardListTitle"
                    placeholder="New list..."
                    onChange={(e) => setNewCardListTitle(e.target.value)}
                ></textarea>
                <div className="add-card-colors">
                    <div>
                        <input
                            type="radio"
                            id="pink"
                            name="color"
                            value={ListColors.Pink}
                            checked={newCardListColor === ListColors.Pink}
                            onChange={(e) => handleSetListColor(e)}
                        />
                        <label
                            htmlFor="pink"
                            className="add-card-colors-square"
                            style={{ background: ListColors.Pink }}
                        ></label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="yellow"
                            name="color"
                            value={ListColors.Yellow}
                            checked={newCardListColor === ListColors.Yellow}
                            onChange={(e) => handleSetListColor(e)}
                        />
                        <label
                            htmlFor="yellow"
                            className="add-card-colors-square"
                            style={{ background: ListColors.Yellow }}
                        ></label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="green"
                            name="color"
                            value={ListColors.Green}
                            checked={newCardListColor === ListColors.Green}
                            onChange={(e) => handleSetListColor(e)}
                        />
                        <label
                            htmlFor="green"
                            className="add-card-colors-square"
                            style={{ background: ListColors.Green }}
                        ></label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="light-blue"
                            name="color"
                            value={ListColors.LightBlue}
                            checked={newCardListColor === ListColors.LightBlue}
                            onChange={(e) => handleSetListColor(e)}
                        />
                        <label
                            htmlFor="light-blue"
                            className="add-card-colors-square"
                            style={{ background: ListColors.LightBlue }}
                        ></label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="dark-blue"
                            name="color"
                            value={ListColors.DarkBlue}
                            checked={newCardListColor === ListColors.DarkBlue}
                            onChange={(e) => handleSetListColor(e)}
                        />
                        <label
                            htmlFor="dark-blue"
                            className="add-card-colors-square"
                            style={{ background: ListColors.DarkBlue }}
                        ></label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="purple"
                            name="color"
                            value={ListColors.Purple}
                            checked={newCardListColor === ListColors.Purple}
                            onChange={(e) => handleSetListColor(e)}
                        />
                        <label
                            htmlFor="purple"
                            className="add-card-colors-square"
                            style={{ background: ListColors.Purple }}
                        ></label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="mauve"
                            name="color"
                            value={ListColors.Mauve}
                            checked={newCardListColor === ListColors.Mauve}
                            onChange={(e) => handleSetListColor(e)}
                        />
                        <label
                            htmlFor="mauve"
                            className="add-card-colors-square"
                            style={{ background: ListColors.Mauve }}
                        ></label>
                    </div>
                </div>
                <button className="add-card-button">Add List</button>
            </form>
        </div>
    );
};

export default AddCardList;
