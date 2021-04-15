import React, {useState, useRef, useEffect, useContext} from "react";
import CardList from "./CardList"
import AddCardList from "./AddCardList"
import TopPanel from "./TopPanel";
import CardDetail from "./CardDetail";
import ICardList from "../models/ICardList";
import IClickedInfo from "../models/IClickedInfo";
import ICard from "../models/ICard";
import { APP_SETTINGS } from "../app-settings";
import { useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import IBoard from "../models/IBoard";


interface MatchParams {
    id: string;
}

export enum SortOptions {
    Own,
    Priority,
    Deadline
}

export enum DisplayOptions {
    Graphical,
    Text,
}

const Board = () => {
    const { id: boardIdUrlParam } = useParams<MatchParams>()
    const [lists, setLists] = useState<ICardList[]>([])
    const [clickedInfo, setClickedInfo] = useState<IClickedInfo>()
    const [detailLevel, setDetailLevel] = useState<number>(3)
    const [sortOption, setSortOption] = useState<SortOptions>(SortOptions.Own)
    const [displayOption, setDisplayOption] = useState<DisplayOptions>(DisplayOptions.Graphical)
    const dragCard = useRef<{ listIndex: number; cardIndex: number; }>();

    useEffect(() => {
        document.title = 'Board';
        getBoard(boardIdUrlParam);
    }, []);

    const getBoard = (boardId: string) => {
        axios.get<IBoard>(APP_SETTINGS.boardsUrl + "/" + boardId)
            .then(response => {
            setLists(response.data.cardLists)
        })
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, listIndex: number, cardIndex: number) => {
        dragCard.current = {listIndex, cardIndex};
        if (sortOption !== SortOptions.Own) {
            setSortOption(SortOptions.Own)
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
        axios.post<void>(APP_SETTINGS.cardsUrl, {
            "CardListId": listIndex,
            "Title" : title
        }).then(response => {
            getBoard(boardIdUrlParam)
        })
    }

    const addCardList = (title: string) => {
        axios.post<void>(APP_SETTINGS.cardlistsUrl, {
            "BoardId": Number(boardIdUrlParam),
            "Title" : title
        }).then(response => {
            getBoard(boardIdUrlParam)
        })
    }

    const removeCard = (cardId: number) => {
        axios.delete<void>(APP_SETTINGS.cardsUrl + "/" + cardId)
            .then(response => getBoard(boardIdUrlParam));
    }

    const removeCardList = (listId: number) => {
        if(lists.filter(list => list.id === listId)[0].cards.length !== 0 && !window.confirm("You are going to delete non empty list. Are you sure?")) {
            return;
        }
        axios.delete<void>(APP_SETTINGS.cardlistsUrl + "/" + listId)
            .then(response => getBoard(boardIdUrlParam));
    }

    const updateCard = (card: ICard) => {
        axios.put<void>(APP_SETTINGS.cardsUrl + "/" + card.id, card)
            .then(response => getBoard(boardIdUrlParam));
        if (sortOption !== SortOptions.Own) {
            setSortOption(SortOptions.Own)
        }
    }

    const changeSortOption = (newSortOption: SortOptions) => {
        setSortOption(newSortOption)
        switch (+newSortOption) {
            case SortOptions.Own:
                break;
            case SortOptions.Deadline:
                sortLists((a, b) => {
                    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
                })
                break;
            case SortOptions.Priority:
                sortLists((a, b) => {
                    return a.priority - b.priority
                })
                break;
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
                <TopPanel
                    detailLevel={detailLevel} setDetailLevel={setDetailLevel}
                    displayOption={displayOption} setDisplayOption={setDisplayOption}
                    sortOption={sortOption} changeSortOption={changeSortOption}/>
                <div className="dnd-board">
                    {lists.map((list, listIndex) => (
                        <CardList
                            key={listIndex}
                            addCard={addCard} showCardDetail={showCardDetail} removeCardList={removeCardList}
                            list={list} listIndex={listIndex} detailLevel={detailLevel}
                            handleDragStart={handleDragStart} handleDragEnter={handleDragEnter}/>
                    ))}
                    <AddCardList addCardList={addCardList}/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Board;