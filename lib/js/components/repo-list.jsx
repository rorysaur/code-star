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
      <div>
        <h2>{repoList.username}</h2>
        <h4>Total Stars: {repoList.totalStars}</h4>
        <h4>Average Stars: {repoList.avgStars}</h4>
        <ul>
          {repoItems} 
        </ul>
      </div>
    )
  }
});

export default RepoList;
