var gulp = require('gulp');
//编译less文件
var less = require('gulp-less');
//测试
var mocha = require('gulp-mocha');
//压缩js代码
var uglify = require('gulp-uglify');
//拼接整合代码
var concat = require('gulp-concat');
//压缩css代码
var mincss = require('gulp-clean-css');
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

// gulp.task('less',function () {
// 	return gulp.src('./src/less/*.less')
// 	.pipe(less())
// 	.pipe(gulp.dest('./public/stylesheets'))
// });

gulp.task('mincss',function () {
	return gulp.src('./src/less/*.less')
	.pipe(less())
	.pipe(mincss())
	.pipe(gulp.dest('./public/stylesheets'))
})

gulp.task('mocha test',function () {
	return gulp.src('./src/test/index.test.js')
	.pipe(mocha())
})

gulp.task('jsmin',function () {
	return gulp.src('./src/javascript/*.js')
	.pipe(uglify({
		// compress:默认true,是否完全压缩
		// preserveComments:'all' ,注释保留
		mangle:false //是否压缩变量名，默认：true
		// mangle:false,
		// mangle:{except:['require','exports','module','$']}
	}))
	.pipe(gulp.dest('./public/javascript'))
})

gulp.task('concat',function() {
	return gulp.src('./public/javascript/*.js')
	.pipe(concat('all.min.js'))//合并后的文件名
	.pipe(gulp.dest('./public/javascript'))
})

gulp.task('default',['mincss','mocha test','jsmin','concat'],function () {
	console.log('success')
})