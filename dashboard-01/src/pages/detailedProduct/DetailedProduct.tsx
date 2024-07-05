//DetailedProduct.tsx
//Parent: useRouter.tsx

import DetailedInfo from '../../components/detailedInfo/DetailedInfo';
import { singleProduct } from '../../data';

export const DetailedProduct = () => {
  return (
    <>
      <DetailedInfo detailedInfo={singleProduct} />
    </>
  );
};
