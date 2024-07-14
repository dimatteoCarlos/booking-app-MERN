//roomsHeaderColumns.tsx

import {
  GridColDef,
  // GridRenderCellParams,
  // GridValueGetterParams,
} from '@mui/x-data-grid';

export const roomsHeaderColumnData: GridColDef<Object>[] = [
  { field: '_id', headerName: 'ID', width: 70 },
  {
    field: 'title',
    headerName: 'Title',
    width: 230,
  },
  {
    field: 'desc',
    headerName: 'Description',
    width: 200,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 100,
  },
  {
    field: 'maxPeople',
    headerName: 'Max People',
    width: 100,
  },
];
