angular.module('telerik.app', ['ionic', 'modules'])

    .constant('EVERLIVE_API_KEY', 'zOkB1dDKGOUzuPYN')

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: 'partials/homePartial.html',
                controller: 'HomeCtrl'
            })

            .state('users', {
                url: '/users',
                templateUrl: 'partials/usersPartial.html',
                controller: 'UsersCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }]);