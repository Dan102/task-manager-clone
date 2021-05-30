import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import ICard from '../models/interfaces/ICard';
import IClickedInfo from '../models/interfaces/IClickedInfo';

interface ICardDetailProps {
  clickedInfo: IClickedInfo | undefined;
  removeCard: (cardId: number, listIndex: number) => void;
  updateCard: (card: ICard) => void;
}

function CardDetail({ clickedInfo, removeCard, updateCard }: ICardDetailProps) {
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newDeadline, setNewDeadline] = useState<Date>(new Date());
  const [newPriority, setNewPriority] = useState<number>(1);

  useEffect(() => {
    if (clickedInfo === undefined) {
      return;
    }
    setNewTitle(() => {
      return clickedInfo.card.title;
    });
    setNewDescription(() => {
      return clickedInfo.card.description;
    });
    setNewDeadline(() => {
      return new Date(clickedInfo.card.deadline);
    });
    setNewPriority(() => {
      return clickedInfo.card.priority;
    });
  }, [clickedInfo, removeCard, updateCard]);

  const switchOffDetail = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    (document.getElementById('card-detail-background') as HTMLFormElement).style.display = 'none';
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.classList.remove('darken-page');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchOffDetail(e);
    if (clickedInfo === undefined) {
      return;
    }
    updateCard({
      id: clickedInfo.card.id,
      title: newTitle,
      description: newDescription,
      deadline: newDeadline,
      priority: newPriority,
    });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (clickedInfo === undefined) {
      return;
    }
    removeCard(clickedInfo.card.id, clickedInfo.listIndex);
    switchOffDetail(e);
  };

  return (
    <div id="card-detail-background" onClick={(e) => switchOffDetail(e)}>
      <div
        id="card-detail"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form className="card-detail-container" onSubmit={(e) => handleSubmit(e)}>
          <div className="card-detail-inline">
            <span className="card-detail-title">title:</span>
            <button className="delete-button" onClick={(e) => handleDelete(e)}>
              remove
            </button>
          </div>
          <textarea name="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}></textarea>
          <div className="card-detail-title">description:</div>
          <textarea
            name="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          ></textarea>
          <div className="card-detail-title">deadline: </div>
          <input
            name="date"
            type="date"
            value={Moment(newDeadline).format('YYYY-MM-DD')}
            onChange={(e) => setNewDeadline(new Date(e.target.value))}
          ></input>
          <div className="card-detail-title">priority: </div>
          <input
            name="priority"
            type="number"
            min="1"
            max="5"
            value={newPriority || 1}
            onChange={(e) => setNewPriority(parseInt(e.target.value))}
          ></input>
          <div className="card-detail-inline" style={{ marginTop: '18px' }}>
            <span className="save-button-section">
              <input type="submit" value="Save" className="save-button"></input>
            </span>
            <button className="cancel-button" onClick={(e) => switchOffDetail(e)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardDetail;
