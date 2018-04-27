'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks("gruntify-eslint");

  require('load-grunt-config')(grunt, {
    data: {
      banner: grunt.file.read('resources/banner')
    },
    loadGruntTasks: {
      config: require('./package.json'),
    },
  });

  grunt.registerTask('default', ['clean', 'mkdir', 'copy:main', 'replace', 'eslint', 'karma', 'babel', 'requirejs', 'uglify', 'connect:itest', 'exec', 'copy:demo_libs']);
  grunt.registerTask('demo', ['clean', 'mkdir', 'copy:main', 'replace', 'eslint', 'karma', 'babel', 'requirejs', 'uglify', 'connect:demo']);
};
