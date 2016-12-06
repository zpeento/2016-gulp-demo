var gulp = require('gulp');
var less = require('gulp-less');
var mocha = require('gulp-mocha');
// gulp.task('my task 1',function () {
// 	console.log('task 1');
// })

// gulp.task('my task 2',function () {
// 	console.log('task 2');
// })


//运行gulp会执行默认任务
//对任务顺序进行排序，默认的任务在最后执行
// gulp.task('default',['my task 1','my task 2'],function () {
// 	console.log('hello gulp!')
// });

gulp.task('less',function () {
	return gulp.src('./src/less/*.less')
	.pipe(less())
	.pipe(gulp.dest('./public/stylesheets'))
});

gulp.task('mocha test',function () {
	return gulp.src('./src/test/index.test.js')
	.pipe(mocha())
})
gulp.task('default',['less','mocha test'],function () {
	console.log('success')
})