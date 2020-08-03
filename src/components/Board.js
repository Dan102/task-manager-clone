import React, {useState, useRef, useEffect} from "react";
import List from "./CardList"
import AddCardList from "./AddCardList"

function Board(props) {
    const [lists, setLists] = useState(props.board);

    // useEffect(() => {
    //     setLists(props.board);
    // }, [setLists, props.board])

    const dragCard = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, listIndex, cardIndex) => {
        e.dataTransfer.effectAllowed = "copyMove";
        dragNode.current = e.target;
        // dragNode.current.addEventListener('dragend', handleDragEnd)
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
                console.log("here")
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

    // const handleDragEnd = (e) => {
    //     dragCard.current = null;
    //     dragNode.current.removeEventListener('dragend', handleDragEnd)
    //     dragNode.current = null;
    // }

    return (
        <div className="dnd-board">
            {lists.map((list, listIndex) => (
                <List 
                    key={listIndex}     
                    addCard={addCard}               
                    handleDragStart={handleDragStart} handleDragEnter={handleDragEnter}
                    list={list} listIndex={listIndex}/>
            ))}
            <AddCardList addCardList={addCardList}/>
        </div>
    );
}

export default Board;