angular.module('telerik.app', ['ionic', 'modules'])

    .constant('EVERLIVE_API_KEY', 'zOkB1dDKGOUzuPYN')

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeCtrl',
                templateUrl: 'partials/homePartial.html'
            })

            .state('home.users', {
                url: '/users',
                controller: 'UsersCtrl',
                templateUrl: 'partials/usersPartial.html'
            });

        $urlRouterProvider.otherwise('/');
    }]);