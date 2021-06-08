import React, { useEffect, useState } from 'react';
import ICardList from '../models/interfaces/ICardList';
import NumberInput, { INumberInputResult } from './NumberInput';

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

const DEFAULT_PAGE_SIZE = 10;

const BoardTable = ({ lists }: IBoardTableProps): JSX.Element => {

  const [tableRows, setTableRows] = useState<ITableElement[]>([]);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE_SIZE);

  useEffect(() => {
    if (lists) {
      setTableRows(cardListsToTableElements(lists));
    }
  }, [lists])

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

  const handleOnPageSizeChange = (result: INumberInputResult) => {
    if (result.isValid) setCurrentPage(result.lastValidResult);
  }

  return (
    <>
      {lists && (
        <table className="kanban-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Priority</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((tableEl: ITableElement) => (
              <tr key={tableEl.title}>
                <td>{tableEl.title}</td>
                <td>{tableEl.description}</td>
                <td>{tableEl.deadline}</td>
                <td>{tableEl.priority}</td>
                <td>{tableEl.category}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                <div className="kanban-footer">
                  <div>
                    <span> 1 ... 10 </span>
                    <span> Items on page: </span>
                    <span style={{display: 'inline-block'}}>
                        <NumberInput value={pageSize} onChange={newValue => handleOnPageSizeChange(newValue)} />
                    </span>
                  </div>
                  <div>
                    Total items: { tableRows.length }
                  </div>
                </div>
              </td>
            </tr>
            <tr>
            </tr>
          </tfoot>
        </table>
      )}
    </>
  );
};

export default BoardTable;
