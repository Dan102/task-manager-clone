import React from 'react'
import ICardList from '../models/interfaces/ICardList'
import AddCardList from './AddCardList'
import CardList from './CardList'

interface IBoardKanbanProps {
    lists: ICardList[] | undefined;
    addCardList: (title: string, color: string) => void;
    removeCardList: (listId: number) => void;
    addCard: (title: string, listIndex: number) => void;
    showCardDetail: (listIndex: number, cardIndex: number) => void;
    handleDragStart: (e: React.DragEvent<HTMLDivElement>, listIndex: number, cardIndex: number) => void;
    handleDragEnter: (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => void;
}

const BoardKanban = ({lists, addCardList, removeCardList, addCard, showCardDetail, handleDragStart, handleDragEnter}: IBoardKanbanProps) => {

    return (
        <div className="dnd-board">
            {lists &&
                <>
                    {lists?.map((list, listIndex) => (
                        <CardList
                            key={listIndex}
                            addCard={addCard} showCardDetail={showCardDetail} removeCardList={removeCardList}
                            list={list} listIndex={listIndex}
                            handleDragStart={handleDragStart} handleDragEnter={handleDragEnter} />
                    ))}
                    <AddCardList addCardList={addCardList} />
                </>
            }
        </div>
    )
}

export default BoardKanban;