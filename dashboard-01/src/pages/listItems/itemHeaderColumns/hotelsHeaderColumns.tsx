//hotelsHeaderColumns.tsx

import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';

export const hotelsHeaderColumnData: GridColDef<Object>[] = [
  { field: '_id', headerName: 'id', width: 250 },
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
    field: 'name',
    headerName: 'Name',
    width: 200,
    editable: true,
    type: 'string',
  },

  {
    field: 'economicPrice',
    headerName: 'Price $',
    width: 100,
    editable: true,
    type: 'number',
  },
  {
    field: 'city',
    headerName: 'City',
    width: 120,
    editable: true,
    type: 'string',
  },
  {
    field: 'description',

    valueGetter: (params: GridValueGetterParams) =>
      !!params.row.details
        ? params.row.details.detailsDescription.description
        : () => 'NO DETAILS DATA',
    headerName: 'Description',
    width: 250,
    editable: false,
    type: 'string',
  },
  // {
  //   field: 'rooms',
  //   headerName: 'Rooms',
  //   type: 'string',
  //   width: 180,
  //   editable: true,
  // },
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
