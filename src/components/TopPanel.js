import React from "react"

const TopPanel = () => {
    return (
        <div className="top-panel">
            <div className="option-section">
                <span className="top-panel-title">Detail:</span>
                <form>
                    <input className="slider" type="range" min="1" max="3" />
                </form>
            </div>
            <div className="option-section">
                <span className="top-panel-title">Sort:</span>
                <select name="sort" id="sort">
                    <option value="Own">Own</option>
                    <option value="Deadline">Deadline</option>
                    <option value="Priority">Priority</option>
                </select>
                {/* <form>
                    <input type="radio" id="sort1" name="sort" value="Own" defaultChecked/>
                    <label for="sort1">Own</label>
                    <input type="radio" id="sort2" name="sort" value="Deadline"/>
                    <label for="sort2">Deadline</label>
                    <input type="radio" id="sort3" name="sort" value="Priority"/>
                    <label for="sort3">Priority</label>
                </form> */}
            </div>
        </div>
    )
}

export default TopPanel;