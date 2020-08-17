import React, {useState, useRef} from "react"
import Moment from 'moment'

const Card = ({card, listIndex, cardIndex, detailLevel, showCardDetail, handleDragStart, handleDragEnter}) => {

    const handleCardClicked = (e) => {
        document.querySelector("html").classList.add("darken-page");
        document.getElementById("card-detail-background").style.display = "block";
        showCardDetail(listIndex, cardIndex)
    }

    return (
        <div
            draggable="true"
            onClick = {handleCardClicked}
            onDragStart = {(e) => handleDragStart(e, listIndex, cardIndex)}
            onDragEnter = {(e) => handleDragEnter(e, listIndex, cardIndex)}
            onDragOver = {(e) => e.preventDefault()}
            className={detailLevel <= 2 ? "dnd-card-big" : "dnd-card-small"}>
            <div className="card-heading">
                <div className="card-title">{card.title}</div>
                {detailLevel == 1 &&
                    <>
                        <div className="card-deadline">{Moment(card.deadline).format('DD.M')}</div>
                        <div className="card-priority">{card.priority}</div>
                    </>
                }
            </div>
            {detailLevel <= 2 &&
                <div className="card-description">{card.description}</div>
            }
        </div>
    )
}

export default Card;