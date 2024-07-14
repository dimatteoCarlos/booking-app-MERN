//AddNew.tsx
//Parent:ListItems.tsx

import { GridColDef } from '@mui/x-data-grid';
import React, { FormEvent, useState } from 'react';
import './addNewHotel.css';
import { useLocation } from 'react-router-dom';
import useAdminFetch from '../../hooks/useAdminFetch';
import { KeyValueType } from '../../pages/listItems/ListItems.tsx';
import { BASE_URL } from '../../constants/constants.ts';
import axios from 'axios';

type AddNewTypeProp = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  headersColumn: GridColDef<Object>[];
  itemToAdd: string;
  routePage: string;

  setRowsData: React.Dispatch<React.SetStateAction<KeyValueType[]>>;
  rowsData: KeyValueType[];
};

// type KeyValueType={[key:string]:string|number|boolean|JSX.Element|undefined};

const AddNewHotel = ({
  setIsModalOpen,
  isModalOpen,
  headersColumn,
  itemToAdd,
  routePage,

  setRowsData,
  rowsData,
}: AddNewTypeProp): JSX.Element => {
  //--------states------------
  const [files, setFiles] = useState<Blob[] | MediaSource[]>([]);
  const [inputInfo, setInputInfo] = useState<{}>({}); //apply generic type
  const [rooms, setRooms] = useState<{}[]>([]);

  //------- Location --------
  const location = useLocation();
  const routePath = location.pathname;
  const title = routePage;

  // const url = `${BASE_URL}${routePath}/`;
  const urlHotels = `${BASE_URL}/hotels`;
  const urlRooms = `${BASE_URL}/rooms`;
  console.log(urlHotels, urlRooms, routePath);

  const cloudUrl = 'https://api.cloudinary.com/v1_1/lamadev/image/upload';

  //-------fetch request---------
  const { fetchState } = useAdminFetch<KeyValueType[]>(urlRooms);
  const { data, isLoading } = fetchState;
  console.log('rooms:', data);

  //--------functions---------
  const handleCloseModal = () => {
    console.log('click to close modal');
    setIsModalOpen(false);
  };

  const handleImgFileSelection = () => {
    console.log('handle image file');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  function handleRoomSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedRooms = [...e.target.selectedOptions].map(
      (room) => room.value
    );
    setRooms(selectedRooms);
  }

  console.log(files, 'before handleFormSubmit?');

  async function handleFormSubmit(e: FormEvent<Element>) {
    e.preventDefault();
    try {
      const urlFileUploadList = await Promise.all(
        Object.values(files).map(async (file) => {
          const inputFormData = new FormData();
          inputFormData.append('file', file);
          inputFormData.append('upload_preset', 'upload');
          const uploadResponse = await axios.post(cloudUrl, inputFormData);
          const { url } = uploadResponse.data;
          console.log('uploadRes.data:', url);
          return url;
        })
      );

      const newHotelInfo = {
        ...inputInfo,
        rooms,
        photoUrlImages: urlFileUploadList,
      };
      //Before doing this, validations should be accomplished.
      await axios.post(urlHotels, newHotelInfo);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className={`add__container ${isModalOpen ? 'zoom' : 'unzoom'}`}>
        <div className={`add__modal`}>
          <span className='modal__close' onClick={handleCloseModal}>
            &times;
          </span>

          <h1 className='modal__title'>{`Add a new ${itemToAdd}`}</h1>

          <img className='form__img' src='/noavatar.png' />
          <div className='form__image'>
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=''
            />
          </div>

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
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              ))}

            <div className='upload__img'>
              <span>Upload a New Image</span>

              <img src='img.svg' alt='' onClick={handleImgFileSelection}></img>

              <div className='form__selectRooms'>
                <label htmlFor=''>Rooms</label>
                <select
                  name='rooms'
                  id='rooms'
                  multiple
                  onChange={handleRoomSelection}
                >
                  {isLoading
                    ? '...loading'
                    : data &&
                      data.map((room) => (
                        <option
                          key={`${room._id}`}
                          value={room._id?.toString()}
                          // value={room._id}
                        >
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
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

export default AddNewHotel;

//The createObjectURL() static method of the URL interface creates a string containing a URL representing the object given in the parameter.

// The URL lifetime is tied to the document in the window on which it was created. The new object URL represents the specified File object or Blob object.

// To release an object URL, call revokeObjectURL().
