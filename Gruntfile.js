module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        htmlbuild: {
            dev: {
                src: 'src/index_builder.tpl.html',
                dest: 'src/index.html',
                options: {
                    beautify: true,
                    scripts: {
                        app: [
                            'src/main/app/**/*.js',
                            '!src/main/app/**/*Spec*.js',
                            'src/templates.js',
                            'src/main/website/**/*.js', // this is not included in this repo
                            '!src/main/website/**/*Spec.js',
                            ],
                        core: ['src/main/core/**/*.js','!src/main/core/**/*Spec*.js']
                    }
                }
            },
            prod: {
                src: 'src/index_builder.tpl.html',
                dest: 'src/index_minified.html',
                options: {
                    beautify: true,
                    scripts: {
                        app: 'src/minified/app.min.js',
                        core: 'src/minified/core.min.js'
                    }
                }
            }
        },

        jshint: {
            all: {
                src: ['src/main/app/**/*.js', 'src/main/core/**/*.js', 'test/specs']
            },
            options: {
                "curly": true,
                "eqeqeq": true,
                "forin": true,
                "immed": true,
                "indent": 4,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "noempty": true,
                "nonew": true,
                "quotmark": true,
                "sub": true,
                "undef": true,
                "unused": true,
                "strict": true,
                "trailing": true,
                "maxdepth": 3,
                "maxcomplexity": 7,
                "boss": false,
                "eqnull": false,
                "browser": true,
                "globals": {
                    "Class": false,
                    "app": true,
                    "alert": false,
                    "now": false,
                    "console": false,
                    "app_console": false,
                    "d3": false,
                    "dimple": false,
                    "$": false,
                    "_": false,
                    "Debug": false,
                    "jQuery": true,
                    "jasmine": true,
                    "define": true,
                    "describe": true,
                    "inject": true,
                    "beforeEach": true,
                    "afterEach": true,
                    "expect": true,
                    "it": true,
                    "angular": true,
                    "module": true
                }
            }
        },

        compass: {
            dist: {
                options: {
                    basePath: 'src/main',
                    imagesDir: 'resources/img',
                    fontsDir: 'fonts',
                    javascriptsDir: 'resources/js',
                    httpPath: '/',
                    relativeAssets: true,
                    sassDir: 'scss',
                    cssDir: 'resources/css',
                    specify: 'src/main/scss/screen.scss',
                    environment: 'production', // 'production' 'development'
                    outputStyle: 'compressed'
                }
            }
        },

        watch: {
            scss: {
                files: ['src/**/*.scss'],
                tasks: ['compass']
            },
            pivotal: {
                files: ['src/main/app/**/*.js', 'test/specs/**/*.js','src/main/website/**/*.js'],
                tasks: ['connect', 'jasmine', 'jshint', 'buildIndex']
            }


        },

        connect: {
            test: {
                port: 8000
            }
        },

        // this is for standalone jasmine in the browser
        // we generate the template
        jasmine: {

            src: ['./src/main/app/**/*.js', './src/main/core/**/*.js','src/main/website/**/*.js'],
            options: {
                keepRunner: true,
                build: true,
                vendor: [
                    'src/main/resources/lib/angular-1.2.16/angular.js',
                    'src/main/resources/lib/angular-1.2.16/angular-mocks.js',
                    'src/main/resources/lib/angular-1.2.16/angular-resource.js',
                    'src/main/resources/lib/angular-1.2.16/angular-route.js',
                    'src/main/resources/lib/debugger/renderjson.js',
                    'src/main/resources/lib/debugger/dimple.v1.1.2.min.js',
                    'src/main/resources/lib/angular-1.2.16/angular-scenario',
                    'src/main/resources/lib/angular-1.2.16/angular-loader.js',
                    'src/main/resources/lib/class.js',
                    'src/main/resources/lib/angular-translate.min.js',
                    'src/main/resources/lib/stacktrace.js',
                    'src/main/resources/lib/angular-translate.js',

                ],

                specs: 'src/**/*.Spec.js',
                helpers: 'src/**/*.Helper.js',
                host: 'http://127.0.0.1:8000/',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                        baseUrl: '.grunt/grunt-contrib-jasmine/',
                        paths: {
                            // External libraries
                            'angular': 'src/main/resources/lib/angular-1.2.16/angular',
                            'angularMocks': 'src/main/resources/lib/angular-1.2.16/angular-mocks',
                            'angularResource': 'src/main/resources/lib/angular-1.2.16/angular-resource',
                            'angularRoute': 'src/main/resources/lib/angular-1.2.16/angular-route',
                            'angularScenario': 'src/main/resources/lib/angular-1.2.16/angular-scenario',
                            'class': 'src/main/resources/lib/class',
                            'pascal': 'src/main/resources/lib/angular-translate'
                        },
                        shim: {
                            'angular': {
                                'exports': 'angular'
                            },

                            'angular-ui.utils': {
                                deps: ['angular']
                            },
                            'angularMocks': {
                                deps: ['angular'],
                                'exports': 'angular.mock'
                            },
                            'angularResource': {
                                deps: ['angular'],
                                'exports': 'angular.resource'
                            },
                            'angularRoute': {
                                deps: ['angular'],
                                'exports': 'angular.router'
                            },
                            'angularScenario': {
                                deps: ['angular'],
                                'exports': 'angular.scenario'
                            },
                            'angularTranslate':{
                                deps: ['angular'],
                                'exports':'pascalprecht.translate'
                            }


                        }
                    }
                }
            }
        },

        'jasmine-server': {
            browser: true
        },

        // use go to disable constant file watching and run it like the pipeline
        // grunt karma:go
        karma: {
            background: false,
            logLevel: 'debug',
            options: {
                basePath: '',
                // files for karma to host
                files: [
                    // we can't do them all because it breaks
                    {
                        pattern: 'src/main/resources/lib/angular-1.2.16/angular.js',
                        included: true
                    }, {
                        pattern: 'src/main/resources/lib/angular-1.2.16/angular-mocks.js',
                        included: true
                    }, {
                        pattern: 'src/main/resources/lib/angular-1.2.16/angular-resource.js',
                        included: true
                    }, {
                        pattern: 'src/main/resources/lib/angular-1.2.16/angular-route.js',
                        included: true
                    }, {
                        pattern: 'src/main/resources/lib/angular-translate.min.js',
                        included: true
                    }, {
                        pattern: 'src/main/resources/lib/stacktrace.js',
                        included: true
                    }, {
                        pattern: 'src/main/resources/lib/angular-translate.js',
                        included: true
                    },

                    //bake down the templates
                    {
                        pattern: 'src/main/app/templates.js',
                        included: true
                    }, {
                        pattern: 'src/main/**/*.html',
                        included: false
                    }, {
                        pattern: 'src/main/app/**/*.js',
                        included: true
                    },
                    {
                        pattern: 'src/main/website/**/*.js',
                        included: true
                    },
                    {
                        pattern: 'src/main/core/**/*.js',
                        included: true
                    }, {
                        pattern: 'test/lib/underscore-1.6/underscore.js',
                        included: false
                    }, {
                        pattern: 'test/specs/**/*.Spec.js',
                        included: false,
                        watched: true
                    }, {
                        pattern: 'test/KarmaSpecRunner.js',
                        included: true
                    }, {
                        pattern: 'src/main/resources/lib/class.js',
                        included: true
                    }
                ],
                exclude: [
                    'lib/angular-1.2.16/docs/**/*.*',
                    'lib/angular-1.2.16/**/*min.js',
                ],
                plugins: [
                    "karma-jasmine",
                    "karma-phantomjs-launcher",
                    "karma-requirejs",
                    'karma-chrome-launcher',
                    'karma-coverage'
                ],
                frameworks: [
                    "jasmine",
                    "requirejs"
                ],
                browsers: [
                    "PhantomJS",
                    //"Chrome"
                ],
                preprocessors: {
                    '**/src/main/app/**/*.js,!**/src/main/app/**/*spec*.js': ['coverage'],
                    '**/src/main/core/**/*.js,!**/src/main/app/**/*spec*.js': ['coverage']
                    //'src/main/app/**/*.html': ['ng-html2js']
                },
                coverageReporter: {
                    type: 'lcov',
                    dir: 'test/coverage/'
                },
                ngHtml2JsPreprocessor: {
                    // strip this from the file path
                    stripPrefix: '',
                    // prepend this to the
                    prependPrefix: '',

                    // setting this option will create only a single module that contains templates
                    // from all the files, so you can load them all with module('foo')
                    moduleName: 'foo'
                },
                reporters: [
                    'dots',
                    'coverage'
                ]
            },
            go: {
                singleRun: true
            }
        },

        ngmin: {
            app: {
                src: ['src/main/app/**/*.js', '!src/main/app/**/*Spec*.js'],
                dest: 'src/minified/app.js'
            },
            core: {
                src: ['src/main/core/**/*.js','!src/main/core/**/*Spec*.js'],
                dest: 'src/minified/core.js'
            },
            website: {
                src: ['src/main/website/**/*.js', '!src/main/website/**/*Spec*.js'],
                dest: 'src/minified/website.js'
            }
        },


        ngtemplates: {
            'FScapeApp.Services': {
                cwd: '',
                src: ['src/main/app/**/*.html', 'src/main/core/**/*.html','src/main/website/**/*.html'],
                dest: 'src/templates.js'
            }
        },

        coverage: {
            options: {
                thresholds: {
                    'statements': 90,
                    'branches': 90,
                    'lines': 90,
                    'functions': 90
                },
                dir: '',
                root: 'test'
            }
        },

        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: 'scaffold/server.js'
                }
            }
        },

        replace: {
            prod: {
                src: ['src/index_minified.html'], // source files array (supports minimatch)
                dest: 'src/index_minified.html', // destination directory or file
                replacements: [{
                    from: ' type="text/javascript"', // string replacement
                    to: ''
                }]
            },
            dev: {
                src: ['src/index.html'], // source files array (supports minimatch)
                dest: 'src/index.html', // destination directory or file
                replacements: [{
                    from: ' type="text/javascript"', // string replacement
                    to: ''
                }]
            }
        },

        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                    dead_code: true,
                    unused: true
                },
                files: {
                    'src/minified/app.min.js': ['src/minified/app.js'],
                    'src/minified/core.min.js': ['src/minified/core.js'],
                    'src/minified/website.min.js': ['src/minified/website.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-angular-templates');


    // minification tasks
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.registerTask('minify', ['ngmin:app', 'ngmin:core', 'uglify', 'htmlbuild:prod', 'replace:prod']);
+
    // for building the index.html
    grunt.loadNpmTasks('grunt-html-build');
    grunt.registerTask('buildIndex', ['htmlbuild:dev', 'replace:dev']);

    // Default task.
    grunt.registerTask('default', ['watch']);

    //run jasmine and generate the _specRunner.html file
    grunt.registerTask('runJasmine', ['connect', 'jasmine']);

    // For coverage, do karma:go so that it terminates
    grunt.registerTask('unit', ['jshint', 'connect', 'ngtemplates', 'karma:go']);

    // bake the html templates into a js file and register with $templateCache
    grunt.registerTask('ngTemplate', ['connect', 'ngtemplates']);


    grunt.registerTask('makeSpec', ['jasmine:generate']);

    // runs a local scaffold server to serve endpoints until we have them
    grunt.registerTask('server', ['express:dev']);


    // compile task
    grunt.registerTask('compile', ['ngtemplates', 'compass', 'buildIndex' ]);

};