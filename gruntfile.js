module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-shell');

    grunt.initConfig({
        shell: {
            'test': {
                command: 'karma start test/karma.conf.js'
            },
            'protractor': {
                command: 'protractor test/protractor.conf.js'
            }
        }
    });

    grunt.registerTask('test-debug', ['shell:test']);
    grunt.registerTask('test-e2e', ['shell:protractor']);
};