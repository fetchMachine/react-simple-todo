
export const users = [
  { id: 1, name: 'Bob', isBanned: true },
  { id: 2, name: 'Иннокентий', isBanned: false },
  { id: 3, name: 'Евклидий', isBanned: true },
  { id: 4, name: 'Петр', isBanned: false },
  { id: 5, name: 'Афанасий', isBanned: true },
];

export const FILTER_STATUSES = {
  ALL: 'all',
  BANNED: 'banned',
  ACTIVE: 'active',
}

export const filterOptions = [
  { value: FILTER_STATUSES.ALL, label: 'Все' },
  { value: FILTER_STATUSES.ACTIVE, label: 'Активные' },
  { value: FILTER_STATUSES.BANNED, label: 'Забанненные' },
];
