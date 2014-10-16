angular.module('factories')

    .factory('$everlive', ['EVERLIVE_API_KEY', '$q', function (EVERLIVE_API_KEY, $q) {
        var service = new Everlive(EVERLIVE_API_KEY);
        var defaultModelProperties = ['DisplayName', 'Email', 'Picture', 'Username'];

        function getImageUrl(imageId) {
            return service.Files.getDownloadUrlById(imageId)
        }

        function resizeImage(imageUrl) {

        }

        function buildModels(users, props) {
            var finalUsers = [],
                i = 0,
                newUser,
                currentProperty,
                deferred = $q.defer();

            props = props || defaultModelProperties;

            users.forEach(function(user) {
                newUser = {};
                currentProperty = props[i];
                for(;i < props.length; i++) {
                    newUser[currentProperty] = user[currentProperty];
                }

                finalUsers.push(newUser);
            });

            return deferred.promise;
        }

        return {
            service: service,
            buildModel: buildModel,
            getImageUrl: getImageUrl,
            resizeImage: resizeImage
        };


    }]);