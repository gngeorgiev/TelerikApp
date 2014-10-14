angular.module('directives')
    .directive('tile', [function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            link: function(scope, element, attrs) {
                scope.color = attrs.color || 'stable';
                scope.label = (attrs.label || 'empty').toUpperCase();
            },
            template: '<button class="stretch-height50 stretch-horizontally center-content button button-{{color}}">{{label}}</button>'
        }
    }]);