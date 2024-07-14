//ShowPageTable.tsx
//Parents:ListItems.tsx

import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../components/dataTable/DataTable';

import './showPageTable.css';

type PageTypeProp = {
  title: string;
  btnLabel: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
  setRowsData:React.Dispatch<React.SetStateAction<{}[]>>;
  rowsData: {}[];
  headerColumn: GridColDef[];
  routePage: string;
  url:string;
};

function ShowPageTable({
  title, btnLabel, rowsData, headerColumn, routePage,url, setIsModalOpen,setRowsData,
}: PageTypeProp): JSX.Element {
  
  return (
    <>
      <div className='page__container'>
        <div className='page__info'>
          {title}
          <button
            className='page__info__button'
            onClick={() => setIsModalOpen(true)}
          >
            {btnLabel}
          </button>
        </div>

        <div className='page__content'>
          <DataTable
            rowsData={rowsData}
            setRowsData={setRowsData}
            headerColumn={headerColumn}
            routePage={routePage}
            url={url}
            />

        </div>
      </div>
    </>
  );
}

export default ShowPageTable;
