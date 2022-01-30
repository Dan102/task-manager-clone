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
import { IApplicationState } from '../store/store';
import BoardKanban from './BoardKanban';
import addCardListRequest from '../api/requests/addCardListRequest';
import DisplaySettings from '../models/enums/DisplaySettings';
import BoardTable from './BoardTable';
import updateBoardCardListsRequest from '../api/requests/updateBoardCardListsRequest';
import { changeSortSettingsAction } from '../store/actions/settingsActions';

interface MatchParams {
  id: string;
}

export interface CardPosition {
  listIndex: number;
  cardIndex: number;
}


const Board = (): JSX.Element => {
  const { id: boardIdUrlParam } = useParams<MatchParams>();
  const [lists, setLists] = useState<ICardList[]>();
  const [clickedInfo, setClickedInfo] = useState<IClickedInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const sortSettings = useSelector<IApplicationState, SortSettings>((x) => x.settings.sortSettings);
  const displaySettings = useSelector<IApplicationState, DisplaySettings>((x) => x.settings.displaySettings);
  const dispatch = useDispatch();
  const targetDragCardElement = useRef<HTMLElement>();
  const [targetDragCard, setTargetDragCard] = useState<CardPosition | null>(null);
  const draggedCard = useRef<CardPosition>();

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
    draggedCard.current = { listIndex, cardIndex };
    if (sortSettings !== SortSettings.Own) {
      dispatch(changeSortSettingsAction(SortSettings.Own));
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => {
    e.dataTransfer.dropEffect = 'copy';
    const currentCard = draggedCard.current;
    const targetClassName = (e.target as HTMLHtmlElement).className;
    if (
      !hasSomeParentTheClass(e.target as HTMLHtmlElement, 'dnd-card-container', 'dnd-list') &&
      !targetClassName.includes('add-card') &&
      !((e.target as HTMLHtmlElement).parentNode as HTMLHtmlElement).className.includes('add-card') &&
      !(((e.target as HTMLHtmlElement).parentNode as HTMLHtmlElement).parentNode as HTMLHtmlElement).className.includes(
        'add-card',
      )
    ) {
      return;
    }
    if (currentCard === undefined) return;
    if (targetCardIndex !== draggedCard.current?.cardIndex || targetListIndex !== draggedCard.current.listIndex) {
      setTargetDragCard({
        listIndex: targetListIndex,
        cardIndex: targetCardIndex,
      });
      targetDragCardElement.current = e.target as HTMLElement;
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => {
    const currentCard = draggedCard.current;
    if (currentCard === undefined || targetDragCard == null) {
      setTargetDragCard(null);
      return;
    }
    if (targetListIndex === currentCard.listIndex && targetCardIndex > currentCard.cardIndex) {
      targetCardIndex -= 1;
    }
    setLists((oldLists) => {
      const newLists = JSON.parse(JSON.stringify(oldLists));
      const removedCard = newLists[currentCard.listIndex].cards[currentCard.cardIndex];
      newLists[currentCard.listIndex].cards.splice(currentCard.cardIndex, 1);
      if (targetDragCardElement.current && hasSomeParentTheClass(targetDragCardElement.current, 'dnd-card-container', undefined)) {
        newLists[targetListIndex].cards.splice(targetCardIndex, 0, removedCard);
        draggedCard.current = { listIndex: targetListIndex, cardIndex: targetCardIndex };
      } else {
        newLists[targetListIndex].cards.push(removedCard);
        draggedCard.current = {
          listIndex: targetListIndex,
          cardIndex: newLists[targetListIndex].cards.length - 1,
        };
      }
      setIsLoading(true)
      updateBoardCardListsRequest(+boardIdUrlParam, newLists).then(() => setIsLoading(false));
      return newLists;
    });
    setTargetDragCard(null);
  };

  function hasSomeParentTheClass(element: HTMLElement, targetClassName: string, stopClassName: string | undefined): boolean {
    if (!element?.parentNode || (!!stopClassName && element.className.startsWith(stopClassName))) return false;
    if (element.className.startsWith(targetClassName)) return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return hasSomeParentTheClass(element.parentNode as HTMLElement, targetClassName, stopClassName);
  }

  const showCardDetail = (listIndex: number, cardIndex: number) => {
    if (lists) {
      setClickedInfo(() => {
        return { card: lists[listIndex].cards[cardIndex], listIndex: listIndex };
      });
    }
  };

  const addCard = (title: string, listId: number, description?: string, priority?: number, deadline?: Date) => {
    addCardRequest(listId, title, description, deadline, priority).then(() => {
      fetchBoard(boardIdUrlParam);
    });
  };

  const addCardList = (title: string, color: string) => {
    addCardListRequest(+boardIdUrlParam, title, color).then(() => {
      fetchBoard(boardIdUrlParam);
    });
  };

  const removeCard = (cardId: number) => {
    removeCardRequest(cardId).then(() => fetchBoard(boardIdUrlParam));
  };

  const removeCardList = (listId: number) => {
    if (
      lists?.filter((list) => list.id === listId)[0].cards.length !== 0 &&
      !window.confirm('You are going to delete non empty list. Are you sure?')
    ) {
      return;
    }
    removeCardListRequest(listId).then(() => fetchBoard(boardIdUrlParam));
  };

  const updateCard = (card: ICard) => {
    updateCardRequest(card).then(() => fetchBoard(boardIdUrlParam));
    if (sortSettings !== SortSettings.Own) {
      dispatch(changeSortSettingsAction(SortSettings.Own));
    }
  };

  const sortLists = (compFunc: (a: ICard, b: ICard) => number) => {
    setLists((oldLists) => {
      const newLists: Array<ICardList> = JSON.parse(JSON.stringify(oldLists));
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
          handleDrop={handleDrop}
          targetDragCard={targetDragCard}
        />
      );
    } else {
      boardDisplayElement = <BoardTable
        lists={lists}
        showCardDetail={showCardDetail}
        addCard={addCard}
        addCardList={addCardList}
        refetchData={() => { fetchBoard(boardIdUrlParam) }}
      />;
    }
    return boardDisplayElement;
  };

  return (
    <SpinnerPage
      isLoading={isLoading}
      component={
        <React.Fragment>
          <CardDetail
            clickedInfo={clickedInfo} setClickedInfo={setClickedInfo}
            removeCard={removeCard} updateCard={updateCard} />
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
