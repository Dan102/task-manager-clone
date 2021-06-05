import React from 'react';
import Moment from 'moment';
import ICard from '../models/interfaces/ICard';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../store/store';
import { CardPosition } from './Board';

interface ICardProps {
  card: ICard;
  listIndex: number;
  cardIndex: number;
  showCardDetail: (listIndex: number, cardIndex: number) => void;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, listIndex: number, cardIndex: number) => void;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => void;
  targetDragCard: CardPosition | null;
}

const Card = ({
  card,
  listIndex,
  cardIndex,
  showCardDetail,
  handleDragStart,
  handleDragEnter,
  handleDrop,
  targetDragCard,
}: ICardProps) => {
  const detailLevel = useSelector<IApplicationState, number>((x) => x.settings.detailLevel);

  const handleCardClicked = () => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.classList.add('darken-page');
    }
    const cardDetailBackground = document.getElementById('card-detail-background');
    if (cardDetailBackground) {
      cardDetailBackground.style.display = 'block';
    }
    showCardDetail(listIndex, cardIndex);
  };

  const getCardClassName = (): string => {
    let className = detailLevel >= 2 ? 'dnd-card-big' : 'dnd-card-small';
    if (targetDragCard?.cardIndex === cardIndex && targetDragCard.listIndex === listIndex) {
      className += ' drag-enter-top';
    }
    return className;
  };

  return (
    <div className="dnd-card-container"
      onClick={() => handleCardClicked()}
      onDragStart={(e) => handleDragStart(e, listIndex, cardIndex)}
      onDragEnter={(e) => handleDragEnter(e, listIndex, cardIndex)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, listIndex, cardIndex)}
      draggable="true"
    >
      <div className={getCardClassName()}>
        <div className="card-heading">
          <div className="card-title">{card.title}</div>
          {detailLevel === 3 && (
            <>
              <div className="card-deadline">{Moment(card.deadline).format('DD.M')}</div>
              <div className="card-priority">{card.priority}</div>
            </>
          )}
        </div>
        {detailLevel >= 2 && <div className="card-description">{card.description}</div>}
      </div>
    </div>
  );
};

export default Card;
