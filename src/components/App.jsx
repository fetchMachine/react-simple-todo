import React from 'react';
import { CheckboxGroup } from './common';
import css from './styles.module.css';
import { FILTER_STATUSES, filterOptions } from './constants';

const filterUser = (filter, user) => {
  if (filter === FILTER_STATUSES.ALL) {
    return true;
  }

  if (filter === FILTER_STATUSES.BANNED) {
    return user.isBanned;
  }

  return !user.isBanned;
}

const generateUniqId = (users) => {
  const ids = users.map(({ id }) => id);

  return Math.max(...ids) + 1;
}

export class App extends React.Component {
  state = {
    users: [
      { id: 1, name: 'Bob', isBanned: true },
      { id: 2, name: 'Иннокентий', isBanned: false },
      { id: 3, name: 'Евклидий', isBanned: true },
      { id: 4, name: 'Петр', isBanned: false },
      { id: 5, name: 'Афанасий', isBanned: true },
    ],
    taskInput: '',
    filter: FILTER_STATUSES.ALL,
  }

  deleteTaskHandler = (id) => {
    this.setState((prevState) => ({
      users: prevState.users.filter(({ id: userID }) => userID !== id )
    }));
  }

  inputChangeHanler = (e) => {
    this.setState({ taskInput: e.target.value })
  }

  addTaskHandler = () => {
    this.setState((prevState) => ({
      users: prevState
        .users
        .concat(
          [{ id: generateUniqId(prevState.users),  name: prevState.taskInput, isBanned: false }]
        )
    }))
  }

  toggleCheckbox = (id) => {
    this.setState((prevState) => ({
      users: prevState.users.map((task) => {
        if (task.id !== id) {
          return task
        }

        return { ...task, isBanned: !task.isBanned };
      })
    }))
  }


  changeFilterHandler = (e) => {
    this.setState({ filter: e.target.value });
  }

  render () {
    const { users, taskInput, filter } = this.state;

    return (
      <div>
        <h1 className={css.header}>Users</h1>
        <form>
          <input value={taskInput} onChange={this.inputChangeHanler} />
          <button type="button" onClick={this.addTaskHandler}>Добавить пользователя</button>
        </form>
        <div>
          <CheckboxGroup options={filterOptions} value={filter} onChange={this.changeFilterHandler} />
        </div>
        <ul>
          {users.filter((user) => filterUser(filter, user)).map(({ name, id, isBanned }) => (
            <li key={id}>
              <input type="checkbox" checked={isBanned} onChange={() => {
                this.toggleCheckbox(id)
              }} />
              {name}
              {isBanned && <button onClick={() => {
                this.deleteTaskHandler(id)
              }}>удали меня</button>}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
