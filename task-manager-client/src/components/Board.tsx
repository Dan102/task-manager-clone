import React, {useState, useRef, useEffect} from "react";
import CardList from "./CardList"
import AddCardList from "./AddCardList"
import TopPanel from "./TopPanel";
import CardDetail from "./CardDetail";
import { RouteComponentProps } from "react-router-dom";
import ICardList from "../models/ICardList";
import IClickedInfo from "../models/IClickedInfo";
import ICard from "../models/ICard";
import { APP_SETTINGS } from "../app-settings";


interface MatchParams {
    id?: string | undefined;
}

export enum SortOptions {
    Own,
    Priority,
    Deadline
}

const Board = (props:  RouteComponentProps<MatchParams>) => {

    const [lists, setLists] = useState<ICardList[]>([])
    const [clickedInfo, setClickedInfo] = useState<IClickedInfo>()
    const [detailLevel, setDetailLevel] = useState<number>(1)
    const [sortOption, setSortOption] = useState<SortOptions>(SortOptions.Own)
    const dragCard = useRef<{listIndex: number; cardIndex: number;}>();

    useEffect(() => {
        document.title = 'Board';
        fetchBoard();
    }, []);

    const fetchBoard = () => {
        fetch(APP_SETTINGS.boardsUrl + "/" + props.match.params.id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(response => {
            console.log(response)
            setLists(response.cardLists)
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
        fetch(APP_SETTINGS.cardsUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "CardListId": listIndex,
                "Title" : title
            }),
        }).then(response => fetchBoard());
    }

    const addCardList = (title: string) => {
        fetch(APP_SETTINGS.cardlistsUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "BoardId": Number(props.match.params.id),
                "Title" : title
            })
        }).then(response => fetchBoard());
    }

    const removeCard = (cardId: number) => {
        fetch(APP_SETTINGS.cardsUrl + "/" + cardId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => fetchBoard());
    }

    const removeCardList = (listId: number) => {
        if(lists.filter(list => list.id === listId)[0].cards.length !== 0 && !window.confirm("You are going to delete non empty list. Are you sure?")) {
            return;
        }
        fetch(APP_SETTINGS.cardlistsUrl + "/" + listId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => fetchBoard());
    }

    const updateCard = (card: ICard) => {
        fetch(APP_SETTINGS.cardsUrl + "/" + card.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(card)
        }).then(response => fetchBoard());
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
        <>
            <CardDetail clickedInfo={clickedInfo} removeCard={removeCard} updateCard={updateCard}/>
            <div id="visible-content">
                <TopPanel
                    detailLevel={detailLevel} setDetailLevel={setDetailLevel}
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
        </>
    );
}

export default Board;