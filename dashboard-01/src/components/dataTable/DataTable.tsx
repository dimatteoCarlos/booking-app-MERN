//DataTable.tsx
//Parent:ShowPageTable.tsx

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';

import './dataTable.css';
import { Link } from 'react-router-dom';

type DataTableTypeProp = {
  rows: Object[];
  headerColumn: GridColDef<Object>[];
  routePage: string;
};

const DataTable = ({
  rows,
  headerColumn,
  routePage,
}: DataTableTypeProp): JSX.Element => {
  //--------functions
  const handleDelete = (id: number) => {
    console.log(`id: ${id} has been deleted`, { routePage });
  };

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams): JSX.Element => {
      return (
        <div className='actions'>
          <Link to={`${params.row.id}`}>
            <img src='/view.svg' alt='' />
          </Link>
          <div className='delete' onClick={() => handleDelete(params.row.id)}>
            <img src='/delete.svg' alt='' />
          </div>
        </div>
      );
    },
  };

  const columns = [...headerColumn, actionColumn];

  return (
    <>
      <div className='dataTable__container'>
        <DataGrid
          className='dataTable__dataGrid'
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 6,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[6]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnSelector
          disableDensitySelector
        />
      </div>
    </>
  );
};

export default DataTable;
