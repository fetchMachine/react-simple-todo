import { USERS_ACTIONS } from './constants';

export const deleteUser = (id) => ({ type: USERS_ACTIONS.DELETE_USER, payload: id })
