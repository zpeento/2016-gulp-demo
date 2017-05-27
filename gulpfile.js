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
//雪碧图
var sprite = require('gulp.spritesmith');
//png深度压缩工具
var pngquant = require('imagemin-pngquant');
//gulp缓存，使gulp只压缩没有压缩过的图片
var cache = require('gulp-cache');

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

//使用gulp.spritesmith将图片制作成雪碧图
gulp.task('sprite',function() {
	var spriteData = gulp.src('./src/images/*.png').pipe(sprite({
		imgName:'../../src/images/sprite.png',
		cssName:'../../src/less/sprite.less',
		cssFormat:'less',
		padding: 2
		
	}))
	return spriteData.pipe(gulp.dest('./public/images/'))
})

//对图像文件进行压缩
gulp.task('minimage', function(){
    return gulp.src('./src/images/*.*')
		//gulp缓存，使gulp只压缩没有压缩过的图片
        .pipe(cache(minimage({
        	optimizationLevel: 5, //取值范围0-7.默认3
			progressive:true,     //是否无损压缩jpg,默认false
			interlaced:true,      //是否隔行扫描gif
			multipass:true,        //是否多次优化svg直到完全优化
			svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest('./public/images/'));
});

gulp.task('default',['mocha test','minjs','concat','sprite','minimage','mincss'],function () {
	console.log('success')
})