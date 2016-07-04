module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            files: {
                src: 'src/**/*',
                dest: 'dist/linq.js'
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

    // register at least this one task
    grunt.registerTask('default', [ 'concat', 'uglify' ]);
};