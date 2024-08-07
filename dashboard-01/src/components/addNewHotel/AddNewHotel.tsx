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
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';

type AddNewTypeProp = {
  itemsHeaderColumnData: GridColDef<Object>[];
  // setRowsData: React.Dispatch<React.SetStateAction<KeyValueType[]>>;
  // rowsData: KeyValueType[];
};

const AddNewHotel = ({
  itemsHeaderColumnData: headersColumn,
}: AddNewTypeProp): JSX.Element => {
  //--------states------------
  const [files, setFiles] = useState<Blob[] | MediaSource[] | string>('');
  const [inputInfo, setInputInfo] = useState<{}>({}); //how to apply generic type
  const [rooms, setRooms] = useState<{}[]>([]);
  const location = useLocation();

  //------- functions --------
  function itemPathLocFn(location: any) {
    const routePath = location.pathname;
    const routePage = routePath.split('/')[1];
    const itemToAdd = routePage.substring(0, routePage.length - 1);

    console.log('itemPathLocFn at AddNewHotel');

    return { routePath, routePage, itemToAdd };
  }

  const { routePath, routePage, itemToAdd } = itemPathLocFn(location);
  console.log('path:', routePath, 'page:', routePage, 'toAdd:', itemToAdd);

  const title = routePage;
  const urlItems = `${BASE_URL}/${routePage}`;
  const urlRooms = `${BASE_URL}/rooms`;

  console.log(urlItems, urlRooms, routePath);

  const cloudUrl = 'https://api.cloudinary.com/v1_1/dntgl2dbf/image/upload';

  //-------fetch request---------
  const { fetchState } = useAdminFetch<KeyValueType[]>(urlRooms);
  const { data, isLoading } = fetchState;
  console.log('rooms:', data);

  //--------functions---------
  const handleCloseModal = () => {
    console.log('click to close modal');
    // setIsModalOpen(false);
  };

  const handleImgFileSelection = () => {
    console.log('handle image file');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //--------------------------------
  const handleChange = (e) => {
    setInputInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  //------------------------
  function handleRoomSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedRooms = [...e.target.selectedOptions].map(
      (room) => room.value
    );
    console.log('insideRoomSelection:', selectedRooms);
    setRooms(selectedRooms);
  }

  console.log('files', files, 'before handleFormSubmit?');

  async function handleFormSubmit(e: FormEvent<Element>) {
    e.preventDefault();
    try {
      const urlFileUploadList = await Promise.all(
        Object.values(files).map(async (file) => {
          const inputFormData = new FormData();
          console.log('🚀 ~ Object.values ~ inputFormData:', inputFormData);

          inputFormData.append('file', file);
          inputFormData.append('upload_preset', 'upload');

          // const uploadResponse = await axios.post(cloudUrl, inputFormData);

          // const { url } = uploadResponse.data;
          // console.log('uploadRes.data:', url);
          // return url;
          return;
          
        })
      );

      console.log('urlFileUploadList', urlFileUploadList);
      const newHotelInfo = {
        ...inputInfo,
        rooms,
        photoUrlImages: urlFileUploadList,
      };

      //Before doing this, validations should be accomplished.

      console.log('addNewHotel', newHotelInfo);

      await axios.post('http://localhost:8800/api/hotels', newHotelInfo);

      // await axios.post(urlItems, newHotelInfo);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={`add__container`}>
        <div className={`add__modal`}>
          <span className='modal__close' onClick={handleCloseModal}>
            &times;
          </span>

          <h1 className='modal__title'>{`Add a new ${itemToAdd}`}</h1>

          {/* <img className='form__img' src='/noavatar.png' /> */}

          <div className='form__image'>
            <img
              className='form__img'
              src={
                !!files || files.length !== 0
                  ? URL.createObjectURL(files[0] as MediaSource)
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=''
            />
          </div>

          <form className='modal__form formInput' onSubmit={handleFormSubmit}>
            <div className='formInput'>
              <label htmlFor='file'>
                Image: <DriveFolderUploadOutlinedIcon className='icon' />
              </label>

              <input
                type='file'
                id='file'
                multiple
                onChange={(e) => setFiles(e.target.files)}
                style={{ display: 'none' }}
              />
            </div>

            {headersColumn
              .filter(
                (item) =>
                  item.field !== 'img' &&
                  item.field !== 'id' &&
                  item.field !== 'fullName'
              )
              .map((item) => (
                <div
                  className='form__group formInput'
                  // key={`form__${item.id}`}
                  key={`form__${item.field}`}
                >
                  <label
                    className='form__group--text form__group--label formInput'
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

            <div
              className='form__group formInput'
              // key={`form__${item.id}`}
              key={`form__${'featured'}`}
            >
              <label className='form__group--text form__group--label formInput'>
                Featured
              </label>

              <select
                className='form__group--text'
                id={'featured'}
                onChange={handleChange}
                style={{ backgroundColor: 'black' }}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>

            <div className='upload__img'>
              <span>Upload a New Image</span>

              {/* <img
                src='img.svg'
                alt='upload'
                onClick={handleImgFileSelection}
              ></img> */}

              <div className='form__selectRooms formInput'>
                <label htmlFor='file'>Rooms</label>

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

            <button
              className='form__btn'
              type='submit'
              // onClick={handleFormSubmit}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewHotel;
