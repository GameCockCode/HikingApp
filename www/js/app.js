// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
  Parse.initialize("8AULvwGJ8GZok2cpEUgiGvTA4FGI0yjqxCu6osQc", "G2bkFsLic8Oui1iWrxwci4mSjhJRVQU12D28SSAH");
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'LoginCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.signup', {
    url: '/signin/signup',
    views: {
      'tab-signin': {
        templateUrl: 'templates/tab-signup.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('tab.signin', {
    url: '/signin',
    views : {
        'tab-signin':{
            templateUrl: 'templates/tab-signin.html',
            controller: 'LoginCtrl'
        }
    }
  })
  .state('tab.profile', {
    url: '/profile',
    views : {
        'tab-signin':{
            templateUrl: 'templates/profile.html',
            controller: 'ProfileCtrl'
        }
    }
  })

  .state('tab.trails', {
      url: '/trails',
      views: {
        'tab-trails': {
          templateUrl: 'templates/tab-trails.html',
          controller: 'TrailsCtrl'
        }
      }
    })
    
   .state('tab.trail-detail', {
      url: '/trails/:trailId',
      views: {
        'tab-trails': {
          templateUrl: 'templates/trail-detail.html',
          controller: 'TrailDetailCtrl'
        }
      }
    })
  .state('tab.add-trail', {
      url: '/addtrail',
      views: {
        'tab-trails': {
          templateUrl: 'templates/add-trail.html',
          controller: 'AddTrailCtrl'
        }
      }
    })  
.state('tab.geoloc', {
    url: '/trails/:trailId/geoloc',
    views: {
      'tab-trails': {
        templateUrl: 'templates/trail-geoloc.html',
        controller: 'GeoLocCtrl'
      }
    }
  })

 .state('tab.camera', {
    url: '/trails/:trailId/pictures',
    views: {
      'tab-trails': {
        templateUrl: 'templates/trail-camera.html',
        controller: 'CameraCtrl'
      }
    }
  })
  
   .state('tab.comments', {
    url: '/trails/:trailId/comments',
    views: {
      'tab-trails': {
        templateUrl: 'templates/trail-comments.html',
        controller: 'TrailDetailCtrl'
      }
    }
  })
  .state('tab.add-comment', {
    url: '/trails/:trailId/comments/addcomment',
    views: {
      'tab-trails': {
        templateUrl: 'templates/add-comment.html',
        controller: 'TrailDetailCtrl'
      }
    }
  })
   ;

  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/trails');

});
