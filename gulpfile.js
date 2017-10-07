const gulp = require('gulp');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pump = require('pump');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const browserify = require('gulp-browserify');

gulp.task('compile:js', () => {
    return gulp.src(['./public/scripts/*.js',
            '!./public/scripts/handlebars-v4.0.10.js',
            '!./public/scripts/jquery-3.2.1.min.js',
            '!./public/scripts/sammy-latest.min.js'
        ])
        .pipe(babel({ presets: ['env'] }))
        .pipe(gulp.dest('./tеmp/scripts'));
});

gulp.task('minify:css', () => {
    return gulp.src(['./public/styles/*.css'])
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('minify:js', ['compile:js'], () => {
    return pump([
        gulp.src('./temp/scripts/*.js'),
        uglify(),
        gulp.dest('./dist/scripts')
    ]);
});

gulp.task('browserify:js', ['minify:js'], () => {
    return gulp.src('./dist/scripts/main.js')
        .pipe(browserify())
        .pipe(gulp.dest('./dist/scripts'));
});


gulp.task('build', ['minify:css', 'browserify:js'], () => {});