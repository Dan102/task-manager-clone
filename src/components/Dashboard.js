import React, { useState } from 'react'
import BoardPreview from './BoardPreview'
import AddBoard from './AddBoard'

function Dashboard() {

    const data = [
        {
            id: 0,
            title: "School"
        },
        {
            id: 1,
            title: "Work"
        },
        {
            id: 2,
            title: "Microsoft 2021"
        },
        { 
            id: 3,
            title: "Interviews"
        },
        {
            id: 4,
            title: "K8"
        },
        {
            id: 5,
            title: "K8 MIT 2021"
        },
        {
            id: 6,
            title: "Project hapiness"
        },
        {
            id: 7,
            title: "Project hapiness 2.0"
        }
    ]

    const [boards, setBoards] = useState(data)
    let nextId = 8 

    const removeBoard = (e, removeIndex) => {
        setBoards((oldBoards) => {
            return oldBoards.filter((board) => board.id != removeIndex)
        })
    }

    const addBoard = (title) => {
        setBoards((oldBoards) => {
            return [...oldBoards, {
                id: nextId++,
                title: title
            }]
        })
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