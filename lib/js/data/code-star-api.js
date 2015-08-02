import $ from 'jquery';

var CodeStarAPI = {
  getRepos: function(usernames, successCallback, errorCallback) {
    $.when(
      CodeStarAPI.getReposForUser(usernames[0]),
      CodeStarAPI.getReposForUser(usernames[1])
    )
    .done(function(args0, args1) {
      var userRepos = usernames.map(function(username, idx) {
        return {
          username: username,

          // first element in each `args` array is the response data
          repos: (idx === 0) ? args0[0] : args1[0]
        };
      });

      successCallback(userRepos);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown);
    });
  },

  getReposForUser: function(username, successCallback, errorCallback) {
    var url = 'http://api.github.com/users/' + username + '/repos';

    return $.ajax({
      type: 'get',
      url: url
    });
  }
};

export default CodeStarAPI;
