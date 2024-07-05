//productsHeaderColumns.tsx

import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

export const productsHeaderColumnData: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
    editable: false,
    type: 'string',
  },
  {
    field: 'img',
    headerName: 'Image',
    width: 100,
   
    renderCell: (params: GridRenderCellParams): JSX.Element => {
      return (
        <img className='image' src={params.row.img || '/noavatar.png'}  />
      );
    },
  },  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 250,
  },

  {
    field: 'color',
    headerName: 'Color',
    width: 90,
    editable: true,
    type: 'string',
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
    editable: true,
    type: 'string',
  },
  {
    field: 'producer',
    headerName: 'Producer',
    width: 150,
    editable: true,
    type: 'string',
  },

  {
    field: 'createdAt',
    headerName: 'Created At',
    type: 'string',
    width: 90,
    editable: true,
    sortable: true,
  },
  {
    field: 'inStock',
    headerName: 'In Stock',
    type: 'boolean',
    width: 90,
    editable: true,
  },
];
