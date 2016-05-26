var gulp = require('gulp');
var gutil = require('gulp-util');
var gTs = require('gulp-typescript');
var os = require('os');

gulp.task('default', ['usage']);

gulp.task('usage', () => {
    "use strict";

    var usageLines = [
        '',
        '',
        chalk.green('usage'),
        '\tdisplay this help page.',
        '',
        chalk.green('build'),
        '\tbuilds the project and outputs to the dist folder.',
        '',
        chalk.green('test'),
        '\truns all the tape unit tests.',
        ''
    ];
    gutil.log(usageLines.join(os.EOL));
});

gulp.task('build', () => {
    gutil.log('Not implemented yet!');
});

gulp.task('test', () => {
    gutil.log('Not implemented yet!');
});
