/**
 * Created by steare on 2/11/14.
 */
module.exports = function (grunt) {

  // Loading external tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
 // grunt.loadNpmTasks('grunt-env');
  //grunt.loadNpmTasks('grunt-karma');


  grunt.initConfig({
    filesAll: [
      './*.js'
    ],
    filesTest: [
      'test/**/*.test.js'
    ],
    filesGrunt: ['Gruntfile.js'],



    /**
     * delta (renamed 'watch' command)
     *
     * default action is 'test'
     *
     * test - will watch all files and run jshint and all mocha tests on changes
     *  > grunt delta:test
     *
     * lint - will watch all files and jshint just the file that changed on save
     *  > grunt delta:lint
     */
    delta: {
      lint: {
        files: '<%= filesAll %>',
        tasks: ['jshint:all']
      },
      test: {
        files: '<%= filesAll %>',
        tasks: ['jshint:all', 'env:mocha', 'mochaTest:test']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: '<%= filesAll %>',
      test: '<%= filesTest %>',
      changedfile: []
    }


  });


  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch', ['delta:lint']);
  grunt.registerTask('test', ['jshint:all']);
};
