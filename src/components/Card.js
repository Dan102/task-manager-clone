import React, {useState, useRef} from "react"

function Card(props) {
    return (
        <div
            draggable="true"
            onClick = {(e) => (alert("hi"))}
            onDragStart = {(e) => props.handleDragStart(e, props.listIndex, props.cardIndex)}
            onDragEnter = {(e) => props.handleDragEnter(e, props.listIndex, props.cardIndex)}
            className="dnd-card">
            <div className="card-heading">
                <div className="card-title"> {props.card.title} </div>
                <div className="card-deadline">17.5.</div>
                <div className="card-priority">1</div>
            </div>
            <div className="card-description"> Si vis pacem para belum si vic pacem para belum si vis pacem para belum vic pacem para belum si vis pacem para belum </div>
        </div>
    )
}

export default Card;