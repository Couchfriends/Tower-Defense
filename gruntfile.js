module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/**\n * @link www.couchfriends.com\n * @license MIT\n */\n'
            },
            build: {
                files: {
                    'build/game.js': [
                        'src/js/utils/pixi.js',
                        'src/js/Game.js',
                        'src/js/core/Element.js',
                        'src/game.js'
                    ]
                }
            }
        },
        copy: {
            main: {
                src: ['**'],
                dest: 'build/assets/',
                cwd: 'src/assets/',
                expand: true
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'copy']);

    grunt.loadNpmTasks('grunt-contrib-copy');

};