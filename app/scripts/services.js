/*jslint devel: true */
/*global angular */
'use strict';
angular.module('confusionApp')
    .constant("baseURL", "http://localhost:3000/")
    .service('menuFactory', ['$http', 'baseURL', function ($http, baseURL) {
        
        this.getDishes = function () {
            return $http.get(baseURL + "dishes");
        };
     
        this.getDish = function (index) {
            return $http.get(baseURL + "dishes/" + index);
        };
        // implement a function named getPromotion
        // that returns a selected promotion.
    
        this.getPromotion = function (index) {
            return $http.get(baseURL + "promotions/" + index);
        };
    
    }])
    
    .factory('corporateFactory', ['$http', 'baseURL', function ($http, baseURL) {
        var corpfac = {};
    
        // Implement two functions, one named getLeaders,
        // the other named getLeader(index)
        // Remember this is a factory not a service
        corpfac.getLeaders = function () {
            return $http.get(baseURL + "leadership");
        };
            
        corpfac.getLeader = function (index) {
            return $http.get(baseURL + 'leadership/' + index);
        };
        return corpfac;
    
    }]);