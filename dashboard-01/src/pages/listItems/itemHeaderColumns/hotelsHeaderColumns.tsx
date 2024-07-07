//hotelsHeaderColumns.tsx

import {
  GridColDef,
  GridRenderCellParams,
  // GridValueGetterParams,
} from '@mui/x-data-grid';

export const hotelsHeaderColumnData: GridColDef<Object>[] = [
  { field: '_id', headerName: 'id', width: 160 },
  {
    field: 'img',
    headerName: 'Image',
    width: 75,

    renderCell: (params: GridRenderCellParams): JSX.Element => {
      return (
        <img
          className='image'
          src={params.row.photoUrlImages[0] || '/noavatar.png'}
          alt={params.row.name}
        />
      );
    },
  },

  {
    field: 'economicPrice',
    headerName: 'Price',
    width: 100,
    editable: true,
    type: 'number',
  },
  {
    field: 'city',
    headerName: 'City',
    width: 140,
    editable: true,
    type: 'string',
  },
  {
    field: 'rooms',
    headerName: 'Rooms',
    type: 'string',
    width: 180,
    editable: true,
  },
  {
    field: 'type',
    headerName: 'Type',
    type: 'string',
    width: 90,
    editable: true,
  },
  {
    field: 'featured',
    headerName: 'Featured',
    sortable: true,
    width: 80,
    type: 'boolean',

  },

];
