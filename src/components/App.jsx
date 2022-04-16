import React from 'react';
import { connect } from 'react-redux';

import { CheckboxGroup } from './common';
import css from './styles.module.css';
import { FILTER_STATUSES, filterOptions } from './constants';
import { UsersSelectors, UsersActionCreators } from '../store';

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

class AppOriginal extends React.Component {
  state = {
    taskInput: '',
    filter: FILTER_STATUSES.ALL,
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
    const { users } = this.props;
    const { taskInput, filter } = this.state;

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
                this.props.deleteUser(id)
              }}>удали меня</button>}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: UsersSelectors.getUsers(state)
});

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (id) => dispatch(UsersActionCreators.deleteUser(id)),
})

export const App = connect(mapStateToProps, mapDispatchToProps)(AppOriginal)
