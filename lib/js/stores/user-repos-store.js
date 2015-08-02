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

      var starsStats = UserReposStore.starsStats(user.repos);
      user.totalStars = starsStats.totalStars;
      user.avgStars = starsStats.avgStars;
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
  },

  starsStats: function(repos) {
    var totalStars = repos.reduce(function(total, repo) {
      return total + repo.stars;
    }, 0);

    var avgStars = totalStars / repos.length;
    var avgStarsRounded = Math.round(avgStars * 100) / 100;

    return {
      totalStars: totalStars,
      avgStars: avgStarsRounded
    };
  },

  winner: function() {
    var user0 = _userRepos[0];
    var user1 = _userRepos[1];

    if (user0.totalStars === user1.totalStars) {
      // tie
      return null;
    } else if (user0.totalStars > user1.totalStars) {
      return user0;
    } else {
      return user1;
    }
  }
});

var dispatchHandler = {
  GET_REPOS_SUCCESS: function(userRepos) {
    // extract the data we need
    var userRepos = UserReposStore.cleanUserReposData(userRepos);
    
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



