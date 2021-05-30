import React, { useState } from 'react';

interface IAddBoardProps {
  addBoard: (title: string) => void;
}

const AddBoard = ({ addBoard }: IAddBoardProps) => {
  const [newBoardTitle, setNewBoardTitle] = useState<string>('');

  const handleAddBoard = function (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    addBoard(newBoardTitle);
  };

  return (
    <div className="dnd-board-item" style={{ background: 'transparent' }}>
      <form onSubmit={(e) => handleAddBoard(e)}>
        <textarea
          className="add-board-textarea"
          name="cardTitle"
          placeholder="New board..."
          onChange={(e) => setNewBoardTitle(e.target.value)}
        ></textarea>
        <button className="add-board-button">Add Board</button>
      </form>
    </div>
  );
};

export default AddBoard;
