import React, { useEffect, useRef, useState } from 'react';
import ListColors from '../models/enums/ListColors';
import AddCardList from './AddCardList';

interface IAddCardListModalProps {
  addCardList: (title: string, color: string) => void;
  switchOff: () => void;
  isOpened: boolean;
}

const AddCardListModal = ({ addCardList, switchOff, isOpened }: IAddCardListModalProps): JSX.Element => {

  useEffect(() => {
    if (isOpened) {
      return;
    }
  }, [isOpened]);

  return (
    <>
      {isOpened &&
        <div className={'modal-window-background modal-window-background-darken'} onClick={(e) => switchOff()}>
          <div className="modal-window"
            onClick={(e) => {
              e.stopPropagation();
            }}>
            <button className="modal-window-cancel-button">Cancel</button>
            <AddCardList addCardList={(title: string, color: string) => {
              addCardList(title, color);
              switchOff();
            }} />
          </div>
        </div>
      }
    </>
  );
};

export default AddCardListModal;
