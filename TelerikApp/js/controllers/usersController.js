angular.module('controllers')
    .controller('UsersCtrl', ['$scope', '$everlive', '$timeout', function ($scope, $everlive, $timeout) {
        $scope.users = [];
        $scope.predicate = 'DisplayName';
        $scope.refreshUsers = function () {
            $everlive
                .getUsers()
                .then(function (models) {
                    $scope.users = models;
                    $timeout(function (){
                        $everlive.images.responsiveAll();
                        $scope.$broadcast('scroll.refreshComplete');
                    });

                });
        };

        $scope.refreshUsers();
    }]);
