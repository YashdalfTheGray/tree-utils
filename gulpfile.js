const gulp = require('gulp');
const gutil = require('gulp-util');
const ts = require('gulp-typescript');
const os = require('os');
const chalk = require('chalk');
const tape = require('gulp-tape');
const tapColorize = require('tap-colorize');
const merge = require('merge2');
const del = require('del');
const tsconfig = require('./tsconfig.json');

gulp.task('default', ['usage']);

gulp.task('usage', () => {
    "use strict";

    const usageLines = [
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
        '',
        chalk.green('clean'),
        '\talias for ' + chalk.green('clean:build'),
        '',
        chalk.green('clean:build'),
        '\tdeletes the build output folder.',
        '',
        chalk.green('clean:test'),
        '\tdeletes the test output folder.',
        '',
        chalk.green('clean:modules'),
        '\tdeletes the node_modules folder.',
        '\t' + chalk.magenta('NOTE:') + ' ' + chalk.green('npm install') + ' will be required before running the app.',
        '',
        chalk.green('clean:all'),
        '\truns both the ' + chalk.green('clean:build') + ' and the ' + chalk.green('clean:modules') + ' tasks.',
        ''
    ];
    gutil.log(usageLines.join(os.EOL));
});

gulp.task('build', ['clean:build'], () => {
    return buildTypescript(['src/**/*.ts', '!src/**/*.spec.ts', 'typings/index.d.ts'], 'dist/', tsconfig);
});

gulp.task('test', ['_pre:test'], () => {
    return gulp.src('tmp/**/*.spec.js')
    .pipe(tape({ reporter: tapColorize() }));
});

gulp.task('clean', ['clean:build']);

gulp.task('clean:build', () => {
    return del('dist');
});

gulp.task('clean:test', () => {
    return del('tmp');
});

gulp.task('clean:modules', () => {
    return del('node_modules');
});

gulp.task('_pre:test', ['clean:test'], () => {
    return buildTypescript(['src/**/*.ts', 'typings/index.d.ts'], 'tmp/', tsconfig, true);
});

gulp.task('clean:all', ['clean:build', 'clean:test', 'clean:modules']);

function buildTypescript(source, dest, config, testMode) {
    const tsResult = gulp.src(source)
    .pipe(ts(config.compilerOptions));

    if (testMode) {
        return tsResult.js.pipe(gulp.dest(dest));
    }
    else {
        return merge([tsResult.js.pipe(gulp.dest(dest)), tsResult.dts.pipe(gulp.dest(dest))]);
    }
}
