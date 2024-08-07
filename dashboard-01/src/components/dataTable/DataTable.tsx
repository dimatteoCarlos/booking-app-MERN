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
import axios from 'axios';

type DataTableTypeProp = {
  rowsData: { [key: string]: string | number | null | JSX.Element }[];
  setRowsData: React.Dispatch<React.SetStateAction<{}[]>>;
  headerColumn: GridColDef<Object>[];
  routePage: string;
  url: string;
};

const DataTable = ({
  rowsData,
  setRowsData,
  headerColumn,
  routePage,
  url:dbUrl,
}: DataTableTypeProp): JSX.Element => {


  //--------functions-------------------
  const handleDelete = async (id: number | string) => {
    console.log('Handle Delete of item ', { id });
    const newRowsData = rowsData.filter((item) => {
      const itemId = item._id ? item._id : item.id;
      return (itemId !== id);
    });

    // const newRowsDatas=rowsData.filter(x=>x._id!==id)

    setRowsData(newRowsData);

    //Handling delete of item on database
    

    if (routePage !== 'products') {
      try {
        
      const response = await axios.delete(`${dbUrl}${id}`);
      const apiResp = await response.data;
      console.log(`endpoint: ${dbUrl}${id}`);
      console.log(apiResp);
      } catch (error) {
        
      }
    }

    console.log(`id: ${id} has been deleted from`,routePage);
  };
//--------------
  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Actions',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams): JSX.Element => {
      const id = !!params.row._id ? params.row._id : params.row.id;

      return (
        <div className='actions'>
          <Link to={`${id}`}>
            <img src='/view.svg' alt='' />
          </Link>

          <div className='delete' onClick={() => handleDelete(id)}>
            <img src='/delete.svg' alt='del' />
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
          rows={rowsData}
          getRowId={(row: any) => (row._id ? row._id : row.id)}
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
