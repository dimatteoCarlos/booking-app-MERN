//ListItem.tsx
//Parents:UsersList.tsx, useRouter.tsx

import { useEffect, useState } from 'react';
import ShowPageTable from '../../components/showPageTable/ShowPageTable.tsx';
import useAdminFetch from '../../hooks/useAdminFetch.tsx';
import { BASE_URL } from '../../constants/constants.ts';
import { useLocation } from 'react-router-dom';
import { GridColDef } from '@mui/x-data-grid';
import AddNew from '../../components/addNew/AddNew.tsx';
// import { useAuthData } from '../../context/AuthContext';

export type KeyValueType={[key:string]:string|number|boolean|JSX.Element|undefined};

type ListItemsTypeProp = {
  itemsHeaderColumnData: GridColDef<Object>[];
  itemRowsData?: KeyValueType[];}

export type UseFetchStateType<T> = {
  data: null | T;
  error: null | Error;
  isLoading: boolean;
};

//Component------------------------------------
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
  
   const url = `${BASE_URL}${routePath}`;

  console.log('from ListItems:', url, routePath);

  // const { fetchState } = useFetch<UserInfoDBType[]>(url);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowsData, setRowsData] = useState<KeyValueType[]>(itemRowsData!);

  //how to use generic type dinamically without using if?
  const { fetchState } = useAdminFetch<KeyValueType[]>(url);
  const { data, isLoading } = fetchState;

  useEffect(() => {
    const list = (() => {
      if (!!data) {
        return data;
      } else {
        // return data!;
        return itemRowsData??undefined;
      }
    })();
    // console.log('list:', list);

    setRowsData(list!);
  }, [data]);

  return (
    <>
      {isLoading && <div className='loader'>Loading ....</div>}

      {!!rowsData && (
        <>
          <ShowPageTable
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            title={title}
            btnLabel={btnLabel}
            rowsData={rowsData}
            setRowsData={setRowsData}
            headerColumn={itemsHeaderColumnData}
            routePage={routePage}
            routePath={routePath}
            url={url}

          />


          <AddNew
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            headersColumn={itemsHeaderColumnData}
            itemToAdd={itemToAdd}
            routePage={routePage}

            setRowsData={setRowsData}
            rowsData={rowsData}
          />
          
        </>
      )}
    </>
  );
};

export default ListItems;
