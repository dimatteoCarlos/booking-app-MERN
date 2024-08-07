//ShowPageTable.tsx
//Parents:ListItems.tsx

import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../components/dataTable/DataTable';

import './showPageTable.css';
import { Link } from 'react-router-dom';

type PageTypeProp = {
  title: string;
  btnLabel: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  setRowsData: React.Dispatch<React.SetStateAction<{}[]>>;
  rowsData: {}[];
  headerColumn: GridColDef[];
  routePage: string;
  routePath: string;
  url: string;
};

function ShowPageTable({
  title,
  btnLabel,
  rowsData,
  headerColumn,
  routePage,
  routePath,
  url,
  setRowsData,
  setIsModalOpen,
}: PageTypeProp): JSX.Element {
  console.log('from ShowPageTable:', url, routePage);

  return (
    <>
      <div className='page__container'>
        <div className='page__info'>
          {title}

          {routePage == 'hotels' && (
            <Link to={`${routePath}/new`}>
              <button
                className='page__info__button'
              >
                {btnLabel}
              </button>
            </Link>
          )}

          {routePage !== 'hotels' && (
            <button
              className='page__info__button'
              onClick={() => setIsModalOpen(true)}
            >
              {btnLabel}
            </button>
          )}
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
