import React from 'react';
import { Link } from 'react-router-dom';
import IBoardPreview from '../models/interfaces/IBoardPreview';

interface IBoardPreviewProps {
  boardPreview: IBoardPreview;
  removeBoard: (boardId: number) => void;
  changeBoardFavouriteStatus: (boardId: number) => void;
}

const BoardPreview = ({ boardPreview, removeBoard, changeBoardFavouriteStatus }: IBoardPreviewProps) => {
  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    removeBoard(boardPreview.id);
  };

  const handleChangeBoardFavouriteStatusClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    changeBoardFavouriteStatus(boardPreview.id);
  };

  return (
    <Link to={'/Board/' + boardPreview.id} className="dnd-board-item">
      <button
        className={boardPreview.isFavourite ? 'board-favourite-active' : 'board-favourite-inactive'}
        onClick={(e) => handleChangeBoardFavouriteStatusClick(e)}
      >
        &#x2605;
      </button>
      <button className="board-remove" onClick={(e) => handleRemoveClick(e)}>
        X
      </button>
      <div className="board-title">{boardPreview.title}</div>
    </Link>
  );
};

export default BoardPreview;
