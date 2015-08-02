import React from 'react';
import RepoItem from './repo-item.jsx';

var RepoList = React.createClass({
  render: function() {
    var repoList = this.props.repoList;
    var repoItems = repoList.repos.map(function(repo) {
      return (
        <RepoItem key={repo.id} repo={repo} />
      );
    });

    return (
      <div className="user-repo-list">
        <h2 className="username">{repoList.username}</h2>
        <h4>Total Stars <span className="star-count">{repoList.totalStars}</span></h4>
        <h4>Average Stars Per Repo <span className="star-count">{repoList.avgStars}</span></h4>
        <ul>
          {repoItems} 
        </ul>
      </div>
    )
  }
});

export default RepoList;
