[![Build Status](https://travis-ci.org/YashdalfTheGray/trees.svg?branch=master)](https://travis-ci.org/YashdalfTheGray/trees)
# trees
A collection of tree utilities written in Typescript.

## Usage

Run `npm install https://github.com/YashdalfTheGray/trees --save` to bring `tress` into your project. The package contains classes for a general tree, a binary tree and a binary search tree. It also exports the typings for those so that this can be used in a Typescript project.

## Development

### Installation

Running an `npm run setup` will install everything that this project needs.

This package relies on the fact that `typescript` v2.0.0 or higher is installed globally. It is also a good idea to have `gulp-cli` globally installed as well.

All of this can be done by running `npm install --global typescript gulp-cli`.

### Building

Running either `npm start` or `gulp build` will build the project and put the results in the `dist` folder.

### Testing

Running either `npm test` or `gulp test` will build the project for testing and run the tape tests. The test files are located in the `tmp` folder.
