import React, {useState} from "react"
import Moment from "moment"
import Card from "./Card";

function CardDetail(props) {
    
    const [num, setNum] = useState(2)

    const switchOffDetail = (e) => {
        e.target.style.display = "none";
        document.querySelector("html").classList.remove("darken-page");
    }

    return (
        <div id="card-detail-background" onClick={switchOffDetail}>
            <div id="card-detail" onClick={(e) => {e.stopPropagation()}}>
                <div>
                    <div>
                        <div>title:</div>
                        <textarea value={props.card.title}></textarea>
                    </div>
                    <div>
                        <div>description:</div>
                        <textarea value={props.card.description}></textarea>
                    </div>
                    <div>
                        <div>deadline: </div>
                        <input type="date" value={props.card.deadline}></input>
                        <div>priority: </div>
                        <input type="number" name="priority" min="1" max="5" value={num} onChange={(e) => setNum(e.target.value)}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardDetail