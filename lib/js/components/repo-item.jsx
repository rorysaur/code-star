import React from 'react';

var RepoItem = React.createClass({
  render: function() {
    var repo = this.props.repo;

    return (
      <li>{repo.name}: {repo.stars}</li>
    );
  }
});

export default RepoItem;
