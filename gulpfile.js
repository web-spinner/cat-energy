var gulp = require('gulp');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var server = require('browser-sync').create();
var plumber = require('gulp-plumber');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline; 
var ghpages = require('gh-pages');


gulp.task("html", function () {
 return gulp.src("source/**/*.html")
    .pipe(posthtml([
        include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task('css', function(done){
  var plugins = [
    autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })
  ];

  gulp.src('./source/scss/style.scss')
    .pipe(plumber())
    .on('error', console.error.bind(console))
    .pipe(sourcemaps.init())
    .pipe( sass({
      errorLogToConsole: true
    }) )
    .pipe(sourcemaps.write('./'))
    .pipe( gulp.dest('./build/css/') )
    .pipe(postcss(plugins))
    .pipe( csso() )
    .pipe( rename({suffix: '.min'}) )
    .pipe(sourcemaps.write('./'))
    .pipe(plumber.stop())
    .pipe( gulp.dest('./build/css/') )
    .pipe(server.stream());
  done();
});

gulp.task('js', function () {
  return pipeline(
        gulp.src('./source/**/*.js'),
        uglify(),
        gulp.dest('build')
  );
});

gulp.task("fonts", function () {
  return gulp.src("./source/fonts/**/*.{eot,otf,ttf,woff,woff2,svg}", {base: "source"})
    .pipe(gulp.dest("build"));
});

gulp.task('images', function () {
  return gulp.src('./source/img/**/*.{gif,png,jpg,svg}', {base: 'source'})
    .pipe(gulp.dest("build"))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('./build'));
});


gulp.task('webp', function(){
  return gulp.src('./build/img/**/*.{png,jpg}') 
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('./build/img'))
});

gulp.task('sprite', function(){
  return gulp.src('./build/img/**/icon__*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./build/img/'));
});

gulp.task("clean", function () {
  return del("build");
});


gulp.task('deploy', function() {
  return ghpages.publish('build', function(err) {});
});

gulp.task('serve', function(done){
  server.init({
    server: {
      baseDir: "./build"
    },
    port: 3000
  });
  done();
});

gulp.task('reload', function(done){
  server.reload();
  done();
});

gulp.task('build', gulp.series(['clean', 'fonts', 'images', 'webp', 'sprite', 'html', 'css', 'js' ]));

gulp.task('watch', function(){
  gulp.watch('./source/fonts/**/*', gulp.series( ['fonts', 'reload']) );
  gulp.watch('./source/img/**/*', gulp.series( ['images', 'webp', 'sprite', 'reload'] ));
  gulp.watch('./**/*.{html, js, scss, sass}', gulp.series( ['html', 'css', 'js', 'reload'] ));
});

gulp.task('server', gulp.series( [ 'build', gulp.parallel('serve', 'watch') ] ));
gulp.task('default', gulp.series('server'));
