//AddNew.tsx
//Parent:Products.tsx o Users.tsx

import { GridColDef } from '@mui/x-data-grid';
import React, { FormEvent } from 'react';

import './addNew.css';

type AddNewTypeProp = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  headersColumn: GridColDef<Object>[];
  itemToAdd: string;
  routePage: string;
};

const AddNew = ({
  setIsModalOpen,
  isModalOpen,
  headersColumn,
  itemToAdd,
  routePage,
}: AddNewTypeProp): JSX.Element => {
  //--------functions---------
  const handleCloseModal = () => {
    console.log('click to close modal');
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e: FormEvent<Element>) => {
    e.preventDefault();
    //add new Item
    console.log({ itemToAdd, routePage });
    setIsModalOpen(false);
  };

  const handleImgFile = () => {
    console.log('handle image file');
  };

  return (
    <>
      <div className={`add__container ${isModalOpen ? 'zoom' : 'unzoom'}`}>
        <div className={`add__modal`}>
          <span className='modal__close' onClick={handleCloseModal}>
            &times;
          </span>

          <h1 className='modal__title'>{`Add a new ${itemToAdd}`}</h1>

          <img className='form__img' src='/noavatar.png' />

          <form className='modal__form' onSubmit={handleFormSubmit}>
            {headersColumn
              .filter(
                (item) =>
                  item.field !== 'img' &&
                  item.field !== 'id' &&
                  item.field !== 'fullName'
              )
              .map((item) => (
                <div className='form__group ' key={`form__${item.field}`}>
                  <label
                    className='form__group--text form__group--label'
                    htmlFor={item.field}
                  >
                    {item.headerName}
                  </label>
                  <input
                    className='form__group--text'
                    type={item.type}
                    placeholder={item.field}
                    name={item.field}
                    id={item.field}
                  />
                </div>
              ))}
            <div className='upload__img'>
              <span>Upload a New Image</span>

              <img src='img.svg' alt='' onClick={handleImgFile}></img>
            </div>
            <button className='form__btn' type='submit'>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNew;
