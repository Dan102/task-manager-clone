import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ICard from '../models/interfaces/ICard';
import ICardList from '../models/interfaces/ICardList';
import { INumberInputResult } from './NumberInput';
import PriorityBar from './PriorityBar';
import TableFooter from './TableFooter';
import TooltipMaxLengthText from './TooltipMaxLengthText';

interface IBoardTableProps {
  lists: ICardList[] | undefined;
  showCardDetail: (listIndex: number, cardIndex: number) => void;
  addCard: (title: string, listId: number, description?: string,
    priority?: number, deadline?: Date) => void;
}

interface ITableElement {
  title: string;
  description: string;
  priority: number;
  deadline: Date;
  category: string;
}

interface INewTableElement extends Omit<ITableElement, 'category'> {
  listId?: number;
}

interface ITableElementIdexed {
  tableEl: ITableElement;
  cardIndex: number;
  listIndex: number;
}

const DEFAULT_PAGE_SIZE = 10;
const PAGE_NAVIGATION_SIDE = 3;

const BoardTable = ({ lists, showCardDetail, addCard }: IBoardTableProps): JSX.Element => {

  const DEFAULT_CARD: INewTableElement = {
    title: '',
    description: '',
    priority: 2,
    deadline: new Date(),
    listId: (lists && lists.length > 0) ? lists[0].id : undefined,
  }

  const [tableRows, setTableRows] = useState<ITableElementIdexed[]>([]);
  const [paginatedTableRows, setPaginatedTableRows] = useState<ITableElementIdexed[]>([]);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [newRow, setNewRow] = useState<INewTableElement>(Object.assign({}, DEFAULT_CARD));
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [addCardValidationMessage, setAddCardValidationMessage] = useState<string>('');


  useEffect(() => {
    if (lists) {
      setTableRows(cardListsToTableElements(lists));
      setCurrentPageIndex(0);
      setNewRow({
        ...newRow,
        listId: lists[0].id,
      })
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

  const handleAddCard = () => {
    if (newRow.listId == null || newRow.title === '') {
      setAddCardValidationMessage('Title and Category must be entered to add a new card.');
      return;
    }
    setAddCardValidationMessage('');
    addCard(newRow.title, newRow.listId, newRow.description, newRow.priority, newRow.deadline);
    setNewRow(Object.assign({}, DEFAULT_CARD));
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
        <>
          <table className="kanban-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>Priority</th>
                <th>Category <button>Add +</button></th>
              </tr>
            </thead>
            <tbody>
              {paginatedTableRows.map((el: ITableElementIdexed) => (
                <tr className="kanban-data-row" key={el.tableEl.title} onClick={() => showCardDetail(el.listIndex, el.cardIndex)}>
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
              <tr className="table-new-row">
                <td><input type="text" value={newRow.title} onChange={
                  (e) => setNewRow({
                    ...newRow,
                    title: e.target.value
                  })}
                  placeholder="New title"
                /></td>
                <td><input type="text" value={newRow.description} onChange={
                  (e) => setNewRow({
                    ...newRow,
                    description: e.target.value
                  })}
                  placeholder="New description"
                /></td>
                <td><input type="date" value={moment(newRow.deadline).format('YYYY-MM-DD')} onChange={
                  (e) => {
                    setNewRow({
                      ...newRow,
                      deadline: new Date(e.target.value)
                    })
                  }
                } /></td>
                <td>
                  <PriorityBar
                    priority={newRow.priority}
                    maxPriority={3}
                    editable={true}
                    setPriority={(newPriority: number) => {
                      setNewRow({
                        ...newRow,
                        priority: newPriority,
                      })
                    }}
                  />
                </td>
                <td>
                  <select name="sort" value={newRow.listId}
                    onChange={(e) => {
                      setNewRow({
                        ...newRow,
                        listId: Number(e.target.value)
                      })
                    }}>
                    {lists.map(list =>
                      <option value={list.id}>
                        {list.title}
                      </option>
                    )}
                  </select>
                </td>
              </tr>
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
          <div className="kanban-table-button-area">
            {addCardValidationMessage != '' &&
              <div className="kanban-table-validation-msg">
                {addCardValidationMessage}
              </div>
            }
            <button
              className="kanban-table-add-card"
              onClick={() => handleAddCard()}
            >Add new</button>
          </div>
        </>
      )}
    </>
  );
};

export default BoardTable;
