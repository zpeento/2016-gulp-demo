var gulp = require('gulp');
var less = require('gulp-less');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
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

gulp.task('jsmin',function () {
	return gulp.src('./src/javascript/*.js')
	.pipe(uglify({
		// compress:默认true,是否完全压缩
		// preserveComments:'all' ,注释保留
		// mangle:是否压缩变量名，默认：true
		// mangle:false,
		mangle:{except:['require','exports','module','$']}
	}))
	.pipe(gulp.dest('./public/javascript'))
})

gulp.task('default',['less','mocha test','jsmin'],function () {
	console.log('success')
})