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
                    'dist/index.js': 'src/index.js'
                }
            }
        },
        pug: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    'index.html': 'src/index.pug'
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
                    'dist/main.css': 'src/main.scss'
                }
            }
        },
        autoprefixer:{
            dist:{
                files:{
                    'dist/main.css': 'dist/main.css'
                }
            }
        },
        watch: {
            pug: {
                files: 'src/index.pug',
                tasks: ['pug']
            },
            js: {
                files: 'src/index.js',
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
        clean: ['dist/']
    });

    grunt.registerTask('default', ['babel', 'pug', 'sass']);
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-clean');
};
