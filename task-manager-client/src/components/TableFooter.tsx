import React from 'react'
import NumberInput, { INumberInputResult } from './NumberInput';
import TableNavigation from './TableNavigation';

interface ITableFooterProps {
  currentPageIndex: number;
  setCurrentPageIndex: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  tableRowsLength: number;
  pageNavigationSide: number;
  handleOnPageSizeChange: (newValue: INumberInputResult) => void;
}

const TableFooter = ({
  currentPageIndex,
  setCurrentPageIndex,
  pageSize,
  tableRowsLength,
  pageNavigationSide,
  handleOnPageSizeChange
}: ITableFooterProps): JSX.Element => {

  return (
    <>
      <div className="kanban-footer">
        <div className="kanban-footer-item"> Total items: {tableRowsLength}</div>
        <div className="kanban-footer-item">
          <span style={{ marginRight: '3px' }}> Items on page: </span>
          <span style={{ display: 'inline-block' }}>
            <NumberInput
              value={pageSize}
              onChange={newValue => handleOnPageSizeChange(newValue)}
              min={1}
            />
          </span>
        </div>
        <div className="kanban-footer-item">
          <TableNavigation
            currentPageIndex={currentPageIndex}
            pageNavigationSide={pageNavigationSide}
            pageNumber={Math.ceil(tableRowsLength / pageSize)}
            setCurrentPageIndex={setCurrentPageIndex}
          />
        </div>
      </div>
    </>
  )
}

export default TableFooter;