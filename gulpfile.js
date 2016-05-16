// Gulp
var gulp = require('gulp');
var plumber = require('gulp-plumber');

// Sass/CSS stuff
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require("gulp-rename");

// JavaScript
var uglify = require('gulp-uglify');
var concatjs = require('gulp-concat');

// Images
var svgmin = require('gulp-svgmin');
var imagemin = require('gulp-imagemin');

// error handling
var onError = function (err) {  
  console.log(err);
};


// compile all your Sass
	gulp.task('sass', function (){
		gulp.src(['./assets/sass/main.scss', '!./dev/sass/_variables.scss'])
			.pipe(plumber({
		      errorHandler: onError
		    }))
			.pipe(sass({
				includePaths: ['./assets/sass'],
				outputStyle: 'expanded'
			}))
			.pipe(prefix(
				"last 1 version", "> 1%", "ie 8", "ie 7"
				))
			.pipe(gulp.dest('./dist/css'))
			.pipe(minifycss())
			.pipe(rename('main.min.css'))
			.pipe(gulp.dest('./dist/css'));
	});

	gulp.task('bootstrap-sass', function (){
		gulp.src(['./sass/bootstrap.scss'])
			.pipe(plumber({
		      errorHandler: onError
		    }))
			.pipe(sass({
				includePaths: ['./sass'],
				outputStyle: 'expanded'
			}))
			.pipe(prefix(
				"last 1 version", "> 1%", "ie 8", "ie 7"
				))
			.pipe(gulp.dest('./dist/css'))
			.pipe(minifycss())
			.pipe(rename('bootstrap.min.css'))
			.pipe(gulp.dest('./dist/css'));
	});


// JS
	gulp.task('uglify-vendor', function(){
		gulp.src('./js/vendor/*.js')
			.pipe(plumber({
		      errorHandler: onError
		    }))
			.pipe(uglify())
			.pipe(concatjs('*.js'))
			.pipe(rename('vendor.min.js'))
			.pipe(gulp.dest('./dist/js'));
	});

	gulp.task('uglify-controllers', function(){
		gulp.src('./js/app/controllers/src/*.js')
			.pipe(plumber({
		      errorHandler: onError
		    }))
			.pipe(concatjs('controllers.js'))
			.pipe(gulp.dest('./js/app/controllers'))
			.pipe(uglify())
			.pipe(rename('controllers.min.js'))
			.pipe(gulp.dest('./dist/js'));
	});

	gulp.task('uglify-directives', function(){
		gulp.src('./js/app/directives/src/*.js')
			.pipe(plumber({
		      errorHandler: onError
		    }))
			.pipe(concatjs('directives.js'))
			.pipe(gulp.dest('./js/app/directives'))
			.pipe(uglify())
			.pipe(rename('directives.min.js'))
			.pipe(gulp.dest('./dist/js'));
	});

	gulp.task('uglify-filters', function(){
		gulp.src('./js/app/filters/src/*.js')
			.pipe(plumber({
		      errorHandler: onError
		    }))
			.pipe(concatjs('filters.js'))
			.pipe(gulp.dest('./js/app/filters'))
			.pipe(uglify())
			.pipe(rename('filters.min.js'))
			.pipe(gulp.dest('./dist/js'));
	});

	gulp.task('uglify-services', function(){
		gulp.src('./js/app/services/src/*.js')
			.pipe(plumber({
		      errorHandler: onError
		    }))
			.pipe(concatjs('services.js'))
			.pipe(gulp.dest('./js/app/services'))
			.pipe(uglify())
			.pipe(rename('services.min.js'))
			.pipe(gulp.dest('./dist/js'));
	});
	

// Images
	gulp.task('svgmin', function() {
		gulp.src('./assets/img/*.svg')
		.pipe(svgmin())
		.pipe(gulp.dest('./dist/img'));
	});

	gulp.task('imagemin', function () {
		gulp.src('./assets/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/img'));
	});


// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch(['assets/sass/main.scss', 'assets/sass/styles/**/*scss'], ['sass']);
	gulp.watch(['assets/sass/bootstrap/*.scss', 'assets/sass/bootstrap.scss'], ['bootstrap-sass']);
	gulp.watch('js/**/src/*.js', ['uglify-controllers', 'uglify-directives', 'uglify-filters', 'uglify-services']);
	gulp.watch(['assets/img/*'], ['imagemin', 'svgmin']);
});



gulp.task('default', ['sass', 'bootstrap-sass', 'watch', 'uglify-vendor', 'uglify-controllers', 'uglify-directives', 'uglify-filters', 'uglify-services']);