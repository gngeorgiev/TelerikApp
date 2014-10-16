angular.module('controllers')
    .controller('HomeCtrl', ['$scope', '$state', function ($scope, $state) {
        $scope.navigate = function (state) {
            $state.go(state);
        };
    }]);