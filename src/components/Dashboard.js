import React, { useState, useEffect } from 'react'
import BoardPreview from './BoardPreview'
import AddBoard from './AddBoard'

function Dashboard() {

    const [boards, setBoards] = useState([])
    const [globalBoardNextId, setGlobalBoardNextId] = useState(0);

    useEffect(() => {
        const currentBoardPreviewList = JSON.parse(localStorage.getItem("boardPreviewList"))
        const currentGlobalBoardNextId = JSON.parse(localStorage.getItem("globalBoardNextId"))
        console.log("Loading: ", currentBoardPreviewList, currentGlobalBoardNextId)
        if (currentGlobalBoardNextId != undefined) {
            setGlobalBoardNextId(currentGlobalBoardNextId)
        }
        if (currentBoardPreviewList) {
            setBoards(currentBoardPreviewList)
        }
    }, []);

    useEffect(() => {
        if (boards != [] && boards != undefined) {
            console.log("Saving: ", boards, globalBoardNextId)
            localStorage.setItem("boardPreviewList", JSON.stringify(boards))
            localStorage.setItem("globalBoardNextId", JSON.stringify(globalBoardNextId))
        }
    }, [boards]);

    const addBoard = (title) => {
        setBoards((oldBoards) => {
            const currentGlobalBoardNextId = globalBoardNextId;
            setGlobalBoardNextId(globalBoardNextId + 1)
            return [...oldBoards, {
                id: currentGlobalBoardNextId,
                title: title
            }]
        })
    }

    const removeBoard = (removeId) => {
        setBoards((oldBoards) => {
            return oldBoards.filter((board) => board.id != removeId)
        })
        localStorage.removeItem("board" + removeId)
    }

    return (
        <div className="dnd-dashboard">
            <div className="dnd-board-list">
                {boards.map((board) => (                 
                    <BoardPreview board={board} removeBoard={removeBoard}/>
                ))}
                <AddBoard addBoard={addBoard}/>
            </div>
        </div>
    )
}

export default Dashboard