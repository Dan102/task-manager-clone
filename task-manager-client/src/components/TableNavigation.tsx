import React, { useEffect, useState, useRef } from 'react'
import ArrayHelper from '../helpers/arrayHelper';

interface ITableNavigationProps {
  currentPageIndex: number;
  setCurrentPageIndex: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  pageNavigationSide: number;
}

const TableNavigation = ({
  currentPageIndex,
  setCurrentPageIndex,
  pageNumber,
  pageNavigationSide
}: ITableNavigationProps): JSX.Element => {

  const [navigationStartEndPage, setNavigationStartEndPage] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    setNavigationStartEndPage(getPageNavigationStartEnd(currentPageIndex, pageNumber));
  }, [currentPageIndex, pageNumber, pageNavigationSide])

  const getPageNavigationStartEnd = (currentPageIndex: number, pageNumber: number): [number, number] => {
    const navigationStartPage = currentPageIndex > pageNavigationSide && (pageNumber - 2 * pageNavigationSide - 1 > 0) ?
      Math.min(currentPageIndex - pageNavigationSide, pageNumber - 2 * pageNavigationSide - 1) : 0;
    const navigationEndPage = currentPageIndex > pageNumber - pageNavigationSide - 1 || (pageNavigationSide * 2 >= pageNumber) ?
      pageNumber - 1 : Math.max(currentPageIndex + pageNavigationSide, pageNavigationSide * 2)
    return [navigationStartPage, navigationEndPage];
  }

  return (
    <>
      {pageNumber > 1 &&
        <div className="kanban-footer-navigation">
          {currentPageIndex !== 0 &&
            <>
              <button className="navigation-arrow-button" onClick={() => setCurrentPageIndex(0)}>
                &lt;&lt;
              </button>
              <button className="navigation-arrow-button" onClick={() => setCurrentPageIndex(currentPageIndex - 1)}>
                &lt;
              </button>
            </>
          }
          {navigationStartEndPage[0] !== 0 &&
            <>
              <button className='kanban-footer-navigation-num'
                onClick={() => setCurrentPageIndex(0)}
              >1</button>
              ...
            </>
          }
          {
            ArrayHelper.getRange(...navigationStartEndPage).map(pageIndex =>
              <button key={pageIndex} className={'kanban-footer-navigation-num' +
                (currentPageIndex === pageIndex ?
                  ' kanban-footer-navigation-num-active' : '')}
                onClick={() => setCurrentPageIndex(pageIndex)}
              > {pageIndex + 1} </button>
            )
          }
          {navigationStartEndPage[1] !== pageNumber - 1 &&
            <>
              ...
              <button
                className='kanban-footer-navigation-num'
                onClick={() => setCurrentPageIndex(pageNumber - 1)}
              >{pageNumber}</button>
            </>
          }
          {currentPageIndex !== pageNumber - 1 &&
            <>
              <button className="navigation-arrow-button" onClick={() => setCurrentPageIndex(currentPageIndex + 1)}>
                &gt;
              </button>
              <button className="navigation-arrow-button" onClick={() => setCurrentPageIndex(pageNumber - 1)}>
                &gt;&gt;
              </button>
            </>
          }
        </div>
      }
    </>
  )
}

export default TableNavigation;