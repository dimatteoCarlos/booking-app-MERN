//ShowPageTable.tsx

//Parents:Products.tsx ,  Users.tsx

import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../components/dataTable/DataTable';

import './showPageTable.css';

type PageTypeProp = {
  title: string;
  btnLabel: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  rowsData: Object[];
  headerColumn: GridColDef[];
  routePage: string;
};

const ShowPageTable = ({
  title,
  btnLabel,
  rowsData,
  headerColumn,
  routePage,
  setIsModalOpen,
}: PageTypeProp): JSX.Element => {
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
            rows={rowsData}
            headerColumn={headerColumn}
            routePage={routePage}
          />
        </div>
      </div>
    </>
  );
};

export default ShowPageTable;
