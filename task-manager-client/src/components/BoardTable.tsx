import React, { useEffect, useState } from 'react';
import ICardList from '../models/interfaces/ICardList';
import NumberInput, { INumberInputResult } from './NumberInput';
import TableFooter from './TableFooter';
import TableNavigation from './TableNavigation';

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
const PAGE_NAVIGATION_SIDE = 3;

const BoardTable = ({ lists }: IBoardTableProps): JSX.Element => {

  const [tableRows, setTableRows] = useState<ITableElement[]>([]);
  const [paginatedTableRows, setPaginatedTableRows] = useState<ITableElement[]>([]);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);


  useEffect(() => {
    if (lists) {
      setTableRows(cardListsToTableElements(lists));
      setCurrentPageIndex(0);
    }
  }, [lists])

  useEffect(() => {
    if (tableRows) {
      setPaginatedTableRows(paginateTableElements(tableRows, currentPageIndex, pageSize));
    }
  }, [pageSize, currentPageIndex, tableRows])

  useEffect(() => {
    setCurrentPageIndex(0);
  }, [pageSize])

  const paginateTableElements = (tableRows: ITableElement[], pageIndex: number, pageSize: number): ITableElement[] => {
    return tableRows.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
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

  const handleOnPageSizeChange = (result: INumberInputResult) => {
    if (result.isValid) {
      setPageSize(result.lastValidResult);
    }
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
            {paginatedTableRows.map((tableEl: ITableElement) => (
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
                <TableFooter
                  currentPageIndex={currentPageIndex}
                  handleOnPageSizeChange={handleOnPageSizeChange}
                  pageNavigationSide={PAGE_NAVIGATION_SIDE}
                  pageSize={pageSize}
                  setCurrentPageIndex={setCurrentPageIndex}
                  tableRowsLength={tableRows.length}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </>
  );
};

export default BoardTable;
