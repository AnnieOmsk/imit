module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({
    clean: {
      all: {
        src: [ 'views/layouts', 'public/css', 'public/js' ]
      }
    },
    multiply_layouts: {
      dev: {
        options: {
          staticSrc: 'public-dev',
          staticDst: 'public',
          cssDir: 'css',
          jsDir: 'js'
        },
        layouts: [{
          src: 'views/layouts-dev',
          dst: 'views/layouts',
          mode: 'dev'
        }]
      },
      prod: {
        options: {
          staticSrc: 'public-dev',
          staticDst: 'public',
          cssDir: 'css',
          jsDir: 'js'
        },
        layouts: [{
          src: 'views/layouts-dev',
          dst: 'views/layouts',
          mode: 'prod'
        }]
      }
    }
  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-multiply-layouts');

  // define the tasks

  grunt.registerTask('dev', 'Production task.', ['clean', 'multiply_layouts:dev']);
  grunt.registerTask('default', 'Development task.', [ 'clean', 'multiply_layouts:prod']);
};