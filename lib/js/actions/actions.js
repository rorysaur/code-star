import AppDispatcher from '../dispatcher';
import CodeStarAPI from '../data/code-star-api';

var dispatch = function(type, data) {
  AppDispatcher.dispatch({
    type: type,
    data: data
  });
};

var Actions = {
  compareUsers: function(usernames) {
    CodeStarAPI.getRepos(
      usernames,

      function(userRepos) {
        dispatch(
          'GET_REPOS_SUCCESS',
          userRepos
        );
      },

      function(errorMsg) {
        console.log('Error:', errorMsg);
      }
    );
  }
};

export default Actions;
