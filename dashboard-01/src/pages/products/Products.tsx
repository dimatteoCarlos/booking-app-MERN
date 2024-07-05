//Products.tsx
//Parents:useRouter.tsx

import { products } from '../../data';

import { productsHeaderColumnData } from './productsHeaderColumns';

import { useState } from 'react';

import { TitleBtnType } from '../../types/types';

import ShowPageTable from '../../components/showPageTable/ShowPageTable';

import AddNew from '../../components/addNew/AddNew';

type ProductsTypeProp = TitleBtnType;

const Products = ({ title, btnLabel }: ProductsTypeProp): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ShowPageTable
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={title}
        btnLabel={btnLabel}
        rowsData={products}
        headerColumn={productsHeaderColumnData}
        routePage={'products'}
      />

      <AddNew
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        headersColumn={productsHeaderColumnData}
        itemToAdd='product'
        routePage={'products'}
      />
    </>
  );
};

export default Products;
