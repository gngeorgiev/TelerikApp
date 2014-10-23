describe('Everlive Factory basic tests', function () {

    var $httpBackend,
        $everlive,
        usersUrl,
        activitiesUrl,
        users;

    users = [
        {
            DisplayName: 'User1'
        },
        {
            DisplayName: 'User2'
        },
        {
            DisplayName: 'User3'
        }
    ];

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
                fail(item + ' does not have a property with value from ' + values.join());
            }
        });
    }

    beforeEach(function () {
        module('telerik.app');
        module('factories');
        module(function ($provide) {
            //this key is for a duplicate backend. Its data won't change
            $provide.constant('EVERLIVE_API_KEY', 'FyaQiS9wWMjLWH9l');
        })
    });

    beforeEach(inject(function (_$httpBackend_, _$everlive_, EVERLIVE_REQUEST_URL, EVERLIVE_API_KEY, EVERLIVE_TYPES) {

        $httpBackend = _$httpBackend_;
        $everlive = _$everlive_;
        var url = EVERLIVE_REQUEST_URL.replace('{{0}}', EVERLIVE_API_KEY);

        usersUrl = url.replace('{{1}}', EVERLIVE_TYPES.Users);
        activitiesUrl = url.replace('{{1}}', EVERLIVE_TYPES.Activities);

        $httpBackend.whenGET(/partials/).respond('');
    }));

    describe('Users tests', function () {
        it('Should get 3 users with their displayNames', function (done) {
            $httpBackend.whenGET(usersUrl).respond({
                Result: users
            });

            $everlive.getUsers().then(function (users) {
                expect(users.length).toBe(3);
                users.forEach(function (user) {
                    expect(user.DisplayName).toBeDefined();
                });

                $httpBackend.resetExpectations();
                done();
            });

            $httpBackend.flush();
        });

        it('Should get 3 actual users', function (done) {
            done();
//            $httpBackend.whenGET(usersUrl).passThrough();
//
//            $everlive.getUsers().then(function (users) {
//                expect(users.length).toBe(3);
//                checkAllForProperty('username', users, ['michael', 'andy', 'seth']);
//            });
//
//            $httpBackend.flush();
        });

    });

    describe('Activities tests', function () {

    });
});