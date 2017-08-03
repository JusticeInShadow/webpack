/**
 * Created by Xufeng.Yang on 2016/8/31.
 */
'use strict';
var gulp = require('gulp'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    path = require("path");
var NODE_ENV = process.env.NODE_ENV || 'product';//测试环境和开发环境为develop 生产环境为product
var pathSrc = path.resolve(__dirname,"src");//源码路径
console.log("NODE_ENV:" + NODE_ENV);

//引用webpack对js进行操作
gulp.task("build", function (callback) {
    console.log("开始 build");
    webpack(webpackConfig, function(err, stats) {
        console.log("err:"+err+" stats:"+stats);
        callback();
    });
    console.log("build webpack");
});

gulp.task("buildDev", function (callback) {
    webpack(webpackConfig, function(err, stats) {
        console.log("err:"+err+" stats:"+stats);
        callback();
    });
});


//监听
gulp.task('watch', ['buildDev'],function (done) {
    gulp.watch(pathSrc + '/**/*', ['buildDev'])
        .on('end', done);

});

//发布
gulp.task('default', ['build']);

//开发
gulp.task('dev', ['watch']);

//测试服务器
gulp.task('test', ['build']);


