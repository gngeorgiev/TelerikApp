angular.module('controllers')
    .controller('UsersCtrl', ['$scope', '$everlive',function ($scope, $everlive) {
        $scope.users = [];
        $scope.predicate = 'DisplayName';
        $scope.refreshUsers = function () {
            $everlive.Users.get()
                .then(function (data) {
                    $scope.users = data.result;
                    $scope.$broadcast('scroll.refreshComplete');

                    $everlive.Files.getDownloadUrlById($scope.users[0].Picture)
                        .then(function(downloadUrl){
                            document.getElementById('anchor1').href = downloadUrl;
                        });

                });
        };

        $scope.refreshUsers();
    }]);
