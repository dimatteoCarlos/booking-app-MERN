//DetailedUser.tsx
//Parent: useRouter.tsx

import DetailedInfo from '../../components/detailedInfo/DetailedInfo';
import { singleUser } from '../../data/data.ts';
const DetailedUser = () => {
  return (
    <>
      <DetailedInfo detailedInfo={singleUser} />
    </>
  );
};

export default DetailedUser;
