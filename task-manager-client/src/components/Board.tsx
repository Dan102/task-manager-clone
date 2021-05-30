import React, { useState, useRef, useEffect } from 'react';
import TopBoardPanel from './TopBoardPanel';
import CardDetail from './CardDetail';
import ICard from '../models/interfaces/ICard';
import ICardList from '../models/interfaces/ICardList';
import IClickedInfo from '../models/interfaces/IClickedInfo';
import SortSettings from '../models/enums/SortSettings';
import getBoardRequest from '../api/requests/getBoardRequest';
import addCardRequest from '../api/requests/addCardRequest';
import removeCardRequest from '../api/requests/removeCardRequest';
import removeCardListRequest from '../api/requests/removeCardListRequest';
import updateCardRequest from '../api/requests/updateCardRequest';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerPage from './SpinnerPage';
import { changeSortSettingsAction } from '../store/reducers/settingsReducer';
import { IApplicationState } from '../store/store';
import BoardKanban from './BoardKanban';
import addCardListRequest from '../api/requests/addCardListRequest';
import DisplaySettings from '../models/enums/DisplaySettings';
import BoardTable from './BoardTable';

interface MatchParams {
  id: string;
}

const Board = () => {
  const { id: boardIdUrlParam } = useParams<MatchParams>();
  const [lists, setLists] = useState<ICardList[]>();
  const [clickedInfo, setClickedInfo] = useState<IClickedInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const sortSettings = useSelector<IApplicationState, SortSettings>((x) => x.settings.sortSettings);
  const displaySettings = useSelector<IApplicationState, DisplaySettings>((x) => x.settings.displaySettings);
  const dispatch = useDispatch();
  const dragCard = useRef<{ listIndex: number; cardIndex: number }>();

  useEffect(() => {
    document.title = 'Board';
    fetchBoard(boardIdUrlParam);
  }, [boardIdUrlParam]);

  useEffect(() => {
    if (lists) {
      setIsLoading(false);
    }
  }, [lists]);

  useEffect(() => {
    switch (+sortSettings) {
      case SortSettings.Own:
        break;
      case SortSettings.Deadline:
        sortLists((a, b) => {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        });
        break;
      case SortSettings.Priority:
        sortLists((a, b) => {
          return a.priority - b.priority;
        });
        break;
    }
  }, [sortSettings]);

  const fetchBoard = (boardId: string) => {
    setIsLoading(true);
    getBoardRequest(+boardId).then((response) => {
      setLists(response.data.cardLists);
    });
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, listIndex: number, cardIndex: number) => {
    dragCard.current = { listIndex, cardIndex };
    if (sortSettings !== SortSettings.Own) {
      dispatch(changeSortSettingsAction(SortSettings.Own));
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => {
    e.dataTransfer.dropEffect = 'copy';
    const currentCard = dragCard.current;
    const targetClassName = (e.target as HTMLHtmlElement).className;
    if (
      targetClassName !== 'dnd-card-small' &&
      targetClassName !== 'dnd-card-big' &&
      targetClassName !== 'add-card' &&
      ((e.target as HTMLHtmlElement).parentNode as HTMLHtmlElement).className !== 'add-card' &&
      (((e.target as HTMLHtmlElement).parentNode as HTMLHtmlElement).parentNode as HTMLHtmlElement).className !==
        'add-card'
    ) {
      return;
    }
    if (currentCard === undefined) {
      return;
    }
    setLists((oldLists) => {
      let newLists = JSON.parse(JSON.stringify(oldLists));
      const removedCard = newLists[currentCard.listIndex].cards[currentCard.cardIndex];
      newLists[currentCard.listIndex].cards.splice(currentCard.cardIndex, 1);
      if (targetClassName === 'dnd-card-small' || targetClassName === 'dnd-card-big') {
        newLists[targetListIndex].cards.splice(targetCardIndex, 0, removedCard);
        dragCard.current = { listIndex: targetListIndex, cardIndex: targetCardIndex };
      } else {
        newLists[targetListIndex].cards.push(removedCard);
        dragCard.current = {
          listIndex: targetListIndex,
          cardIndex: newLists[targetListIndex].cards.length - 1,
        };
      }
      return newLists;
    });
  };

  const showCardDetail = (listIndex: number, cardIndex: number) => {
    if (lists) {
      setClickedInfo(() => {
        return { card: lists[listIndex].cards[cardIndex], listIndex: listIndex };
      });
    }
  };

  const addCard = (title: string, listIndex: number) => {
    addCardRequest(listIndex, title).then((_response) => {
      fetchBoard(boardIdUrlParam);
    });
  };

  const addCardList = (title: string, color: string) => {
    addCardListRequest(+boardIdUrlParam, title, color).then((_response) => {
      fetchBoard(boardIdUrlParam);
    });
  };

  const removeCard = (cardId: number) => {
    removeCardRequest(cardId).then((_response) => fetchBoard(boardIdUrlParam));
  };

  const removeCardList = (listId: number) => {
    if (
      lists?.filter((list) => list.id === listId)[0].cards.length !== 0 &&
      !window.confirm('You are going to delete non empty list. Are you sure?')
    ) {
      return;
    }
    removeCardListRequest(listId).then((_response) => fetchBoard(boardIdUrlParam));
  };

  const updateCard = (card: ICard) => {
    updateCardRequest(card).then((_response) => fetchBoard(boardIdUrlParam));
    if (sortSettings !== SortSettings.Own) {
      dispatch(changeSortSettingsAction(SortSettings.Own));
    }
  };

  const sortLists = (compFunc: (a: any, b: any) => number) => {
    setLists((oldLists) => {
      let newLists: Array<ICardList> = JSON.parse(JSON.stringify(oldLists));
      newLists.forEach((list) => {
        list.cards.sort(compFunc);
      });
      return newLists;
    });
  };

  const switchDisplay = (displaySettings: DisplaySettings): JSX.Element => {
    let boardDisplayElement: JSX.Element;
    if (displaySettings === DisplaySettings.Kanban) {
      boardDisplayElement = (
        <BoardKanban
          lists={lists}
          addCardList={addCardList}
          removeCardList={removeCardList}
          addCard={addCard}
          showCardDetail={showCardDetail}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
        />
      );
    } else {
      boardDisplayElement = (
        <BoardTable
          lists={lists}
          addCardList={addCardList}
          removeCardList={removeCardList}
          addCard={addCard}
          showCardDetail={showCardDetail}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
        />
      );
    }
    return boardDisplayElement;
  };

  return (
    <SpinnerPage
      isLoading={isLoading}
      component={
        <React.Fragment>
          <CardDetail clickedInfo={clickedInfo} removeCard={removeCard} updateCard={updateCard} />
          <div id="visible-content">
            <TopBoardPanel />
            <div className="board-display">{switchDisplay(displaySettings)}</div>
          </div>
        </React.Fragment>
      }
    />
  );
};

export default Board;
