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
                    $scope.$apply(function () {
                        $scope.users = models;
                        $timeout(function (){
                            $everlive.images.responsiveAll();
                        });

                        $scope.$broadcast('scroll.refreshComplete');
                    });
                });
        };

        $scope.refreshUsers();
    }]);
