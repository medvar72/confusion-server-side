/*jslint devel: true */
/*global angular */
'use strict';
angular.module('confusionApp')
    
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";
        $scope.dishes = [];
        menuFactory.getDishes()
            .then(
                function (response) {
                    $scope.dishes = response.data;
                    $scope.showMenu = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                    $scope.showMenu = false;
                }
            );
        $scope.select = function (setTab) {
            $scope.tab = setTab;
                
            if (setTab === 2) {
                $scope.filtText = "appetizer";
            } else if (setTab === 3) {
                $scope.filtText = "mains";
            } else if (setTab === 4) {
                $scope.filtText = "dessert";
            } else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };
    
        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };
    }])

        .controller('ContactController', ['$scope', function ($scope) {

        $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
            
        var channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];
            
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
                        
    }])
        /* var feedback is available her because feedBackController is inside of contactController*/
        .controller('FeedbackController', ['$scope', function ($scope) {
        $scope.sendFeedback = function () {
            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            } else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
        $scope.showDish = false;
        $scope.message = "Loading ...";
        $scope.dish = {};
        menuFactory.getDish(parseInt($stateParams.id, 10))
            .then(
                function (response) {
                    $scope.dish = response.data;
                    $scope.showDish = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                    $scope.showDish = false;
                }
            );
    }])

        .controller('DishCommentController', ['$scope', function ($scope) {
            /*DishCommentController is inside of DishDetailController such as $scope.dish is accesible 
            by DishCommentcontroller*/
            
            //Step 1: Create a JavaScript object to hold the comment from the form
        $scope.userComment = {rating: 5, comment: "", author: "", date: ""};
            
        $scope.submitComment = function () {
            //Step 2: This is how you record the date
            $scope.userComment.date = new Date().toISOString();

            // Step 3: Push your comment into the dish's comment array
            $scope.dish.comments.push({rating: $scope.userComment.rating, comment: $scope.userComment.comment, author: $scope.userComment.author, date: $scope.userComment.date});

            //Step 4: reset your form to pristine
            $scope.commentForm.$setPristine();
            console.log($scope.userComment);
            //Step 5: reset your JavaScript object that holds your comment
            $scope.userComment = {rating: 5, comment: "", author: "", date: ""};
        };
    }])

        // implement the IndexController and About Controller here
        .controller('IndexController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory', function ($scope, $stateParams, menuFactory, corporateFactory) {
        $scope.showDish = false;
        $scope.showPromotion = false;
        $scope.showLeader = false;
        $scope.message = "Loading ...";
        $scope.featuredDish = {};
        $scope.promo = {};
        $scope.leader = {};
        
        menuFactory.getDish(3)
            .then(
                function (response) {
                    $scope.featuredDish = response.data;
                    $scope.showDish = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                    $scope.showDish = false;
                }
            );
            
        menuFactory.getPromotion(0)
            .then(
                function (response) {
                    $scope.promo = response.data;
                    $scope.showPromotion = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                    $scope.showPromotion = false;
                }
            );
            
        corporateFactory.getLeader(0)
            .then(
                function (response) {
                    $scope.leader = response.data;
                    $scope.showLeader = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                    $scope.showLeader = false;
                }
            );
    }])

        .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
        $scope.showCorporate = false;
        $scope.message = "Loading ...";
        $scope.leaders = [];
        corporateFactory.getLeaders()
            .then(
                function (response) {
                    $scope.leaders = response.data;
                    $scope.showCorporate = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                    $scope.showCorporate = false;
                }
            );
    }]);
