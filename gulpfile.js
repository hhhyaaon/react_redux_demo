var gulp = require("gulp");
var browserSync = require("browser-sync").create();

gulp.task("server",function(){
    browserSync.init({
        server:"./dist"
    });
});