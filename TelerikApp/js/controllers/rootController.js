angular.module('controllers')
    .controller('RootCtrl', ['$scope', '$everlive', function ($scope, $everlive) {
        $scope.responsiveImage = $everlive.responsiveImage;
    }]);