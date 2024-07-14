//usersHeaderColumns.tsx

import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';

export const usersHeaderColumnData: GridColDef<Object>[] = [
  {
    field: 'country',
    headerName: 'Country',
    width: 80,
    sortable: true,
    editable: true,
  },
  {
    field: 'img',
    headerName: 'Image',
    width: 75,

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
    width: 140,
    editable: true,
    type: 'string',
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 140,
    editable: true,
    type: 'string',
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 180,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    type: 'string',
    width: 130,
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
    field: 'isAdmin',
    headerName: 'isAdmin',
    description: 'boolean',
    sortable: true,
    width: 80,
    type: 'boolean',
  },

  {
    field: 'city',
    headerName: 'City',
    description: 'text',
    sortable: true,
    width: 180,
    type: 'string',
  },
];
