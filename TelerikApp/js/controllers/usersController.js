angular.module('controllers')
    .controller('UsersCtrl', ['$scope', '$everlive', function ($scope, $everlive) {
        $scope.users = [];
        $scope.refreshUsers = function () {
            $everlive
                .getUsers()
                .then(function (users) {
                    $scope.users = users;
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

        $scope.refreshUsers();
    }]);
