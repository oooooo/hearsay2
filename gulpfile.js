var gulp = require('gulp'), 
    connect = require('gulp-connect'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
	uglify = require('gulp-uglify'); 

//server task
gulp.task('server', function() { 
    connect.server({
        // root:"", 
        livereload: true 
    });  
}); 

//compass task
gulp.task('compass', function() {
    gulp.src('src/scss/*.scss') 
    .pipe(compass({
            sourcemap:true,
            time:true,
            css: 'dist/css/',
            sass: 'src/scss/',
            style: 'compact' //nested, expanded, compact, compressed
        }))
    .pipe(gulp.dest('dist/css'))  
    .pipe(connect.reload());  
}); 

//js task
gulp.task('js', function() { 
    gulp.src('src/js/*.js') 
    .pipe(concat('app.js')) 
    .pipe(uglify()) 
    .pipe(gulp.dest('dist/js')) 
}); 

gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});
 
 
//default task
gulp.task('default',['server','compass','js','html'],function(){ 
    gulp.watch('src/js/*',['js']); 
    gulp.watch('src/scss/*',['compass']); 
    gulp.watch('*.*', ['html']);
});

