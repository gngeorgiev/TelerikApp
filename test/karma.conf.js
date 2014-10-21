module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'TelerikApp/lib/everlive/src/everlive.all.js',
            'TelerikApp/lib/everlive-responsive/build/js/everlive.images.js',
            'TelerikApp/lib/angular/angular.js',
            'TelerikApp/lib/angular-mocks/angular-mocks.js',
            'TelerikApp/lib/ionic/js/ionic.js',
            'TelerikApp/lib/ionic/js/ionic-angular.js',
            'TelerikApp/lib/angular-animate/angular-animate.js',
            'TelerikApp/lib/angular-sanitize/angular-sanitize.js',
            'TelerikApp/lib/angular-ui-router/release/angular-ui-router.js',
            'TelerikApp/js/*.js',
            'TelerikApp/js/controllers/*.js',
            'TelerikApp/js/factories/*.js',
            'TelerikApp/js/filters/*.js',
            'test/specs/**/*.spec.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
