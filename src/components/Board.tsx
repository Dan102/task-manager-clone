import React, {useState, useRef, useEffect} from "react";
import CardList from "./CardList"
import AddCardList from "./AddCardList"
import TopPanel from "./TopPanel";
import CardDetail from "./CardDetail";
import { RouteComponentProps } from "react-router-dom";
import IList from "../models/IList";
import IClickedInfo from "../models/IClickedInfo";
import ICard from "../models/ICard";


interface MatchParams {
    id?: string | undefined;
}

export enum SortOptions {
    Own,
    Priority,
    Deadline
}

const Board = (props:  RouteComponentProps<MatchParams>) => {

    const [lists, setLists] = useState<IList[]>([])
    const [localListNextId, setLocalListNextId] = useState<number>(0)
    const [localCardNextId, setLocalCardNextId] = useState<number>(0)
    const [clickedInfo, setClickedInfo] = useState<IClickedInfo>()
    const [detailLevel, setDetailLevel] = useState<number>(1)
    const [sortOption, setSortOption] = useState<SortOptions>(SortOptions.Own) 
    const dragCard = useRef<{listIndex: number; cardIndex: number;}>();

    useEffect(() => {
        const currentBoardLists = JSON.parse(localStorage.getItem("board" + props.match.params.id) ?? "[]")
        const currentLocalListNextId = JSON.parse(localStorage.getItem("localListNextId" + props.match.params.id) ?? "0")
        const currentLocalCardNextId = JSON.parse(localStorage.getItem("localCardNextId" + props.match.params.id) ?? "0")
        console.log("Loading: ", currentBoardLists, currentLocalListNextId, currentLocalCardNextId)
        if (currentBoardLists && currentBoardLists.length != 0) {
            setLists(currentBoardLists)
            console.log("loaded list: ", lists, localListNextId, localCardNextId)
        }
        if (currentLocalListNextId != 0) {
            setLocalListNextId(currentLocalListNextId)
            console.log("loaded list id: ", lists, localListNextId, localCardNextId)
        }
        if (currentLocalCardNextId != 0) {
            setLocalCardNextId(currentLocalCardNextId)
            console.log("loaded card id: ", lists, localListNextId, localCardNextId)
        }
    }, []);

    useEffect(() => {
        if (lists != undefined && lists.length != 0) {
            console.log("Saving: ", lists, localListNextId, localCardNextId)
            localStorage.setItem("board" + props.match.params.id, JSON.stringify(lists))
            localStorage.setItem("localListNextId" + props.match.params.id, JSON.stringify(localListNextId))
            localStorage.setItem("localCardNextId" + props.match.params.id, JSON.stringify(localCardNextId))
        }
    }, [lists]);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, listIndex: number, cardIndex: number) => {
        dragCard.current = {listIndex, cardIndex};
        if (sortOption != SortOptions.Own) {
            setSortOption(SortOptions.Own)
        }
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => {
        e.dataTransfer.dropEffect = "copy";
        const currentCard = dragCard.current;
        const targetClassName = (e.target as HTMLHtmlElement).className;
        if (targetClassName != "dnd-card-small" && targetClassName != "dnd-card-big" && targetClassName != "add-card" &&
            ((e.target as HTMLHtmlElement).parentNode as HTMLHtmlElement).className != "add-card" &&
            (((e.target as HTMLHtmlElement).parentNode as HTMLHtmlElement).parentNode as HTMLHtmlElement).className != "add-card") {
            return;
        }
        if (currentCard == undefined) {return; }
        setLists( oldLists => {
            let newLists = JSON.parse(JSON.stringify(oldLists));
            const removedCard = newLists[currentCard.listIndex].cards[currentCard.cardIndex];
            newLists[currentCard.listIndex].cards.splice(currentCard.cardIndex, 1);
            if (targetClassName == "dnd-card-small" || targetClassName == "dnd-card-big") {
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
        const currentLocalCardNextId = localCardNextId;
        setLists( oldLists => {
            let newLists = JSON.parse(JSON.stringify(oldLists));
            newLists[listIndex].cards = [
                ...newLists[listIndex].cards,
                {
                    id: currentLocalCardNextId,
                    title: title,
                }
            ]
            return newLists
        })
        setLocalCardNextId(localCardNextId + 1)
        if (sortOption != SortOptions.Own) {
            setSortOption(SortOptions.Own)
        }
    }

    const addCardList = (title: string) => {
        setLists(oldLists => {
                const currentLocalListNextId = localListNextId;
                setLocalListNextId(localListNextId + 1)
                return [ ...oldLists,
                {
                    id: currentLocalListNextId,
                    title: title,
                    cards: [],
                }];
            }
        )
    }

    const removeCard = (cardId: number, listIndex: number) => {
        setLists((oldLists) => {
            let newLists: IList[] = JSON.parse(JSON.stringify(oldLists));
            newLists[listIndex].cards = newLists[listIndex].cards.filter(card => card.id != cardId);
            return newLists;
        })
    }

    const removeCardList = (listId: number) => {
        setLists((oldLists) => {
            return oldLists.filter(list => list.id != listId);
        })
    }

    const updateCard = (listIndex: number, newCard: ICard) => {
        setLists((oldLists) => {
            console.log("Updating card to: ", newCard)
            let newLists: IList[] = JSON.parse(JSON.stringify(oldLists));
            const targetCardId = newLists[listIndex].cards.map(x => x.id).indexOf(newCard.id)    
            newLists[listIndex].cards[targetCardId] = newCard;
            return newLists;
        })
        if (sortOption != SortOptions.Own) {
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
            let newLists: IList[] = JSON.parse(JSON.stringify(oldLists));
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