var gulp = require("gulp");
var server = require("browser-sync");
var path = require("path");
var babel = require("gulp-babel");
var browserify = require("browserify");
var watchify = require("watchify");
var source = require("vinyl-source-stream");


var assign = require("lodash.assign");
var glob = require("glob");
var factor = require("factor-bundle");
var mkdir = require("mkdirp");


gulp.task("jsx", function () {
    var input_files = glob.sync("./src/**/*.js");
    var input_dirs = glob.sync("./src/**/*/");

    var output_files = input_files.map(function (file) {
        return file.replace("src", "dist");
    });
    input_dirs.map(function (dir) {
        mkdir.sync(dir.replace("src", "dist"));
    });

    var browserArg = {
        entries: input_files,
        transform: [["babelify", { "presets": ["es2015", "react"] }]]
    }
    return watchify(browserify(assign(browserArg, watchify.args)))
        .plugin(factor, { o: output_files })
        .bundle()
        .on("error", function (err) { console.log("[Error]:", err) })
        .pipe(source("common.js"))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("index", function () {
    return gulp.src("./src/index.html")
        .pipe(gulp.dest("./dist/"))
});

gulp.task("server", function () {
    server.init({
        server: {
            baseDir: "./dist/"
        }
    })
});

gulp.task("watch",function(){
	var watchArr = [];
	watchArr.push(gulp.watch("./src/**/*.js",["jsx"],server.reload));
	watchArr.push(gulp.watch("./src/index.html",["index"],server.reload));

	watchArr.forEach(function(watch,i){
		watch.on("change",function(e){
			console.log("["+e.type+"]",e.path.replace(__dirname,""));
		});
	});
	
});


gulp.task("build", ["jsx", "index","watch", "server"]);