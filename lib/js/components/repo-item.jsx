import React from 'react';

var RepoItem = React.createClass({
  render: function() {
    var repo = this.props.repo;

    return (
      <li>{repo.name} <span className="star-count">{repo.stars}</span></li>
    );
  }
});

export default RepoItem;
