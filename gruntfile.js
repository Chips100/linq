module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            options: {
                banner: '(function() {',
                footer: '})();'
            },
            files: {
                src: 'src/**/*.js',
                dest: 'dist/linq.js'
            }
        },

        jsdoc : {
            dist : {
                src: ['src/**/*.js'],
                options: {
                    destination: 'docs'
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.config.js'
            }
        },

        // define source files and their destinations
        uglify: {
            files: { 
                src: 'dist/linq.js',  // source files mask
                dest: 'dist/',    // destination folder
                expand: true,    // allow dynamic building
                flatten: true,   // remove all unnecessary nesting
                ext: '.min.js'   // replace .js to .min.js
            }
        }
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jsdoc');

    // register at least this one task
    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('release', ['concat', 'uglify', 'jsdoc']);
};