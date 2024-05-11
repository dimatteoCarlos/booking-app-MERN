//Badge.tsx
//Parent: Header.tsx
import './badges.css';

import { headerItemType } from '../../types/types';

import BedFront from '../../svg-components/BedFront';
import Flight from '../../svg-components/Flight';
import CarRentals from '../../svg-components/CarRentals';
import Attractions from '../../svg-components/Attractions';
import Taxis from '../../svg-components/Taxis';

const iconComponentNames = {
  stays: BedFront,
  flights: Flight,
  carRentals: CarRentals,
  attractions: Attractions,
  taxis: Taxis,
};

const Badges = ({ icon, title, status }: headerItemType): JSX.Element => {
  const IconComponent = iconComponentNames[icon];

  return (
    <>
      <div className={`button-badge ${status ? 'active' : ''}`}>
        {/* <IconComponent /> */}

        <IconComponent color={'white'} widthsize={20} heightsize={20} />
        {title}
      </div>
    </>
  );
};

export default Badges;
