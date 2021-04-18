import React, { useState, useRef, useEffect } from "react";
import CardList from "./CardList"
import AddCardList from "./AddCardList"
import TopPanel from "./TopPanel";
import CardDetail from "./CardDetail";
import ICard from "../models/interfaces/ICard";
import ICardList from "../models/interfaces/ICardList";
import IClickedInfo from "../models/interfaces/IClickedInfo";
import SortSettings from "../models/enums/SortSettings";
import getBoardRequest from "../api/requests/getBoardRequest";
import addCardRequest from "../api/requests/addCardRequest";
import removeCardRequest from "../api/requests/removeCardRequest";
import removeCardListRequest from "../api/requests/removeCardListRequest";
import updateCardRequest from "../api/requests/updateCardRequest";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeSortSettingsAction } from "../reducers/settingsReducer";
import { IApplicationState } from "../App";

interface MatchParams {
    id: string;
}

const Board = () => {
    const { id: boardIdUrlParam } = useParams<MatchParams>()
    const [lists, setLists] = useState<ICardList[]>([])
    const [clickedInfo, setClickedInfo] = useState<IClickedInfo>()
    const sortSettings = useSelector<IApplicationState, SortSettings>(x => x.settings.sortSettings);
    const dispatch = useDispatch();
    const dragCard = useRef<{ listIndex: number; cardIndex: number; }>();

    useEffect(() => {
        document.title = 'Board';
        fetchBoard(boardIdUrlParam);
    }, []);

    useEffect(() => {
        switch (+sortSettings) {
            case SortSettings.Own:
                break;
            case SortSettings.Deadline:
                sortLists((a, b) => {
                    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
                })
                break;
            case SortSettings.Priority:
                sortLists((a, b) => {
                    return a.priority - b.priority
                })
                break;
        }
    }, [sortSettings])

    const fetchBoard = (boardId: string) => {
        getBoardRequest(+boardId).then(response => {
            setLists(response.data.cardLists)
        })
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, listIndex: number, cardIndex: number) => {
        dragCard.current = {listIndex, cardIndex};
        if (sortSettings !== SortSettings.Own) {
            dispatch(changeSortSettingsAction(SortSettings.Own))
        }
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => {
        e.dataTransfer.dropEffect = "copy";
        const currentCard = dragCard.current;
        const targetClassName = (e.target as HTMLHtmlElement).className;
        if (targetClassName !== "dnd-card-small" && targetClassName !== "dnd-card-big" && targetClassName !== "add-card" &&
            ((e.target as HTMLHtmlElement).parentNode as HTMLHtmlElement).className !== "add-card" &&
            (((e.target as HTMLHtmlElement).parentNode as HTMLHtmlElement).parentNode as HTMLHtmlElement).className !== "add-card") {
            return;
        }
        if (currentCard === undefined) {return; }
        setLists( oldLists => {
            let newLists = JSON.parse(JSON.stringify(oldLists));
            const removedCard = newLists[currentCard.listIndex].cards[currentCard.cardIndex];
            newLists[currentCard.listIndex].cards.splice(currentCard.cardIndex, 1);
            if (targetClassName === "dnd-card-small" || targetClassName === "dnd-card-big") {
                newLists[targetListIndex].cards.splice(targetCardIndex, 0, removedCard);
                dragCard.current = {'listIndex' : targetListIndex, 'cardIndex' : targetCardIndex}
            } else {
                newLists[targetListIndex].cards.push(removedCard);
                dragCard.current = {'listIndex' : targetListIndex, 'cardIndex' : newLists[targetListIndex].cards.length - 1}
            }
            return newLists;
        })
    }

    const showCardDetail = (listIndex: number, cardIndex: number) => {
        setClickedInfo(() => {
            return {card: lists[listIndex].cards[cardIndex], listIndex: listIndex};
        })
    }

    const addCard = (title: string, listIndex: number) => {
        addCardRequest(listIndex, title).then(_response => {
            fetchBoard(boardIdUrlParam)
        })
    }

    const addCardList = (title: string) => {
        addCardRequest(+boardIdUrlParam, title).then(_response => {
            fetchBoard(boardIdUrlParam)
        })
    }

    const removeCard = (cardId: number) => {
        removeCardRequest(cardId).then(_response => fetchBoard(boardIdUrlParam));
    }

    const removeCardList = (listId: number) => {
        if(lists.filter(list => list.id === listId)[0].cards.length !== 0 && !window.confirm("You are going to delete non empty list. Are you sure?")) {
            return;
        }
        removeCardListRequest(listId).then(_response => fetchBoard(boardIdUrlParam));
    }

    const updateCard = (card: ICard) => {
        updateCardRequest(card).then(_response => fetchBoard(boardIdUrlParam));
        if (sortSettings !== SortSettings.Own) {
            dispatch(changeSortSettingsAction(SortSettings.Own));
        }
    }

    const sortLists = (compFunc: (a: any, b: any) => number) => {
        setLists ((oldLists) => {
            let newLists: Array<ICardList> = JSON.parse(JSON.stringify(oldLists));
            newLists.forEach(list => {
                list.cards.sort(compFunc);
            })
            return newLists
        })
    }

    return (
        <React.Fragment>
            <CardDetail clickedInfo={clickedInfo} removeCard={removeCard} updateCard={updateCard}/>
            <div id="visible-content">
                <TopPanel/>
                <div className="dnd-board">
                    {lists.map((list, listIndex) => (
                        <CardList
                            key={listIndex}
                            addCard={addCard} showCardDetail={showCardDetail} removeCardList={removeCardList}
                            list={list} listIndex={listIndex}
                            handleDragStart={handleDragStart} handleDragEnter={handleDragEnter}/>
                    ))}
                    <AddCardList addCardList={addCardList}/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Board;