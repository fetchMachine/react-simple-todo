import { USERS_ACTIONS } from './constants';

const INITIAL_STATE = {
  users: [
    { id: 1, name: 'Bob', isBanned: true },
    { id: 2, name: 'Иннокентий', isBanned: false },
    { id: 3, name: 'Евклидий', isBanned: true },
    { id: 4, name: 'Петр', isBanned: false },
    { id: 5, name: 'Афанасий', isBanned: true },
  ]
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERS_ACTIONS.DELETE_USER: {
      return {
        users: state.users.filter(({ id: userID }) => userID !== action.payload )
      };
    }

    default:
      return state;
  }
}
