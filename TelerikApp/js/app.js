angular.module('telerik.app', ['ionic', 'modules'])

    .constant('EVERLIVE_API_KEY', 'zOkB1dDKGOUzuPYN')
    .constant('EVERLIVE_TYPES', {
        Users: 'Users',
        Activities: 'Activities',
        Comments: 'Comments'
    })
    .constant('EVERLIVE_RESPONSIVE_IMAGE_URL', 'https://bs1.cdn.telerik.com/image/v1/{{0}}/resize=w:{{1}}/{{2}}')

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
            })

            .state('activities', {
                url: '/activities',
                templateUrl: 'partials/activitiesPartial.html',
                controller: 'ActivitiesCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }]);