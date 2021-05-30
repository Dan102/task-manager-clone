import React from 'react';
import ICardList from '../models/interfaces/ICardList';

interface IBoardTableProps {
    lists: ICardList[] | undefined;
    addCardList: (title: string, color: string) => void;
    removeCardList: (listId: number) => void;
    addCard: (title: string, listIndex: number) => void;
    showCardDetail: (listIndex: number, cardIndex: number) => void;
    handleDragStart: (e: React.DragEvent<HTMLDivElement>, listIndex: number, cardIndex: number) => void;
    handleDragEnter: (e: React.DragEvent<HTMLDivElement>, targetListIndex: number, targetCardIndex: number) => void;
}

interface ITableElement {
    title: string;
    description: string;
    priority: number;
    deadline: Date;
    category: string;
}

const cardListsToTableElements = (lists: ICardList[]): ITableElement[] => {
    return lists
        .map((list: ICardList) =>
            list.cards.map((card) => ({
                ...card,
                category: list.title,
            })),
        )
        .flat();
};

const BoardTable = ({
    lists,
    addCardList,
    removeCardList,
    addCard,
    showCardDetail,
    handleDragStart,
    handleDragEnter,
}: IBoardTableProps) => {
    return <>{lists && <>TODO</>}</>;
};

export default BoardTable;
