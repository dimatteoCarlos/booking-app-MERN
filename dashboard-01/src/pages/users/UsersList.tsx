//UsersList.tsx
//Parents:useRouter.tsx

import { userRows as userRowsData } from '../../data';

import { usersHeaderColumnData } from './usersHeaderColumns';

import { useState } from 'react';


// import ShowPageTable from '../../components/showPageTable/ShowPageTable';

// import AddNew from '../../components/addNew/AddNew';

import { useAuthData } from '../../context/AuthContext';
// import useFetch from '../../hooks/useFetch';
// import { BASE_URL } from '../../constants/constants';

import { TitleBtnType } from '../../types/types';
type UsersTypeProp = TitleBtnType;

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

// export type UseFetchStateType<T> = {
//   data: null | T;
//   error: null | Error;
//   isLoading: boolean;
//   // fetchData?: () => Promise<void>;
// };

const UsersList = ({ title, btnLabel }: UsersTypeProp): JSX.Element => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const endpoint = `/api/users/`;

  // const { fetchState } = useFetch<Object[]>(url);
  // const { fetchState } = useFetch<UserInfoDBType[]>(url);
  // const { data, isLoading, error } = fetchState;

  //user, isLoading, y manejo del error

  // console.log(isLoading, error);

  // const userRows = (() => {
  //   if (!!data) {
  //     return data;
  //   } else {
  //     return userRowsData!;
  //   }
  // })();

  // const userRows:UserRowDataType[]=!!data?data:userRowsData;
  //----------temporal dev
  // const { ...queHay } = useAuthData();
  // console.log(
  //   'quehay desde Users:',
  //   Object.entries(queHay.authState).flat(Infinity)
  ) //por ahora
  //----------

  return (
    <>

    <ListItems></ListItems>
      {!!data && (
        <>
          <ShowPageTable
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            title={title}
            btnLabel={btnLabel}
            rowsData={userRows!}
            headerColumn={usersHeaderColumnData}
            routePage={'users'}
          />
          <AddNew
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            headersColumn={usersHeaderColumnData}
            itemToAdd='user'
            routePage={'users'}
          />
        </>
      )}
    </>
  );
};

export default Users;
