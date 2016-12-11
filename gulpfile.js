var gulp = require('gulp');
//编译less文件
var less = require('gulp-less');
//测试
var mocha = require('gulp-mocha');
//压缩js代码
var minjs = require('gulp-uglify');
//拼接整合代码
var concat = require('gulp-concat');
//压缩css代码
var mincss = require('gulp-clean-css');
//压缩图像
var minimage = require('gulp-imagemin');



//将less文件编译成css文件
// gulp.task('less',function () {
// 	return gulp.src('./src/less/*.less')
// 	.pipe(less())
// 	.pipe(gulp.dest('./public/stylesheets'))
// });


//先使用less()将less文件编译成css文件，之后再对css文件进行压缩
gulp.task('mincss',function () {
	return gulp.src('./src/less/*.less')
	.pipe(less())
	.pipe(mincss())
	.pipe(gulp.dest('./public/stylesheets'))
})

//对图像文件进行压缩
gulp.task('minimage', function(){
    return gulp.src('./src/images/*.jpg')
        .pipe(minimage({
        	optimizationLevel: 5
        }))
        .pipe(gulp.dest('./public/images'));
});

//使用mocha对文件进行测试
gulp.task('mocha test',function () {
	return gulp.src('./src/test/index.test.js')
	.pipe(mocha())
})

//对js文件进行压缩
gulp.task('minjs',function () {
	return gulp.src('./src/javascript/*.js')
	.pipe(minjs({
		// compress:默认true,是否完全压缩
		// preserveComments:'all' ,注释保留
		mangle:false //是否压缩变量名，默认：true
		// mangle:false,
		// mangle:{except:['require','exports','module','$']}
	}))
	.pipe(gulp.dest('./public/javascript'))
})

//对js文件进行拼接
gulp.task('concat',function() {
	return gulp.src('./public/javascript/*.js')
	.pipe(concat('all.min.js'))//合并后的文件名
	.pipe(gulp.dest('./public/javascript'))
})

gulp.task('default',['mincss','minimage','mocha test','minjs','concat'],function () {
	console.log('success')
})