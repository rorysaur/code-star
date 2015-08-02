import React from 'react';
import RepoItem from './repo-item.jsx';

var RepoList = React.createClass({
  render: function() {
    var repoItems = this.props.repoList.repos.map(function(repo) {
      return (
        <RepoItem key={repo.id} repo={repo} />
      );
    });

    return (
      <div>
        <h2>{this.props.repoList.username}</h2>
        <ul>
          {repoItems} 
        </ul>
      </div>
    )
  }
});

export default RepoList;
