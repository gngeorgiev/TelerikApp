angular.module('factories')

    .factory('$everlive', ['EVERLIVE_API_KEY',
        function (EVERLIVE_API_KEY) {
            return new Everlive(EVERLIVE_API_KEY);
        }]);