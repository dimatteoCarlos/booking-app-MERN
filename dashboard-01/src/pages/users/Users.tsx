//Users.tsx
//Parents:useRouter.tsx

import { userRows } from '../../data';

import { usersHeaderColumnData } from './usersHeaderColumns';

import { useState } from 'react';

import { TitleBtnType } from '../../types/types';

import ShowPageTable from '../../components/showPageTable/ShowPageTable';

import AddNew from '../../components/addNew/AddNew';

type UsersTypeProp = TitleBtnType;

const Users = ({ title, btnLabel }: UsersTypeProp): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ShowPageTable
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={title}
        btnLabel={btnLabel}
        rowsData={userRows}
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
  );
};

export default Users;
