import React, { useState, useEffect } from 'react'
import BoardPreview from './BoardPreview'
import AddBoard from './AddBoard'
import IBoardPreview from '../models/IBoardPreview';
import { APP_SETTINGS } from '../app-settings';

function Dashboard() {

    const [boardPreviews, setBoardPreviews] = useState<IBoardPreview[]>([])

    useEffect(() => {
        document.title = 'Dashboard';
        fetchBoardPreviews();
    }, []);

    const fetchBoardPreviews = () => {
        fetch(APP_SETTINGS.boardsUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(response => {
            console.log(response)
            setBoardPreviews(response)
        })
    }

    const addBoard = (title: string) => {
        fetch(APP_SETTINGS.boardsUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: '"' + title.trim() + '"'
        }).then(response => fetchBoardPreviews());
    }

    const removeBoard = (boardId: number) => {
        if(!boardPreviews.filter(bp => bp.id === boardId)[0].isEmpty && !window.confirm("You are going to delete non empty board. Are you sure?")) {
            return;
        }
        fetch(APP_SETTINGS.boardsUrl + "/" + boardId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => fetchBoardPreviews());
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