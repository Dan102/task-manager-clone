import React, {useState, useRef, useEffect} from "react";
import CardList from "./CardList"
import AddCardList from "./AddCardList"
import TopPanel from "./TopPanel";
import CardDetail from "./CardDetail";

function Board(props) {

    const [lists, setLists] = useState([])
    const [localListNextId, setLocalListNextId] = useState(0)
    const [localCardNextId, setLocalCardNextId] = useState(0)
    const [clickedCard, setClickedCard] = useState({card: null, listIndex: null})
    const [detailLevel, setDetailLevel] = useState(1)
    const [sortOption, setSortOption] = useState("Own") 
    const dragCard = useRef();
    const dragNode = useRef();

    useEffect(() => {
        const currentBoardLists = JSON.parse(localStorage.getItem("board" + props.match.params.id))
        const currentLocalListNextId = JSON.parse(localStorage.getItem("localListNextId" + props.match.params.id))
        const currentLocalCardNextId = JSON.parse(localStorage.getItem("localCardNextId" + props.match.params.id))
        console.log("Loading: ", lists, localListNextId, localCardNextId)
        if (currentBoardLists && currentBoardLists != []) {
            setLists(currentBoardLists)
        }
        if (currentLocalListNextId) {
            setLocalListNextId(currentLocalListNextId)
        }
        if (currentLocalCardNextId) {
            setLocalListNextId(currentLocalCardNextId)
        }
    }, []);

    useEffect(() => {
        if (lists != [] && lists != undefined) {
            console.log("Saving: ", lists, localListNextId, localCardNextId)
            localStorage.setItem("board" + props.match.params.id, JSON.stringify(lists))
            localStorage.setItem("localListNextId" + props.match.params.id, JSON.stringify(localListNextId))
            localStorage.setItem("localCardNextId" + props.match.params.id, JSON.stringify(localCardNextId))
        }
    }, [lists]);

    const handleDragStart = (e, listIndex, cardIndex) => {
        e.dataTransfer.effectAllowed = "copyMove";
        dragNode.current = e.target;
        dragCard.current = {listIndex, cardIndex};
        setSortOption("Own")
    }

    const handleDragEnter = (e, targetListIndex, targetCardIndex) => {
        e.dataTransfer.dropEffect = "copy";
        const currentCard = dragCard.current;
        const targetClassName = e.target.className;
        if (targetClassName != "dnd-card-small" && targetClassName != "dnd-card-big" && targetClassName != "add-card" &&
            e.target.parentNode.className != "add-card" && e.target.parentNode.parentNode.className != "add-card" &&
            currentCard.id != e.target.id) {
            return
        }
        setLists( oldLists => {
            let newLists = JSON.parse(JSON.stringify(oldLists));
            const removedCard = newLists[currentCard.listIndex].cards[currentCard.cardIndex];
            newLists[currentCard.listIndex].cards.splice(currentCard.cardIndex, 1);
            if (targetClassName == "dnd-card-small" || targetClassName == "dnd-card-big") {
                newLists[targetListIndex].cards.splice(targetCardIndex, 0, removedCard);
                dragCard.current = {'listIndex' : targetListIndex, 'cardIndex' : targetCardIndex}
                // dragNode.current = e.target;
            } else {
                newLists[targetListIndex].cards.push(removedCard);
                dragCard.current = {'listIndex' : targetListIndex, 'cardIndex' : newLists[targetListIndex].cards.length - 1}
                // dragNode.current = e.target;
            }
            return newLists;
        })
    }

    const addCardList = (title) => {
        setLists( oldLists => {
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

    const addCard = (title, listIndex) => {
        setLists( oldLists => {
            let newLists = JSON.parse(JSON.stringify(oldLists));
            const currentLocalCardNextId = localCardNextId;
            setLocalCardNextId(localCardNextId + 1)
            newLists[listIndex].cards = [
                ...newLists[listIndex].cards,
                {
                    id: currentLocalCardNextId,
                    title: title,
                }
            ]
            return newLists
        })
    }

    const showCardDetail = (listIndex, cardIndex) => {
        setClickedCard(() => {
            return {card: lists[listIndex].cards[cardIndex], listIndex: listIndex};
        })
    }

    const removeCard = (e, cardIndex, listIndex) => {
        setLists((oldLists) => {
            let newLists = JSON.parse(JSON.stringify(oldLists));
            newLists[listIndex].cards = newLists[listIndex].cards.filter(card => card.id != cardIndex);
            return newLists;
        })
    }

    const removeCardList = (e, listIndex) => {
        setLists((oldLists) => {
            return oldLists.filter(list => list.id != listIndex);
        })
    }

    const updateCard = (e, listIndex, newCard) => {
        setLists((oldLists) => {
            let newLists = JSON.parse(JSON.stringify(oldLists));
            const targetCardId = newLists[listIndex].cards.map(x => x.id).indexOf(newCard.id)
            console.log(targetCardId, newCard)            
            newLists[listIndex].cards[targetCardId] = newCard;
            return newLists;
        })
    }

    const changeSortOption = (newSortOption) => {
        setSortOption(newSortOption)
        const newSortOptionLowerCase = newSortOption.toLowerCase()
        switch (newSortOption) {
            case "Own":
                break;
            case "Deadline":
                sortLists(newSortOptionLowerCase)  
                break;
            case "Priority":
                sortLists(newSortOptionLowerCase)          
                break;
        }
    }

    const sortLists = (newSortOption) => {
        console.log(newSortOption)
        setLists ((oldLists) => {
            let newLists = JSON.parse(JSON.stringify(oldLists));
            newLists.forEach(list => {
                list.cards.sort(
                    (a, b) => {
                        return new Date(a[newSortOption]) - new Date(b[newSortOption])
                    }
                )
            })
            return newLists
        })
    }

    // const setDetail = (newdetail) => {
    //     detail = newdetail;
    // }

    return (
        <>
            <CardDetail card={clickedCard} removeCard={removeCard} updateCard={updateCard}/>
            <div id="visible-content">
                <TopPanel
                    detailLevel={detailLevel} setDetailLevel={setDetailLevel}
                    sortOption={sortOption} setSortOption={changeSortOption}/>
                <div className="dnd-board">
                    {lists.map((list, listIndex) => (
                        <CardList
                            key={listIndex}
                            addCard={addCard} showCardDetail={showCardDetail} removeCardList={removeCardList}
                            list={list} listIndex={listIndex} detailLevel={detailLevel} sortOption={sortOption}
                            handleDragStart={handleDragStart} handleDragEnter={handleDragEnter}/>
                    ))}
                    <AddCardList addCardList={addCardList}/>
                </div>
            </div>
        </>
    );
}

export default Board;