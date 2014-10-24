describe('Everlive Factory basic tests', function () {

    var $httpBackend,
        $everlive,
        usersUrl,
        activitiesUrl,
        users;

    users = JSON.parse('[{"UserPicture":"https://bs2.cdn.telerik.com/v1/zOkB1dDKGOUzuPYN/44472990-52ff-11e4-9704-014be82b3616","Username":"andy","DisplayName":"Andy Gerald","Email":"andy.gerald@telerik.com","Gender":"1","BirthDate":"1990-12-02T22:00:00.000Z","IsVerified":false,"IdentityProvider":"Everlive","Role":"43775670-52ff-11e4-9704-014be82b3616","CreatedAt":"2014-10-13T17:35:06.445Z","ModifiedAt":"2014-10-13T17:35:06.445Z","CreatedBy":"00000000-0000-0000-0000-000000000000","ModifiedBy":"00000000-0000-0000-0000-000000000000","Owner":"44472995-52ff-11e4-9704-014be82b3616","Id":"44472995-52ff-11e4-9704-014be82b3616","Meta":{"Permissions":{"CanRead":true,"CanUpdate":false,"CanDelete":false}},"Liked":[]},{"UserPicture":"https://bs3.cdn.telerik.com/v1/zOkB1dDKGOUzuPYN/44470283-52ff-11e4-9704-014be82b3616","Username":"michael","DisplayName":"Michael Taylor","Email":"michael.taylor@telerik.com","Gender":"1","BirthDate":"1963-12-02T22:00:00.000Z","IsVerified":false,"IdentityProvider":"Everlive","Role":"43775670-52ff-11e4-9704-014be82b3616","CreatedAt":"2014-10-13T17:35:06.445Z","ModifiedAt":"2014-10-13T17:35:06.445Z","CreatedBy":"00000000-0000-0000-0000-000000000000","ModifiedBy":"00000000-0000-0000-0000-000000000000","Owner":"44472994-52ff-11e4-9704-014be82b3616","Id":"44472994-52ff-11e4-9704-014be82b3616","Meta":{"Permissions":{"CanRead":true,"CanUpdate":false,"CanDelete":false}},"Liked":[]},{"UserPicture":"https://bs3.cdn.telerik.com/v1/zOkB1dDKGOUzuPYN/44470282-52ff-11e4-9704-014be82b3616","BirthDate":"1982-12-02T22:00:00.000Z","CreatedAt":"2014-10-13T17:35:06.445Z","CreatedBy":"00000000-0000-0000-0000-000000000000","DisplayName":"Seth Peterson","Email":"seth.peterson@telerik.com","Gender":"1","IdentityProvider":"Everlive","IsVerified":false,"Liked":[{"Text":"It is finally time for graduation! Good job everyone, we made it.","CreatedBy":"44472994-52ff-11e4-9704-014be82b3616","Id":"44472996-52ff-11e4-9704-014be82b3616","User":[{"DisplayName":"Michael Taylor","Id":"44472994-52ff-11e4-9704-014be82b3616"}]}],"ModifiedAt":"2014-10-21T06:37:12.753Z","ModifiedBy":"00000000-0000-0000-0000-000000000000","Owner":"44472992-52ff-11e4-9704-014be82b3616","Role":"43775670-52ff-11e4-9704-014be82b3616","Username":"seth","Id":"44472992-52ff-11e4-9704-014be82b3616","Meta":{"Permissions":{"CanRead":true,"CanUpdate":false,"CanDelete":false}}}]');

    function fail(err) {
        throw new Error(err);
    }

    function checkAllForProperty(property, array, values) {
        var hasVal;
        array.forEach(function (item) {
            hasVal = false;
            values.forEach(function (val) {
                if(item[property] === val) {
                    hasVal = true;
                    expect(item[property]).toBe(val);
                }
            });

            if(!hasVal) {
                fail(JSON.stringify(item) + ' does not have a property with value from ' + values.join());
            }
        });
    }

    beforeEach(function (done) {
        module('telerik.app');
        module('factories');
        module(function ($provide) {
            //this key is for a duplicate backend. Its data won't change
            $provide.constant('EVERLIVE_API_KEY', 'FyaQiS9wWMjLWH9l');
        });
    });

    beforeEach(inject(function (_$httpBackend_, _$everlive_, EVERLIVE_REQUEST_URL, EVERLIVE_API_KEY, EVERLIVE_TYPES) {

        $httpBackend = _$httpBackend_;
        $everlive = _$everlive_;
        var url = EVERLIVE_REQUEST_URL.replace('{{0}}', EVERLIVE_API_KEY);

        usersUrl = url.replace('{{1}}', EVERLIVE_TYPES.Users);
        activitiesUrl = url.replace('{{1}}', EVERLIVE_TYPES.Activities);

        $httpBackend.whenGET(/partials/).respond('');
        $httpBackend.whenGET(usersUrl).respond({
            Result: users
        });
    }));

    describe('Users tests', function () {
        it('Should get 3 users with their displayNames', function (done) {

            $everlive.getUsers().then(function (users) {
                expect(users.length).toBe(3);
                users.forEach(function (user) {
                    expect(user.DisplayName).toBeDefined();
                });

                done();
            });

            $httpBackend.flush();
        });

        it('Should get 3 actual users', function (done) {

            $everlive.getUsers().then(function (users) {
                expect(users.length).toBe(3);
                checkAllForProperty('Username', users, ['michael', 'andy', 'seth']);
                expect(users[2].Liked.length).toBe(1);
                done();
            });

            $httpBackend.flush();
        });

    });

    describe('Activities tests', function () {

    });
});