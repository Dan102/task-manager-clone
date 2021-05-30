import React, { useState, FormEvent } from 'react';

interface IAddCardProps {
  listId: number;
  listIndex: number;
  listSize: number;
  addCard: (title: string, listIndex: number) => void;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => void;
}

const AddCard = ({ listId, listIndex, listSize, addCard, handleDragEnter }: IAddCardProps) => {
  const [newCardTitle, setNewCardTitle] = useState<string>('');

  const handleAddCard = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCard(newCardTitle, listId);
  };

  return (
    <div
      onDragEnter={(e) => handleDragEnter(e, listIndex, listSize - 1)}
      onDragOver={(e) => e.preventDefault()}
      className="add-card"
    >
      <form onSubmit={(e) => handleAddCard(e)}>
        <textarea
          className="add-card-textarea"
          name="cardTitle"
          placeholder="New card..."
          onChange={(e) => setNewCardTitle(e.target.value)}
        ></textarea>
        <button className="add-card-button">Add Card</button>
      </form>
    </div>
  );
};

export default AddCard;
