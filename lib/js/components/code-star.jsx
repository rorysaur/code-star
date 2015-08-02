import React from 'react';
import Actions from '../actions/actions';
import RepoList from './repo-list.jsx';
import UserReposStore from '../stores/user-repos-store';
import _ from 'lodash';

var CodeStar = React.createClass({
  componentDidMount: function() {
    UserReposStore.on('change', this._onStoreChange);
  },

  componentWillUnmount: function() {
    UserReposStore.removeListener('change');
  },

  getInitialState: function() {
    return {
      usersToCompare: {
        username1: 'rorysaur',
        username2: 'gotno'
      },

      userRepos: []
    };
  },

  render: function() {
    var repoLists = this.state.userRepos.map(function(repoList, idx) {
      return (
        <RepoList key={idx} repoList={repoList} />
      );
    });

    return (
      <div>
        <h1>hi from code star</h1>

        <div>
          User 1
          <input type="text"
            value={this.state.usersToCompare.username1}
            onChange={this._onChange.bind(this, 'username1')} />

          User 2
          <input type="text"
            value={this.state.usersToCompare.username2}
            onChange={this._onChange.bind(this, 'username2')} />

          <button onClick={this._onClick}>Compare stars!</button>
        </div>

        <div>
          {repoLists}
        </div>
      </div>
    );
  },

  _onChange: function(fieldName, event) {
    var usersToCompare = this.state.usersToCompare;
    usersToCompare[fieldName] = event.target.value;

    var newState = _.assign(this.state, {
      usersToCompare: usersToCompare
    });

    this.setState(newState);
  },

  _onClick: function(event) {
    var usernames = _.values(this.state.usersToCompare);
    Actions.compareUsers(usernames);
  },

  _onStoreChange: function() {
    var newState = _.assign(this.state, {
      userRepos: UserReposStore.all()
    });

    this.setState(newState);
  }
});

export default CodeStar;
