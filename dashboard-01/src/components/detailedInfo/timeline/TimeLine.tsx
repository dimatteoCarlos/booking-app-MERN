import './timeLine.css';

import { Activities } from '../../../types/types';

type TimeLineTypeProp = {
  timeInfo: Activities[];
  title: string | undefined;
};

const TimeLine = ({ timeInfo, title }: TimeLineTypeProp): JSX.Element => {
  return (
    <>
      <div className='timeline__container activities'>
        {title && <h2 className='timeline__title'>{title}</h2>}
        <>
          {timeInfo.map((item, i) => {
            const { time, text } = item;

            return (
              <div className='timeline__info' key={i}>
                <div className='timeline__item '>
                  <p className='timeline__text'>{text}</p>
                  <time className='timeline__time'>{time}</time>
                </div>
              </div>
            );
          })}
        </>
      </div>
    </>
  );
};

export default TimeLine;
