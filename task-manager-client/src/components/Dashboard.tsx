import React, { useState, useEffect } from 'react'
import BoardPreview from './BoardPreview'
import AddBoard from './AddBoard'
import IBoardPreview from '../models/IBoardPreview';
import { APP_SETTINGS } from '../app-settings';
import axios from 'axios';

function Dashboard() {

    const [boardPreviews, setBoardPreviews] = useState<IBoardPreview[]>([])

    useEffect(() => {
        document.title = 'Dashboard';
        getBoardPreviews();
    }, []);

    const getBoardPreviews = () => {
        axios.get<IBoardPreview[]>(APP_SETTINGS.boardsUrl)
            .then(response => {
                setBoardPreviews(response.data)
            })
    }

    const addBoard = (title: string) => {
        axios.post<void>(APP_SETTINGS.boardsUrl, '"' + title.trim() + '"')
            .then(response => getBoardPreviews());
    }

    const removeBoard = (boardId: number) => {
        if(!boardPreviews.filter(bp => bp.id === boardId)[0].isEmpty && !window.confirm("You are going to delete non empty board. Are you sure?")) {
            return;
        }
        axios.delete<void>(APP_SETTINGS.boardsUrl + "/" + boardId)
            .then(response => getBoardPreviews());
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