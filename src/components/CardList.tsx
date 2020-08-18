import React, {useState} from "react"
import Card from "./Card"
import AddCard from "./AddCard"
import IList from "../models/IList";

interface ICardListProps {
    list: IList;
    listIndex: number;
    detailLevel: number;
    showCardDetail: (listIndex: number, cardIndex: number) => void;
    addCard: (title: string, listIndex: number) => void;
    removeCardList: (listId: number) => void;
    handleDragStart: (e: React.DragEvent<HTMLDivElement>, listIndex: number, cardIndex: number) => void;
    handleDragEnter: (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => void;
}

const CardList = ({list, listIndex, detailLevel, showCardDetail, addCard, removeCardList, handleDragStart, handleDragEnter}: ICardListProps) => {

    return (
        <div className="dnd-list">
            <button className="board-remove" onClick={(e) => removeCardList(list.id)}>x</button>
            <span className="card-list-title">{list.title}</span>
            {list.cards.map((card, cardIndex) => {
                return <Card
                          key={cardIndex}
                          showCardDetail={showCardDetail}
                          listIndex={listIndex} card={card} cardIndex={cardIndex} detailLevel={detailLevel}
                          handleDragStart={handleDragStart} handleDragEnter={handleDragEnter}/>
            })}            
            <AddCard 
                handleDragEnter={handleDragEnter} addCard={addCard}
                listIndex={listIndex} listSize={list.cards.length}/>
        </div>
    );
}

export default CardList;