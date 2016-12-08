/* globals module require */

module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);
    grunt.initConfig({
        babel: {
            options: {
                presets: ['es2015']
            },
            dist: {
                files: {
                    'static/core/js/index.js': 'src/index.js'
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    'sourcemap': 'none'
                },
                files: {
                    'static/core/css/main.css': 'src/main.scss'
                }
            }
        },
        autoprefixer:{
            dist:{
                files:{
                    'static/core/css/main.css': 'static/core/js/main.css'
                }
            }
        },
        watch: {
                        js: {
                files: ['src/index.js'],
                tasks: ['babel']
            },
            sass: {
                files: 'src/main.scss',
                tasks: ['sass', 'autoprefixer']
            },
            options: {
                spawn: false
            }
        },
        clean: ['static/']
    });

    grunt.registerTask('default', ['babel', 'sass']);
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-clean');
};
