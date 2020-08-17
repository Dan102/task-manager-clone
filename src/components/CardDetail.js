import React, {useState, useEffect} from "react"
import Moment from "moment"
import Card from "./Card";

function CardDetail(props) {
    
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newDeadline, setNewDeadline] = useState(new Date())
    const [newPriority, setNewPriority] = useState(1)

    useEffect(() => {
        if (props.card.card === null) {
            return
        }
        setNewTitle(() => {return props.card.card.title})
        setNewDescription(() => {return props.card.card.description})
        setNewDeadline(() => {return new Date(props.card.card.deadline)})
        setNewPriority(() => {return props.card.card.priority})
    }, [props]);

    const switchOffDetail = (e) => {
        e.preventDefault();
        document.getElementById("card-detail-background").style.display = "none";
        document.querySelector("html").classList.remove("darken-page");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        switchOffDetail(e)
        props.updateCard(props.card.listIndex, {
            id: props.card.card.id,
            title: newTitle,
            description: newDescription,
            deadline: newDeadline,
            priority: newPriority
        })        
    }

    return (
        <div id="card-detail-background" onClick={switchOffDetail}>
            <div id="card-detail" onClick={(e) => {e.stopPropagation()}}>
                <form className="card-detail-container" onSubmit={handleSubmit}>
                    <div className="card-detail-inline">
                        <span className="card-detail-title">title:</span>
                        <button className="delete-button" onClick={(e) => props.removeCard(props.card.card.id, props.card.listIndex)}>remove</button>
                    </div>
                    <textarea name="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}></textarea>
                    <div className="card-detail-title">description:</div>
                    <textarea name="description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}></textarea>
                    <div className="card-detail-title">deadline: </div>
                    <input name="date" type="date" value={Moment(newDeadline).format("YYYY-MM-DD")} onChange={(e) => setNewDeadline(e.target.value)}></input>
                    <div className="card-detail-title">priority: </div>
                    <input name="priority" type="number" name="priority" min="1" max="5" value={newPriority || 1} onChange={(e) => setNewPriority(e.target.value)}></input>
                    <div className="card-detail-inline" style={{marginTop: "18px"}}>
                        <span className="save-button-section">
                            <input type="submit" value="Save" className="save-button"></input>
                        </span>
                        <button className="cancel-button" onClick={switchOffDetail}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CardDetail