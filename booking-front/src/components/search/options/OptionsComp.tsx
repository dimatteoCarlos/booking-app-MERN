//OptionsComp.tsx
import '../search.css';
import { OptionsType } from '../../../types/types';

type OptionsCompTypeProp = {
  options: OptionsType;
  setOptions: React.Dispatch<React.SetStateAction<OptionsType>>;
  setIsOptionsOpen(value: React.SetStateAction<boolean>): void;
};

export type LabelType = keyof OptionsType;

export type OpType = 'sum' | 'sub';

const OptionsComp = ({
  options,
  setOptions,
  setIsOptionsOpen,
}: OptionsCompTypeProp) => {
  const labels = Object.keys(options).map((key) => {
    return key as LabelType;
  });

  //----------------

  function updateOptionCounter(keyName: LabelType, operation: OpType): void {
    setOptions((prev) => ({
      ...prev,
      [keyName]: operation === 'sum' ? options[keyName]++ : options[keyName]--,
    }));
  }
  //----------------------------
  function isOptionDisableBtn(
    label: LabelType,
    optionVal: number,
    operation: OpType
  ) {
    if (!label || !operation || optionVal == null) {
      console.warn('Check the types and values of search options');
      return false;
    }
    if (operation == 'sub') {
      if (label == 'children' && optionVal <= 0) {
        return true;
      }

      if ((label == 'adults' || label == 'rooms') && optionVal <= 1) {
        return true;
      }
    } else if (operation == 'sum') {
      if (label == 'children' && optionVal >= 10) {
        return true;
      }

      if ((label == 'adults' || label == 'rooms') && optionVal >= 30) {
        return true;
      }

      return false;
    } else {
      console.warn('Check the operation string type');
    }

    return false;
  }
  //-----------------

  return (
    <>
      {labels.map((label) => (
        <div className='options-item' key={label}>
          <span className='options-label'>{label}</span>
          <div className='options-counter'>
            <button
              className='sub counter-button'
              disabled={isOptionDisableBtn(label, options[label], 'sub')}
              onClick={() => updateOptionCounter(label, 'sub')}
            >
              {' - '}
            </button>

            <div className='counter-number'>{options[label]}</div>

            <button
              className='sum counter-button'
              disabled={isOptionDisableBtn(label, options[label], 'sum')}
              onClick={() => updateOptionCounter(label, 'sum')}
            >
              {' + '}
            </button>
          </div>
        </div>
      ))}
      <button className='done-btn' onClick={() => setIsOptionsOpen(false)}>
        Done
      </button>
    </>
  );
};

export default OptionsComp;
