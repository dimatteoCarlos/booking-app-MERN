//DateRangeComp.tsx
import '../search.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';
import type { Range, RangeKeyDict } from 'react-date-range';

type PropsType = {
  setDate: React.Dispatch<React.SetStateAction<Range[] | []>>;
  date: Range[] | undefined;
};

const DateRangeComp = ({
  date: selectionRange,
  setDate,
}: PropsType): JSX.Element => {
  function onChangeHandler(item: RangeKeyDict): void {
    setDate([item.selection]);
  }

  return (
    <>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => onChangeHandler(item)}
        moveRangeOnFirstSelection={false}
        ranges={selectionRange}
        className='date-range'
        minDate={new Date()}
      />
    </>
  );
};

export default DateRangeComp;
