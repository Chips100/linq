module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            options: {
                banner: '(function() {',
                footer: '})();'
            },
            files: {
                src: 'src/**/*',
                dest: 'dist/linq.js'
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

    // register at least this one task
    grunt.registerTask('default', [ 'concat', 'uglify', 'karma' ]);
};