//ListItem.tsx
//Parents:UsersList.tsx, useRouter.tsx

import { useState } from 'react';
import ShowPageTable from '../../components/showPageTable/ShowPageTable';
import AddNew from '../../components/addNew/AddNew';
import useAdminFetch from '../../hooks/useAdminFetch';
import { BASE_URL } from '../../constants/constants';
import { useLocation } from 'react-router-dom';
import { GridColDef } from '@mui/x-data-grid';
import { useAuthData } from '../../context/AuthContext';

type ListItemsTypeProp = {
  itemsHeaderColumnData: GridColDef<Object>[];
  itemRowsData?: {}[] | null;
};

// type UserRowDataType=Partial<UserInfoDBType>

export type UseFetchStateType<T> = {
  data: null | T;
  error: null | Error;
  isLoading: boolean;
};

const ListItems: React.FC<ListItemsTypeProp> = ({
  itemsHeaderColumnData,
  itemRowsData,
}: ListItemsTypeProp): JSX.Element => {
  const location = useLocation();
  const routePath = location.pathname;
  const routePage = routePath.split('/')[1];
  const itemToAdd = `${routePage.substring(0, routePage.length - 1)}`;
  const title = routePage,
    btnLabel = `add new ${itemToAdd}`;

  const url = `${BASE_URL}${routePath}/`;

  // const { fetchState } = useFetch<UserInfoDBType[]>(url);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchState } = useAdminFetch<Object[]>(url);
  const { data, isLoading, error } = fetchState;
  // console.log(isLoading, error);
  //user, isLoading, y manejo del error

  const itemRows = (() => {
    if (!!data) {
      return data;
    } else {
      return itemRowsData!;
    }
  })();

  return (
    <>
      {/* {!!error && (
        <div className='error'>Nothing in the database!</div>
      )} */}
      {isLoading && <div className='loader'>Loading ....</div>}

      {!!itemRows && (
        <>
          <ShowPageTable
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            title={title}
            btnLabel={btnLabel}
            rowsData={itemRows!}
            headerColumn={itemsHeaderColumnData}
            routePage={routePage}
          />

          <AddNew
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            headersColumn={itemsHeaderColumnData}
            itemToAdd={itemToAdd}
            routePage={routePage}
          />
        </>
      )}
    </>
  );
};

export default ListItems;
