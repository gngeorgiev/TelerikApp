angular.module('controllers')
    .controller('UsersCtrl', ['$scope', '$everlive', '$timeout', function ($scope, $everlive, $timeout) {
        $scope.users = [];
        $scope.predicate = 'DisplayName';
        $scope.refreshUsers = function () {
            $everlive.service.Users.get()
                .then(function (data) {
                    return $everlive.buildModels(data.result);
                })
                .then(function (models) {
                    $scope.users = models;
                    $scope.$broadcast('scroll.refreshComplete');
                    $timeout(function () {
                        $everlive.images.responsiveAll();
                    });
                });
        };

        $scope.refreshUsers();
    }]);
