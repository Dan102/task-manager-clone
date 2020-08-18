import React, { useState, useEffect } from 'react'
import BoardPreview from './BoardPreview'
import AddBoard from './AddBoard'
import IBoardPreview from '../models/IBoardPreview';

function Dashboard() {

    const [boardPreviews, setBoardPreviews] = useState<IBoardPreview[]>([])
    const [globalBoardNextId, setGlobalBoardNextId] = useState<number>(0);

    useEffect(() => {
        const currentBoardPreviewList: IBoardPreview[] = JSON.parse(localStorage.getItem("boardPreviewList") ?? "[]")
        const currentGlobalBoardNextId: number = JSON.parse(localStorage.getItem("globalBoardNextId") ?? "0")
        console.log("Loading: ", currentBoardPreviewList, currentGlobalBoardNextId)
        if (currentGlobalBoardNextId != undefined) {
            setGlobalBoardNextId(currentGlobalBoardNextId)
        }
        if (currentBoardPreviewList) {
            setBoardPreviews(currentBoardPreviewList)
        }
    }, []);

    useEffect(() => {
        if (boardPreviews != [] && boardPreviews != undefined) {
            console.log("Saving: ", boardPreviews, globalBoardNextId)
            localStorage.setItem("boardPreviewList", JSON.stringify(boardPreviews))
            localStorage.setItem("globalBoardNextId", JSON.stringify(globalBoardNextId))
        }
    }, [boardPreviews]);

    const addBoard = (title: string) => {
        setBoardPreviews((oldBoardPreviews) => {
            const currentGlobalBoardNextId = globalBoardNextId;
            setGlobalBoardNextId(globalBoardNextId + 1)
            return [...oldBoardPreviews, {
                id: currentGlobalBoardNextId,
                title: title
            }]
        })
    }

    const removeBoard = (boardId: number) => {
        setBoardPreviews((oldBoardPreviews) => {
            return oldBoardPreviews.filter((boardPreview) => boardPreview.id != boardId)
        })
        localStorage.removeItem("board" + boardId)
    }

    return (
        <div className="dnd-dashboard">
            <div className="dnd-board-list">
                {boardPreviews.map((boardPreview) => (                 
                    <BoardPreview boardPreview={boardPreview} removeBoard={removeBoard}/>
                ))}
                <AddBoard addBoard={addBoard}/>
            </div>
        </div>
    )
}

export default Dashboard