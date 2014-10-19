angular.module('factories')

    .factory('$everlive', ['EVERLIVE_API_KEY', '$q', function (EVERLIVE_API_KEY, $q) {
        var service = new Everlive(EVERLIVE_API_KEY);
        everliveImages.init(EVERLIVE_API_KEY);
        var defaultModelProperties = ['DisplayName', 'Email', 'Picture', 'Username'];

        function getImageUrl(imageId) {
            return service.Files.getDownloadUrlById(imageId)
        }

        function buildModels(users, props) {
            var finalUsers = [],
                i = 0,
                initializedUsers = 0,
                newUser,
                currentProperty,
                deferred = $q.defer();

            props = props || defaultModelProperties;

            users.forEach(function(user, index) {
                newUser = {};
                for(i = 0;i < props.length; i++) {
                    currentProperty = props[i];
                    newUser[currentProperty] = user[currentProperty];
                }

                finalUsers.push(newUser);

                getImageUrl(newUser.Picture).then(function (url) {
                    finalUsers[index].PictureUrl = url;
                    initializedUsers++;
                    if(initializedUsers >= users.length) {
                        deferred.resolve(finalUsers);
                    }
                });
            });

            return deferred.promise;
        }

        return {
            service: service,
            buildModels: buildModels,
            getImageUrl: getImageUrl,
            images: everliveImages
        };


    }]);