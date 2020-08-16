import React, {useState} from "react"
import Card from "./Card"
import AddCard from "./AddCard"


const CardList = (props) => {
    return (
        <div className="dnd-list">
            <button className="board-remove" onClick={(e) => props.removeCardList(e, props.listIndex)}>x</button>
            <span className="card-list-title">{props.list.title}</span>
            {props.list.cards.map((card, cardIndex) => {
                return <Card
                          key={cardIndex}
                          showCardDetail={props.showCardDetail}
                          listIndex={props.listIndex} card={card} cardIndex={cardIndex} detailLevel={props.detailLevel}
                          handleDragStart={props.handleDragStart} handleDragEnter={props.handleDragEnter}/>
            })}            
            <AddCard 
                handleDragEnter={props.handleDragEnter} addCard={props.addCard}
                listIndex={props.listIndex} listSize={props.list.length}/>
        </div>
    );
}

export default CardList;