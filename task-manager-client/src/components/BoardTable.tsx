import React from 'react';
import ICardList from '../models/interfaces/ICardList';

interface IBoardTableProps {
  lists: ICardList[] | undefined;
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

const BoardTable = ({ lists }: IBoardTableProps) => {
  return (
    <>
      {lists && (
        <table className="kanban-table">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Priority</th>
            <th>Category</th>
          </tr>
          {cardListsToTableElements(lists).map((tableEl: ITableElement) => (
            <tr key={tableEl.title}>
              <td>{tableEl.title}</td>
              <td>{tableEl.description}</td>
              <td>{tableEl.deadline}</td>
              <td>{tableEl.priority}</td>
              <td>{tableEl.category}</td>
            </tr>
          ))}
        </table>
      )}
    </>
  );
};

export default BoardTable;
