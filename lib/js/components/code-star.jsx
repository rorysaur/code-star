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
        username1: '',
        username2: ''
      },

      userRepos: [],

      winner: {}
    };
  },

  render: function() {
    var repoLists = this.state.userRepos.map(function(repoList, idx) {
      return (
        <RepoList key={idx} repoList={repoList} />
      );
    });

    var winnerMsg;
    if (this.state.winner && this.state.winner.username) {
      winnerMsg = (
        <div>
          <h2>
            The winner is <span className="orange">{this.state.winner.username}</span>!
          </h2>
        </div>
      );
    } else if (this.state.winner === null) {
      // tie
      winnerMsg = (
        <div>
          Both users are tied!
        </div>
      );
    } else {
      // no winner yet
      winnerMsg = (
        <div></div>
      );
    }

    return (
      <div>
        <div className="header">
          <h1>Which Github user has more stars?</h1>

          <div>
            {winnerMsg}
          </div>

          <div>
            <div className="input input-1">
              1
              <input type="text"
                value={this.state.usersToCompare.username1}
                onChange={this._onChange.bind(this, 'username1')}
                onKeyDown={this._onKeyDown} />
            </div>

            <div className="input input-2">
              2
              <input type="text"
                value={this.state.usersToCompare.username2}
                onChange={this._onChange.bind(this, 'username2')}
                onKeyDown={this._onKeyDown} />
            </div>

            <div className="button compare-button"
                 onClick={this._onClick}>
              Compare!
            </div>
          </div>
        </div>

        <div className="user-repo-lists">
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

  _onKeyDown: function(event) {
    if (event.keyCode === 13) {
      this._onClick();
    }
  },

  _onStoreChange: function() {
    var newState = _.assign(this.state, {
      userRepos: UserReposStore.all(),
      winner: UserReposStore.winner()
    });

    this.setState(newState);
  }
});

export default CodeStar;
