import React, {useState} from "react"
import Card from "./Card"
import AddCard from "./AddCard"


const CardList = ({list, listIndex, detailLevel, showCardDetail, addCard, removeCardList, handleDragStart, handleDragEnter}) => {

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
                listIndex={listIndex} listSize={list.length}/>
        </div>
    );
}

export default CardList;