//Header.tsx

import './header.css';

import Badge from '../badges/Badges';
//import Types
import { headerItemType, headerTitleType } from '../../types/types';
import Title from './title/Title';
import Search from '../search/Search';
import InputChecks from '../inputChecks/InputChecks';

//-------Data-----------
//----header list item data
const headerListData: headerItemType[] = [
  { icon: 'stays', title: 'Stays', status: true },
  { icon: 'flights', title: 'Flights', status: false },
  { icon: 'carRentals', title: 'Car rentals', status: false },
  { icon: 'attractions', title: 'Attractions', status: false },
  { icon: 'taxis', title: 'Airport taxis', status: false },
];

//----header title data
const headerTitleData: headerTitleType = {
  title: 'Find your next stay',
  description: 'Search deals on hotels, homes, and much more...',
};

import { ModeType } from '../../types/types';

//----prop type
export type HeaderPropType = {
  modeType: ModeType;
};
//--------*****-----------------
function Header({ modeType }: HeaderPropType): JSX.Element {
  
  return (
    <>
      <div className='header'>
        <div
          className={
            modeType == 'list'
              ? 'header-container list-mode'
              : 'header-container'
          }
        >
          <div className='header-list'>
            {headerListData.map((item, indx) => (
              <Badge key={indx} {...item} />
            ))}
          </div>
          {modeType !== 'list' && (
            <>
              <div className='header-title'>
                <Title {...headerTitleData} />

                <div className='header-search'>
                  <Search />
                  <InputChecks />
                </div>
              </div>
            </>
          )}
        </div>
        {/* end of header-container */}
      </div>
    </>
  );
}

export default Header
