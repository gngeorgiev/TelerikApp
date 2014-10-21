module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-shell');

    grunt.initConfig({
        shell: {
            'test': {
                command: 'karma start test/karma.conf.js'
            }
        }
    });

    grunt.registerTask('test-debug', ['shell:test']);
};