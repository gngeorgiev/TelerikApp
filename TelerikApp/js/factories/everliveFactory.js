angular.module('factories')
    .factory('$everlive', ['EVERLIVE_API_KEY', '$q', 'EVERLIVE_TYPES', 'EVERLIVE_RESPONSIVE_IMAGE_URL',
        function (EVERLIVE_API_KEY, $q, EVERLIVE_TYPES, EVERLIVE_RESPONSIVE_IMAGE_URL) {
            var service = new Everlive(EVERLIVE_API_KEY);
            everliveImages.init(EVERLIVE_API_KEY);

            function responsiveImage(size, url) {
                return EVERLIVE_RESPONSIVE_IMAGE_URL
                    .replace('{{0}}', EVERLIVE_API_KEY)
                    .replace('{{1}}', size)
                    .replace('{{2}}', url);
            }

            function getUsers() {
                var deferred = $q.defer();

                var expandExpression = {
                    Liked: {
                        ReturnAs: 'Liked',
                        Fields: {
                            Text: 1,
                            CreatedBy: 1
                        }
                    },
                    Picture: {
                        ReturnAs: 'UserPicture',
                        SingleField: 'Uri'
                    }
                };

                var query = new Everlive.Query();
                query.order('DisplayName');

                service.data(EVERLIVE_TYPES.Users)
                    .expand(expandExpression)
                    .get(query)
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
                    CreatedBy: {
                        ReturnAs: 'User',
                        SingleField: 'DisplayName'
                    },
                    Likes: {
                        ReturnAs: 'Likes',
                        SingleField: 'DisplayName'
                    },
                    Picture: {
                        ReturnAs: 'Picture',
                        SingleField: 'Uri'
                    }
                };

                var query = new Everlive.Query();
                query.order('CreatedAt');

                service.data(EVERLIVE_TYPES.Activities)
                    .expand(expression)
                    .get(query)
                    .then(function (data) {
                        deferred.resolve(data.result);
                    }, function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            return {
                service: service,
                getUsers: getUsers,
                getActivities: getActivities,
                responsiveImage: responsiveImage,
                images: everliveImages
            };
        }]);