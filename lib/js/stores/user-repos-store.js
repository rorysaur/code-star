import AppDispatcher from '../dispatcher.js';
import { EventEmitter } from 'events';
import _ from 'lodash';

var _userRepos = [];

var UserReposStore = _.assign(EventEmitter.prototype, {
  all: function() {
    return _userRepos; 
  },

  cleanUserReposData: function(userRepos) {
    var cleanedUserRepos = userRepos.map(function(user) {
      user.repos = UserReposStore.cleanRepoData(user.repos);
      return user;
    });

    return cleanedUserRepos;
  },

  cleanRepoData: function(repos) {
    var cleanedRepos = repos.map(function(repo) {
      var cleanedRepo = {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        owner: repo.owner.login,
        url: repo.html_url,
        stars: repo.stargazers_count
      };

      return cleanedRepo;
    });

    return UserReposStore.sortByStars(cleanedRepos);
  },

  sortByStars: function(repos) {
    return repos.sort(function(repo1, repo2) {
      return repo2.stars - repo1.stars;
    });
  }
});

var dispatchHandler = {
  GET_REPOS_SUCCESS: function(userRepos) {
    // extract the data we need
    userRepos = UserReposStore.cleanUserReposData(userRepos);
    
    // save the data to the store's internal objects
    _userRepos = userRepos;
  }
}

UserReposStore.dispatchToken = AppDispatcher.register(function(action) {
  if (dispatchHandler.hasOwnProperty(action.type)) {
    dispatchHandler[action.type](action.data);
    UserReposStore.emit('change');
  };
});

export default UserReposStore;



