'use strict';

/**
 * @ngdoc function
 * @name resumeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resumeApp
 */
angular.module('resumeApp')
    .controller('HomeController',['$scope', function($scope) {
        $scope.hero = 'Dmytro Kulikov';
    }]);
