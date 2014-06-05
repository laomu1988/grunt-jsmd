/*
 * grunt-import
 * https://github.com/laomu1988/grunt-import
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

  // 自动导入css和js文件
      jsmd: {
          test: {
              files: [
                  {
                      //启用动态扩展
                      expand: true,
                      // css文件源的文件夹
                      cwd: 'test/html',
                      // 匹配规则
                      src: ['*.html'],
                      //导出css和sprite的路径地址
                      dest: 'test/out/',
                      // 导出的css名
                      ext: '.html'
                  }
              ]
          }
      }

  });

  // 载入任务
  grunt.loadTasks('tasks');

  // 声明一个别名
  grunt.registerTask('default', ['jsmd']);

};
