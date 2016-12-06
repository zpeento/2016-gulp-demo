var gulp = require('gulp');
var less = require('gulp-less');
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
	return gulp.src('./public/stylesheets/less/*.less')
	.pipe(less())
	.pipe(gulp.dest('./public/stylesheets/css'))
});

gulp.task('default',['less'],function () {
	console.log('success')
})