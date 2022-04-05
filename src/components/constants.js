
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
