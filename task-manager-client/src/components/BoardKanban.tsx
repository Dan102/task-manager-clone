import React from 'react';
import ICardList from '../models/interfaces/ICardList';
import AddCardList from './AddCardList';
import { CardPosition } from './Board';
import CardList from './CardList';

interface IBoardKanbanProps {
  lists: ICardList[] | undefined;
  addCardList: (title: string, color: string) => void;
  removeCardList: (listId: number) => void;
  addCard: (title: string, listId: number) => void;
  showCardDetail: (listIndex: number, cardIndex: number) => void;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, listIndex: number, cardIndex: number) => void;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => void;
  targetDragCard: CardPosition | null;
}

const BoardKanban = ({
  lists,
  addCardList,
  removeCardList,
  addCard,
  showCardDetail,
  handleDragStart,
  handleDragEnter,
  handleDrop,
  targetDragCard,
}: IBoardKanbanProps): JSX.Element => {
  return (
    <div className="dnd-board">
      {lists && (
        <>
          {lists?.map((list, listIndex) => (
            <CardList
              key={listIndex}
              addCard={addCard}
              showCardDetail={showCardDetail}
              removeCardList={removeCardList}
              list={list}
              listIndex={listIndex}
              handleDragStart={handleDragStart}
              handleDragEnter={handleDragEnter}
              handleDrop={handleDrop}
              targetDragCard={targetDragCard}
            />
          ))}
          <AddCardList addCardList={addCardList} />
        </>
      )}
    </div>
  );
};

export default BoardKanban;
