import React from 'react';
import Card from './Card';
import AddCard from './AddCard';
import ICardList from '../models/interfaces/ICardList';
import ListColors from '../models/enums/ListColors';
import { CardPosition } from './Board';

interface ICardListProps {
  list: ICardList;
  listIndex: number;
  showCardDetail: (listIndex: number, cardIndex: number) => void;
  addCard: (title: string, listId: number) => void;
  removeCardList: (listId: number) => void;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, listIndex: number, cardIndex: number) => void;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => void;
  targetDragCard: CardPosition | null;
}

const CardList = ({
  list,
  listIndex,
  showCardDetail,
  addCard,
  removeCardList,
  handleDragStart,
  handleDragEnter,
  handleDrop,
  targetDragCard,
}: ICardListProps): JSX.Element => {
  return (
    <div className="dnd-list" style={{ '--bg-color': list.color ?? ListColors.Green } as React.CSSProperties}>
      <button className="board-remove" onClick={() => removeCardList(list.id)}>
        x
      </button>
      <span className="card-list-title">{list.title}</span>
      {list.cards.map((card, cardIndex) => {
        return (
          <Card
            key={cardIndex}
            showCardDetail={showCardDetail}
            listIndex={listIndex}
            card={card}
            cardIndex={cardIndex}
            handleDragStart={handleDragStart}
            handleDragEnter={handleDragEnter}
            handleDrop={handleDrop}
            targetDragCard={targetDragCard}
          />
        );
      })}
      <AddCard
        handleDragEnter={handleDragEnter}
        handleDrop={handleDrop}
        targetDragCard={targetDragCard}
        addCard={addCard}
        listId={list.id}
        listIndex={listIndex}
        listSize={list.cards.length}
      />
    </div>
  );
};

export default CardList;
