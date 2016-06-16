"use strict";
var lodash_1 = require("lodash");
(function (ChildLocation) {
    ChildLocation[ChildLocation["LEFT"] = 0] = "LEFT";
    ChildLocation[ChildLocation["RIGHT"] = 1] = "RIGHT";
})(exports.ChildLocation || (exports.ChildLocation = {}));
var ChildLocation = exports.ChildLocation;
var BinaryTree = (function () {
    function BinaryTree(data) {
        this._data = data;
    }
    BinaryTree.prototype.getNodeData = function () {
        return this._data;
    };
    BinaryTree.prototype.setNodeData = function (data) {
        this._data = data;
    };
    BinaryTree.prototype.addChild = function (node, index) {
        index = index || ChildLocation.LEFT;
        if (index === ChildLocation.LEFT) {
            this._leftChild = new BinaryTree(node);
        }
        else {
            this._rightChild = new BinaryTree(node);
        }
    };
    BinaryTree.prototype.getChildAt = function (loc) {
        return loc === ChildLocation.LEFT ? this._leftChild : this._rightChild;
    };
    BinaryTree.prototype.removeChild = function (loc) {
        var removedChild = this.getChildAt(loc).clone();
        if (loc === ChildLocation.LEFT) {
            this._leftChild = undefined;
        }
        else {
            this._rightChild = undefined;
        }
        return removedChild;
    };
    BinaryTree.prototype.size = function () {
        if (!this._leftChild && !this._rightChild) {
            return 1;
        }
        else if (!this._leftChild) {
            return 1 + this._rightChild.size();
        }
        else if (!this._rightChild) {
            return 1 + this._leftChild.size();
        }
        else {
            return 1 + this._leftChild.size() + this._rightChild.size();
        }
    };
    BinaryTree.prototype.height = function () {
        if (!this._leftChild && !this._rightChild) {
            return 1;
        }
        else if (!this._leftChild) {
            return 1 + this._rightChild.height();
        }
        else if (!this._rightChild) {
            return 1 + this._leftChild.height();
        }
        else {
            return 1 + lodash_1.max([this._leftChild.height(), this._rightChild.height()]);
        }
    };
    BinaryTree.prototype.numChildren = function () {
        if (this._leftChild && this._rightChild) {
            return 2;
        }
        else if (this._leftChild || this._rightChild) {
            return 1;
        }
        else {
            return 0;
        }
    };
    BinaryTree.prototype.clone = function () {
        var newTree = new BinaryTree();
        newTree._data = this._data;
        newTree._leftChild = this._leftChild;
        newTree._rightChild = this._rightChild;
        return newTree;
    };
    return BinaryTree;
}());
exports.BinaryTree = BinaryTree;
