//usersHeaderColumns.tsx

import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';

export const usersHeaderColumnData: GridColDef<Object>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'img',
    headerName: 'Image',
    width: 100,

    renderCell: (params: GridRenderCellParams): JSX.Element => {
      return (
        <img
          className='image'
          src={params.row.img || '/noavatar.png'}
          alt={params.row.lastName}
        />
      );
    },
  },

  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
    type: 'string',
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
    type: 'string',
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 110,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    type: 'string',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    type: 'string',

    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },

  {
    field: 'verified',
    headerName: 'Verified',
    description: 'boolean',
    sortable: true,
    width: 90,
    type: 'boolean',
  },
];
