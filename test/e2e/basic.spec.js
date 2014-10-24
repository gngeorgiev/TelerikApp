describe('Basic e2e tests', function () {
    beforeEach(function () {
        browser.get('http://localhost:8001');
    });

    var hasClass = function (element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };

    it('Should have a title', function () {
        expect(browser.getTitle()).toBe('Telerik App');
    });

    it('The state title should be correct', function () {
        var el = element(by.css('h1.title.ng-binding'));
        expect(el.getText()).toBe('Home');
    });

    it('Should have users and activities buttons', function () {
        var buttons = element.all(by.css('.stretch-height50.stretch-horizontally.center-content'));
        for(var i = 0; i < 2; i++) {
            if(i === 0) {
                expect(buttons.get(i).getText()).toBe('USERS');
            } else {
                expect(buttons.get(i).getText()).toBe('ACTIVITIES');
            }
        }
    });

    it('Should change view when users are clicked', function () {
        var usersButton = element(by.css('.stretch-height50.stretch-horizontally.center-content.button.button-balanced'));
        usersButton.click();

        browser.wait(function () {
            return element(by.css('h1.title.ng-binding')).isPresent();
        }, 1000);

        var el = element(by.css('h1.title.ng-binding'));
        expect(el.getText()).toBe('Users');
    });

    it('Should change view when activities are clicked', function () {
        var usersButton = element(by.css('.stretch-height50.stretch-horizontally.center-content.button.button-assertive'));
        usersButton.click();

        browser.wait(function () {
            return element(by.css('h1.title.ng-binding')).isPresent();
        }, 1000);

        var el = element(by.css('h1.title.ng-binding'));
        expect(el.getText()).toBe('Activities');
    });

    it('Should show users when into users view', function () {
        var usersButton = element(by.css('.stretch-height50.stretch-horizontally.center-content.button.button-balanced'));
        usersButton.click();

        browser.wait(function () {
            return element(by.css('ion-item')).isPresent();
        }, 3000);

        var el = element.all(by.css('ion-item'));
        expect(el.count()).toBeGreaterThan(0);
    });

    it('Should get activities when navigated', function () {
        var activitiesButton = element(by.css('.stretch-height50.stretch-horizontally.center-content.button.button-assertive'));
        activitiesButton.click();

        browser.wait(function () {
            return element(by.css('ion-item')).isPresent();
        }, 3000);

        var el = element.all(by.css('ion-item'));
        expect(el.count()).toBeGreaterThan(0);
    });

    it('Should have backbutton visible when navigating to users', function () {
        var usersButton = element(by.css('.stretch-height50.stretch-horizontally.center-content.button.button-balanced'));
        usersButton.click();

        browser.wait(function () {
            return element(by.css('ion-nav-back-button')).isPresent();
        }, 3000);

        var el = element(by.css('ion-nav-back-button'));
        expect(hasClass(el, 'ng-hide')).toBeFalsy();
    });

    it('Should have backbutton visible when navigating to activities', function () {
        var usersButton = element(by.css('.stretch-height50.stretch-horizontally.center-content.button.button-balanced'));
        usersButton.click();

        browser.wait(function () {
            return element(by.css('ion-nav-back-button')).isPresent();
        }, 3000);

        var el = element(by.css('ion-nav-back-button'));
        el.click();

        browser.wait(function () {
            return true;
        }, 1000);

        var title = element(by.css('h1.title.ng-binding'));
        expect(title.getText()).toBe('Home');
        expect(hasClass(el, 'ng-hide')).toBeTruthy();
    });

    it('Backbutton should be hidden when at home', function () {
        var el = element(by.css('ion-nav-back-button'));
        expect(hasClass(el, 'ng-hide')).toBeTruthy();
    });
});
