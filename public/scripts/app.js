'use strict';

/**
 * @ngdoc overview
 * @name resumeApp
 * @description
 * # resumeApp
 *
 * Main module of the application.
 */
angular
    .module('resumeApp', [
        'ui.router',
        'ngRoute',

    ])
    .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('app', {
                    url: '/',
                    views: {
                        'header': {
                            templateUrl: 'views/header.html',
                            
                        },
                        'content': {
                            templateUrl: 'views/home.html',
                            controller: 'HomeController'
                        },
                        'footer': {
                            templateUrl: 'views/footer.html'
                        }
                    }
                })
                .state('app.features',{
                    url:'features',
                    views:{
                        'content@':{
                          templateUrl:'views/features.html'
                        }
                    }
                })
                .state('app.projects',{
                    url:'projects',
                    views:{
                        'content@':{
                          templateUrl:'views/projects.html'
                        }
                    }
                })
                .state('app.pizza',{
                    url:'projects/pizza',
                    views:{
                        'content@':{
                          templateUrl:'views/pizza.html'
                        }
                    }
                })

                
        $urlRouterProvider.otherwise('/');
    })
;

