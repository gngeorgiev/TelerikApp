angular.module('controllers')
    .controller('ActivitiesCtrl', ['$scope','$everlive', function ($scope, $everlive) {
        $scope.activities = [];
        $scope.refreshActivities = function () {
            $everlive
                .getActivities()
                .then(function (activities) {
                    $scope.activities =  activities;
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

        $scope.refreshActivities();
    }]);