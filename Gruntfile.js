module.exports = function(grunt) {
    // Do grunt-related things in here
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: true
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'build',
                        src: ['**/*.js'],
                        dest: 'build'
                    }
                ]

            }
        },
        clean: ['build'],
        watch: {
            script: {
                files: ['js/**/*'],
                tasks: ['default'],
                options: {
                    spawn: false,
                    event: ['changed']
                }
            },
            jade: {
                files: ['jade/**/*'],
                tasks: ['jade'],
                options: {
                    spawn: false,
                    event: ['changed']
                }
            },
            sass: {
                files: ['sass/**/*'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }

        },
        jade: {
            build_jade: {
                options: {pretty: true},
                files: [
                    {
                        src: ['**/**.jade'],
                        dest: 'build',
                        cwd: 'jade',
                        expand: true,
                        ext: '.html'
                    }
                ]
            }

        },
        sass: {
            dist: {
                files: {
                    'build/css/site.css': 'sass/site.scss',
                    'build/css/material.css': 'scss/materialdesignicons.scss'
                }
            }
        },
        concat: {
            js: {
                files: [
                    {
                        src: [
                            'js/**/*', '!js/main.js', 'js/main.js'
                        ],
                        dest: 'build/js/site.js'
                    }
                ]
            },
            icon: {
                files: [
                    {
                        src: "icon/trash.svg",
                        dest: "build/icon/trash.svg"
                    }
                ]
            }
        },
        copy: {
            fonts: {
                files: [{
                    src: ["fonts/**/*"],
                    dest: "build/",
                    expand: true
                }]
            }
        },
        karma: {
            options: {
                files: [

                    //'build/index.html',
                    'test/**',
                    'build/js/**'


                ],
                browsers: ['Chrome'],
                //logLevel: 'DEBUG',
                frameworks: ['jasmine']
            },
            unit: {
                runnerPort: 9101,
                port: 9103,
                background: true
            },
            continuous: {
                singleRun: true
            }
        }
    });
    // Default task(s).
    grunt.registerTask('default', ['clean','jade','concat','sass','copy']);


};