import React, { useState, useEffect } from 'react'
import BoardPreview from './BoardPreview'
import AddBoard from './AddBoard'
import IBoardPreview from '../models/interfaces/IBoardPreview';
import getBoardPreviewsRequest from '../api/requests/getBoardPreviewsRequest';
import addBoardRequest from '../api/requests/addBoardRequest';
import removeBoardRequest from '../api/requests/removeBoardRequest';

function Dashboard() {

    const [boardPreviews, setBoardPreviews] = useState<IBoardPreview[]>([])

    useEffect(() => {
        document.title = 'Dashboard';
        getBoardPreviews();
    }, []);

    const getBoardPreviews = () => {
        getBoardPreviewsRequest().then(response => {
            setBoardPreviews(response.data)
        })
    }

    const addBoard = (title: string) => {
        addBoardRequest(title).then(_response => getBoardPreviews());
    }

    const removeBoard = (boardId: number) => {
        if(!boardPreviews.filter(bp => bp.id === boardId)[0].isEmpty && !window.confirm("You are going to delete non empty board. Are you sure?")) {
            return;
        }
        removeBoardRequest(boardId).then(_response => getBoardPreviews());
    }

    return (
        <div className="dnd-dashboard">
            <div className="dnd-board-list">
                {boardPreviews.map((boardPreview) => (
                    <BoardPreview key={boardPreview.id} boardPreview={boardPreview} removeBoard={removeBoard}/>
                ))}
                <AddBoard addBoard={addBoard}/>
            </div>
        </div>
    )
}

export default Dashboard