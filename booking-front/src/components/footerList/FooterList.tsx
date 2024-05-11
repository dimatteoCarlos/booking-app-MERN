import './footerList.css';

import { list1, list2, list3, list4, list5 } from './listElements.ts';

const urlSample =
  'https://www.booking.com/country.html?label=gen173nr-1FCAEoggI46AdIM1gEaPEBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKVuNyrBsACAdICJGZhNjBkMDY5LTg5MGEtNGVjZS05N2RiLTM4MDM5NDhkMWNkOdgCBeACAQ&sid=aad024f81245bf90a94baf1306667513';

const FooterList = (): JSX.Element => {
  const listElements = [list1, list2, list3, list4, list5];

  return (
    <footer className='footer'>
      <div className='lists-container'>
        {listElements.map((list, indx) => (
          <ul className='list' key={'list:' + indx.toString()}>
            {list.map((elem, ind) => (
              <li className='list-item' key={ind}>
                <a href={urlSample} target='blank'>
                  {elem}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className='copy-right'>
        Copyright &copy; 2023 CADR based on Booking.com &trade; for educational
        purposes.
      </div>
    </footer>
  );
};

export default FooterList;
