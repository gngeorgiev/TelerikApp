angular.module('factories')
    .factory('$everlive', ['EVERLIVE_API_KEY', '$q', 'EVERLIVE_TYPES', function (EVERLIVE_API_KEY, $q, EVERLIVE_TYPES) {
        var service = new Everlive(EVERLIVE_API_KEY);
        everliveImages.init(EVERLIVE_API_KEY);

        function getImageUrl(imageId) {
            return service.Files.getDownloadUrlById(imageId)
        }

        function getUsers() {
            var deferred = $q.defer();

            var expandExpression = {
                Liked: true
            };

            service.data(EVERLIVE_TYPES.Users)
//                .withHeaders({
//                    "X-Everlive-Debug": true
//                })
                .expand(expandExpression)
                .get()
                .then(function (data) {
                    deferred.resolve(data.result);
                }, function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function getActivities() {
            var deferred = $q.defer();

            var expression = {
                CreatedBy: 'User',
                Likes: true
            };

            var query = new Everlive.Query();
            query.orderDesc('CreatedAt');

            service.data(EVERLIVE_TYPES.Activities)
                .expand(expression)
                .get(query)
                .then(function(data) {
                    deferred.resolve(data.result);
                }, function (err){
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        return {
            service: service,
            getUsers: getUsers,
            getActivities: getActivities,
            getImageUrl: getImageUrl,
            images: everliveImages
        };
    }]);