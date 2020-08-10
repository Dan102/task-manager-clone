import React, {useState, useRef} from "react"
import Moment from 'moment'

function Card(props) {

    function handleCardClicked(e) {
        document.querySelector("html").classList.add("darken-page");
        document.getElementById("card-detail-background").style.display = "block";
        props.showCardDetail(props.listIndex, props.cardIndex)
    }

    return (
        <div
            draggable="true"
            onClick = {handleCardClicked}
            onDragStart = {(e) => props.handleDragStart(e, props.listIndex, props.cardIndex)}
            onDragEnter = {(e) => props.handleDragEnter(e, props.listIndex, props.cardIndex)}
            className="dnd-card">
            <div className="card-heading">
                <div className="card-title">{props.card.title}</div>
                <div className="card-deadline">{Moment(props.card.deadline).format('DD.M')}</div>
                <div className="card-priority">{props.card.priority}</div>
            </div>
            <div className="card-description">{props.card.description}</div>
        </div>
    )
}

export default Card;