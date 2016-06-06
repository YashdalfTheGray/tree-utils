"use strict";
var lodash_1 = require("lodash");
(function (CHILD_LOCATION) {
    CHILD_LOCATION[CHILD_LOCATION["LEFT"] = 0] = "LEFT";
    CHILD_LOCATION[CHILD_LOCATION["RIGHT"] = 1] = "RIGHT";
})(exports.CHILD_LOCATION || (exports.CHILD_LOCATION = {}));
var CHILD_LOCATION = exports.CHILD_LOCATION;
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
        index = index || CHILD_LOCATION.LEFT;
        if (index === CHILD_LOCATION.LEFT) {
            this._leftChild = node;
        }
        else {
            this._rightChild = node;
        }
    };
    BinaryTree.prototype.getChildAt = function (loc) {
        return loc === CHILD_LOCATION.LEFT ? this._leftChild : this._rightChild;
    };
    BinaryTree.prototype.removeChild = function (loc) {
        var removedChild = this.getChildAt(loc)._clone();
        if (loc === CHILD_LOCATION.LEFT) {
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
    BinaryTree.prototype._clone = function () {
        var newTree = new BinaryTree();
        newTree.setNodeData(this.getNodeData());
        newTree.addChild(this.getChildAt(CHILD_LOCATION.LEFT), CHILD_LOCATION.LEFT);
        newTree.addChild(this.getChildAt(CHILD_LOCATION.RIGHT), CHILD_LOCATION.RIGHT);
        return newTree;
    };
    return BinaryTree;
}());
exports.BinaryTree = BinaryTree;
