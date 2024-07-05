//SearchReducer.tsx
//Parent:SearchContext.tsx

import { INITIAL_SEARCH_STATE } from '../context/SearchContext.tsx';
import { SearchStateType } from '../context/SearchContext.tsx';

export type SearchActionsType =
  | {
      type: 'NEW_SEARCH';
      payload: {
        destination: string;
        date: Range[] | { startDate: Date; endDate: Date; key: string }[];
        options: SearchStateType['options'];
      };
    }
  | {
      type: 'RESET_SEARCH';
      payload: SearchStateType;
    };

//-----Reducer------//

export function SearchReducer(state: SearchStateType,
  action: any): any {
  switch (action.type) {
    case 'NEW_SEARCH':
      return action.payload;

    case 'RESET_SEARCH':
      return INITIAL_SEARCH_STATE;

    default:
      return state;
  }
}

//----------------//
