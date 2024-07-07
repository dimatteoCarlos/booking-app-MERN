//ListItem.tsx
//Parents:UsersList.tsx, useRouter.tsx

// import { itemsHeaderColumnData } from './usersHeaderColumns';

import { useState } from 'react';
import ShowPageTable from '../../components/showPageTable/ShowPageTable';
import AddNew from '../../components/addNew/AddNew';
import { useAuthData } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../constants/constants';

// import { TitleBtnType } from '../../types/types';
//{itemsHeaderColumnData,endpoint,}

type ListItemsTypeProp = {
  title: string;
  btnLabel: string;
};

export type UserInfoDBType = {
  _id: string;
  img: string;
  username: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  city: string;
  occupation: string;
  role: string;
  phone: string;
  isAdmin: Boolean;
};

// type UserRowDataType=Partial<UserInfoDBType>

export type UseFetchStateType<T> = {
  data: null | T;
  error: null | Error;
  isLoading: boolean;
  // fetchData?: () => Promise<void>;
};

const ListItems = ({ title, btnLabel }: UsersTypeProp): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const url = `${BASE_URL}/api/users/`;

  const { fetchState } = useFetch<Object[]>(url);
  // const { fetchState } = useFetch<UserInfoDBType[]>(url);
  const { data, isLoading, error } = fetchState;

  //user, isLoading, y manejo del error

  console.log(isLoading, error);

  const itemRows = (() => {
    if (!!data) {
      return data;
    } else {
      return itemRowsData!;
    }
  })();

  // const userRows:UserRowDataType[]=!!data?data:userRowsData;
  //----------temporal dev
  const { ...queHay } = useAuthData();
  console.log(
    'quehay desde Users:',
    Object.entries(queHay.authState).flat(Infinity)
  ); //por ahora
  //----------

  return (
    <>
      {!!data && (
        <>
          <ShowPageTable
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            title={title}
            btnLabel={btnLabel}
            rowsData={itemRows!}
            headerColumn={itemsHeaderColumnData}
            routePage={'users'}
          />
          <AddNew
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            headersColumn={itemsHeaderColumnData}
            itemToAdd='user'
            routePage={'users'}
          />
        </>
      )}
    </>
  );
};

export default Users;
