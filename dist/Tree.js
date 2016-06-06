"use strict";
var lodash_1 = require("lodash");
var Tree = (function () {
    function Tree(data) {
        this._data = data;
        this._children = [];
    }
    Tree.prototype.getNodeData = function () {
        return this._data;
    };
    Tree.prototype.setNodeData = function (data) {
        this._data = data;
    };
    Tree.prototype.addChild = function (node) {
        this._children.push(node);
    };
    Tree.prototype.getChildAt = function (index) {
        return this._children[index];
    };
    Tree.prototype.removeChild = function (index) {
        return lodash_1.remove(this._children, function (value, i) {
            return i === index;
        })[0];
    };
    Tree.prototype.size = function () {
        if (this._children.length > 0) {
            return this._children.reduce(function (acc, i) { return acc + i.size(); }, 1);
        }
        else {
            return 1;
        }
    };
    Tree.prototype.height = function () {
        if (this._children.length > 0) {
            return 1 + lodash_1.max(this._children.map(function (c) { return c.height(); }));
        }
        else {
            return 1;
        }
    };
    Tree.prototype.numChildren = function () {
        return this._children.length;
    };
    return Tree;
}());
exports.Tree = Tree;
