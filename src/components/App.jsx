import { CheckboxGroup } from './common';
import css from './styles.module.css';
import { FILTER_STATUSES, filterOptions, users } from './constants';

const filter = FILTER_STATUSES.ALL;

const filterUser = (filter, user) => {
  if (filter === FILTER_STATUSES.ALL) {
    return true;
  }

  if (filter === FILTER_STATUSES.BANNED) {
    return user.isBanned;
  }

  return !user.isBanned;
}

export function App() {
  return (
    <div>
      <h1 className={css.header}>Users</h1>
      <form>
        <input />
        <button type="button">Добавить пользователя</button>
      </form>
      <div>
        <CheckboxGroup options={filterOptions} value={FILTER_STATUSES.ACTIVE} />
      </div>
      <ul>
        {users.filter((user) => filterUser(filter, user)).map(({ name, id, isBanned }) => (
          <li key={id}>
            <input type="checkbox" checked={isBanned} />
            {name}
            {isBanned && <button>удали меня</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
