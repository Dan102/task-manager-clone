import { table } from 'console';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ICard from '../models/interfaces/ICard';
import ICardList from '../models/interfaces/ICardList';
import NumberInput, { INumberInputResult } from './NumberInput';
import PriorityBar from './PriorityBar';
import TableFooter from './TableFooter';
import TableNavigation from './TableNavigation';
import TooltipMaxLengthText from './TooltipMaxLengthText';

interface IBoardTableProps {
  lists: ICardList[] | undefined;
  showCardDetail: (listIndex: number, cardIndex: number) => void;
}

interface ITableElement {
  title: string;
  description: string;
  priority: number;
  deadline: Date;
  category: string;
}

interface ITableElementIdexed {
  tableEl: ITableElement;
  cardIndex: number;
  listIndex: number;
}

const DEFAULT_PAGE_SIZE = 10;
const PAGE_NAVIGATION_SIDE = 3;

const BoardTable = ({ lists, showCardDetail }: IBoardTableProps): JSX.Element => {

  const [tableRows, setTableRows] = useState<ITableElementIdexed[]>([]);
  const [paginatedTableRows, setPaginatedTableRows] = useState<ITableElementIdexed[]>([]);
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

  const paginateTableElements = (tableRows: ITableElementIdexed[], pageIndex: number, pageSize: number): ITableElementIdexed[] => {
    return tableRows.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
  }

  const cardListsToTableElements = (lists: ICardList[]): ITableElementIdexed[] => {
    return lists
      .map((list: ICardList, listIndex: number) =>
        list.cards.map((card: ICard, cardIndex: number) => ({
          tableEl: {
            ...card,
            category: list.title,
          },
          cardIndex,
          listIndex,
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
            {paginatedTableRows.map((el: ITableElementIdexed) => (
              <tr key={el.tableEl.title} onClick={() => showCardDetail(el.listIndex, el.cardIndex)}>
                <td>
                  <TooltipMaxLengthText
                    text={el.tableEl.title}
                    maxLength={30}
                  />
                </td>
                <td>
                  <TooltipMaxLengthText
                    text={el.tableEl.description}
                    maxLength={45}
                  />
                </td>
                <td>
                  {moment(el.tableEl.deadline).format("DD.MM.yyyy")}
                  {moment(el.tableEl.deadline) <= moment() &&
                    <span className="table-date-warning">&#9888;</span>
                  }
                </td>
                <td>
                  <PriorityBar
                    priority={el.tableEl.priority}
                    maxPriority={3}
                  />
                </td>
                <td>
                  <TooltipMaxLengthText
                    text={el.tableEl.category}
                    maxLength={30}
                  />
                </td>
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
