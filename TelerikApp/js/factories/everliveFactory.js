angular.module('factories')
    .factory('$everlive', ['EVERLIVE_API_KEY', '$q', 'EVERLIVE_TYPES', 'EVERLIVE_RESPONSIVE_IMAGE_URL', 'EVERLIVE_REQUEST_URL', '$http',
        function (EVERLIVE_API_KEY, $q, EVERLIVE_TYPES, EVERLIVE_RESPONSIVE_IMAGE_URL, EVERLIVE_REQUEST_URL, $http) {

            var service = new Everlive(EVERLIVE_API_KEY);
            everliveImages.init(EVERLIVE_API_KEY);

            function sendEverliveRequest(type, expand, sort, powerFields) {
                var url = EVERLIVE_REQUEST_URL
                    .replace('{{0}}', EVERLIVE_API_KEY)
                    .replace('{{1}}', type),
                    i = 1,
                    argument;

                for(; i < arguments.length; i++){
                    argument = arguments[i];
                    if(typeof(argument) === 'object') {
                        arguments[i] = JSON.stringify(argument);
                    }
                }

                var headers = {
                    'Content-type': 'application/json'
                };

                if(expand) {
                    headers['X-Everlive-Expand'] = expand;
                }

                if(sort) {
                    headers['X-Everlive-Sort'] = sort;
                }

                if(powerFields) {
                    headers['X-Everlive-Power-Fields'] = powerFields;
                }


                return $http({
                    method: 'get',
                    url: url,
                    headers: headers
                });
            }

            function responsiveImage(size, url) {
                return EVERLIVE_RESPONSIVE_IMAGE_URL
                    .replace('{{0}}', EVERLIVE_API_KEY)
                    .replace('{{1}}', size)
                    .replace('{{2}}', url);
            }

            function getUsers() {
                var deferred = $q.defer();

                var expandExpression = {
                    Picture: {
                        ReturnAs: 'UserPicture',
                        SingleField: 'Uri'
                    }
                };

                var sortExpression = {
                    DisplayName: 1
                };

                var powerFields = {
                    Liked: {
                        queryType: 'get',
                        contentType: 'Activities',
                        filter: {
                            Likes: '${Id}'
                        },
                        fields: {
                            Text: 1,
                            CreatedBy: 1
                        },
                        powerFields: {
                            User: {
                                queryType: 'get',
                                contentType: 'Users',
                                filter: {
                                    Id: '${CreatedBy}'
                                },
                                fields: {
                                    DisplayName: 1
                                },
                                take: 1
                            }
                        }
                    }
                };

                sendEverliveRequest(EVERLIVE_TYPES.Users, expandExpression, sortExpression, powerFields)
                    .then(function(response) {
                        deferred.resolve(response.data.Result);
                    }, function(err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            function getActivities() {
                var deferred = $q.defer();

                var expandExpression = {
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

                var sortExpression = {
                    CreatedAt: 0
                };

                sendEverliveRequest(EVERLIVE_TYPES.Activities, expandExpression, sortExpression)
                    .then(function (response) {
                       deferred.resolve(response.data.Result);
                    }, function(err) {
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