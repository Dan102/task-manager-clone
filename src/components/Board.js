import React, {useState, useRef, useEffect} from "react";
import CardList from "./CardList"
import AddCardList from "./AddCardList"
import TopPanel from "./TopPanel";
import CardDetail from "./CardDetail";

function Board() {

    const [lists, setLists] = useState([
        {
            title: "now",
            cards: [
                {
                    title: "react",
                    description: "Si vis pacem para belum si vic pacem para belum",
                    deadline: new Date(),
                    priority: 1
                },
                {
                    title: "angular",
                    description: "Si vis pacem para belum si vic pacem para belum si vis pacem para belum vic pacem para",
                    deadline: new Date(),
                    priority: 1
                }
            ]
        },
        {
            title: "tomorrow",
            cards: [
                {
                    title: "bachelor",
                    description: "Si vis pacem para belum si vic pacem para belum si vis pacem para belum vic pacem para",
                    deadline: new Date(),
                    priority: 1
                },
                {
                    title: "work",
                    description: "Si vis pacem para belum si",
                    deadline: new Date(),
                    priority: 1
                }
            ]
        }
      ]);

    const dragCard = useRef();
    const dragNode = useRef();

    const [clickedCard, setClickedCard] = useState({})

    const handleDragStart = (e, listIndex, cardIndex) => {
        e.dataTransfer.effectAllowed = "copyMove";
        dragNode.current = e.target;
        dragCard.current = {listIndex, cardIndex};
    }

    const handleDragEnter = (e, targetListIndex, targetCardIndex) => {
        e.dataTransfer.dropEffect = "copy";
        const currentCard = dragCard.current;
        const targetClassName = e.target.className;
        if (targetClassName != "dnd-card" && targetClassName != "add-card" && e.target.parentNode.className != "add-card" && e.target.parentNode.parentNode.className != "add-card") {
            return
        }
        setLists( oldLists => {
            let newLists = JSON.parse(JSON.stringify(oldLists));
            const removedCard = newLists[currentCard.listIndex].cards[currentCard.cardIndex];
            newLists[currentCard.listIndex].cards.splice(currentCard.cardIndex, 1);

            if (targetClassName == "dnd-card") {
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
                return [ ...oldLists,
                {
                    title: title,
                    cards: []
                }];
            }
        )
    }

    const addCard = (title, listIndex) => {
        setLists( oldLists => {
            let newLists = JSON.parse(JSON.stringify(oldLists));
            newLists[listIndex].cards = [
                ...newLists[listIndex].cards,
                {
                    title: title
                }
            ]
            return newLists
        })
    }

    const showCardDetail = (listIndex, cardIndex) => {
        setClickedCard(() => {
            console.log(lists[listIndex].cards)
            return lists[listIndex].cards[cardIndex];
        })
    }

    return (
        <>
            <CardDetail card={clickedCard}/>
            <div id="visible-content">
                <TopPanel />
                <div className="dnd-board">
                    {lists.map((list, listIndex) => (
                        <CardList
                            key={listIndex}
                            addCard={addCard} showCardDetail={showCardDetail}
                            handleDragStart={handleDragStart} handleDragEnter={handleDragEnter}
                            list={list} listIndex={listIndex}/>
                    ))}
                    <AddCardList addCardList={addCardList}/>
                </div>
            </div>
        </>
    );
}

export default Board;