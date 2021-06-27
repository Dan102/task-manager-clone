import React, { useState, FormEvent } from 'react';
import { CardPosition } from './Board';

interface IAddCardProps {
  listId: number;
  listIndex: number;
  listSize: number;
  addCard: (title: string, listId: number) => void;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => void;
  targetDragCard: CardPosition | null;
}

const AddCard = ({ listId, listIndex, listSize, addCard, handleDragEnter, handleDrop, targetDragCard }: IAddCardProps): JSX.Element => {
  const [newCardTitle, setNewCardTitle] = useState<string>('');

  const handleAddCard = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCard(newCardTitle, listId);
  };

  return (
    <div
      onDragEnter={(e) => handleDragEnter(e, listIndex, listSize)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, listIndex, listSize)}
      className={"add-card" +
        (targetDragCard?.listIndex === listIndex && targetDragCard.cardIndex === listSize ? " drag-enter-top" : "")}
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
