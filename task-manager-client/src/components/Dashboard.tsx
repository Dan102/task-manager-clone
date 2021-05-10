import React, { useState, useEffect } from 'react'
import BoardPreview from './BoardPreview'
import AddBoard from './AddBoard'
import IBoardPreview from '../models/interfaces/IBoardPreview';
import getBoardPreviewsRequest from '../api/requests/getBoardPreviewsRequest';
import addBoardRequest from '../api/requests/addBoardRequest';
import removeBoardRequest from '../api/requests/removeBoardRequest';
import SpinnerPage from './SpinnerPage';
import updateBoardPreviewRequest from '../api/requests/updateBoardPreviewRequest';
import TopDashboardPanel from './TopDashboardPanel';

function Dashboard() {

    const [boardPreviews, setBoardPreviews] = useState<IBoardPreview[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        document.title = 'Dashboard';
        getBoardPreviews();
    }, []);

    useEffect(() => {
        if (boardPreviews) {
            setIsLoading(false);
        }
    }, [boardPreviews])

    const getBoardPreviews = () => {
        setIsLoading(true);
        getBoardPreviewsRequest().then(response => {
            response.data.sort((x, y) => +y.isFavourite - +x.isFavourite);
            setBoardPreviews(response.data)
        })
    }

    const addBoard = (title: string) => {
        addBoardRequest(title).then(_response => getBoardPreviews());
    }

    const removeBoard = (boardId: number) => {
        if(!boardPreviews?.filter(bp => bp.id === boardId)[0].isEmpty && !window.confirm("You are going to delete non empty board. Are you sure?")) {
            return;
        }
        removeBoardRequest(boardId).then(_response => getBoardPreviews());
    }

    const changeBoardFavouriteStatus = (boardId: number) => {
        const chosenBoard = boardPreviews?.filter(x => x.id === boardId)[0];
        console.log(chosenBoard, !chosenBoard?.isFavourite)
        if (chosenBoard) {
            updateBoardPreviewRequest(boardId, !chosenBoard.isFavourite).then(
              x => getBoardPreviews()
            );
        }
    }

    return (
        <SpinnerPage isLoading={isLoading ?? true} component={
            <>
                <TopDashboardPanel/>
                <div className="dnd-dashboard">
                    <div className="dashboard-board-list">
                        {boardPreviews &&
                            <>
                                {
                                    boardPreviews.map((boardPreview) => (
                                        <BoardPreview key={boardPreview.id} boardPreview={boardPreview} changeBoardFavouriteStatus={changeBoardFavouriteStatus} removeBoard={removeBoard} />
                                    ))
                                }
                                <AddBoard addBoard={addBoard} />
                            </>
                        }
                    </div>
                </div>
            </>
        }
        />
    )
}

export default Dashboard