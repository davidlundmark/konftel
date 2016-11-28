var gulp = require('gulp');
var watch = require('gulp-watch');

var source = './';
var project_destination = 'C:/Users/dalun/Source/Workspaces/Konftel/Code/Branches/Dev/src/Project/Konftel/code/';
var wwwroot_destination = '//SITECORE/c$/inetpub/wwwroot/Konftel/Website';
var kund_destination = '//bellatrix/kund/konftel';

var debug = true;

//gulp.task('default', ['watch:sync-project', 'watch:sync-wwwroot', 'webpack:watch'/*, 'webpack:dev-server'*/]);
gulp.task('default', ['watch:sync-project', 'watch:sync-wwwroot', 'webpack:watch' /*, 'webpack:dev-server'*/ ]);

var runSequence = require('run-sequence');

//set debug = false, will uglify and more
gulp.task('production', function() {
    debug = false;
    runSequence('watch:sync-kund', 'webpack:watch');
});

//sync files to bellatix kund
gulp.task('watch:sync-kund', function() {
    gulp.src(source, { base: source })
        .pipe(watch(source + 'assets/', { base: source }))
        .pipe(watch(source + 'src/', { base: source }))
        .pipe(watch('*.html', { base: source }))
        .pipe(gulp.dest(kund_destination));
});

//sync files to VS project
gulp.task('watch:sync-project', function() {
    gulp.src(source, { base: source })
        //.pipe(watch(source + 'assets/' + '/**/*', { base: source + 'assets/' }))
        .pipe(watch(source + 'src/', { base: source }))
        .pipe(gulp.dest(project_destination));
});

//sync files to wwwroot
gulp.task('watch:sync-wwwroot', function() {
    gulp.src(source, { base: source })
        //.pipe(watch(source + 'assets/' + '/**/*', { base: source + 'assets/' }))
        .pipe(watch(source + 'src/', { base: source }))
        .pipe(gulp.dest(wwwroot_destination));
});

//trigger webpack --watch
var spawn = require('cross-spawn');

gulp.task('webpack:watch', (cb) => {
    var env = debug ? 'development' : 'production';

    process.env.NODE_ENV = env;
    
    const webpack_watch = spawn('webpack', ['--watch','--display-error-details']);

    webpack_watch.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    webpack_watch.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    webpack_watch.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});

/*
var webpack = require('webpack');
var webpackdevserver = require('webpack-dev-server');
var config = require('./webpack.config.js');
//config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
gulp.task("webpack:dev-server", function(callback) {
    var compiler = webpack(config);
    var server = new webpackdevserver(compiler, {
        contentBase: '../',
        hot: true,
        quiet: true,
        noInfo: true,
        headers: { "Access-Control-Allow-Origin": "*"},
        publicPath: 'http://localhost:8080'
    });
    server.listen(8080);
});
*/
