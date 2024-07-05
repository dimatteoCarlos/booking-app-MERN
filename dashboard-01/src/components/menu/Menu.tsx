//Menu.tsx
//Parent:Layout.tsx

import './menu.css';
import { MenuTypeData } from '../../types/types.ts';
import { Link } from 'react-router-dom';

type MenuTypeProp = {
  menu: MenuTypeData[];
};

function Menu({ menu }: MenuTypeProp): JSX.Element {
  return (
    <>
      <div className='menu__container'>
        {menu.map((item) => {
          const { id, title, listItems } = item;
          return (
            <div className='menu__item' key={id}>
              <div className='menu__title'>{title}</div>

              {listItems.map((listItem) => {
                const { id, url, icon, title: linkTitle } = listItem;
                return (
                  <Link to={url} className='menu__link' key={id}>
                    <span className='menu__icon'>
                      <img src={icon} alt={linkTitle} />
                    </span>
                    <span className='menu__link-title'>{linkTitle}</span>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Menu;
