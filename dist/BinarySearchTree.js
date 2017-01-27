"use strict";
var lodash_1 = require("lodash");
var BinaryTree_1 = require("./BinaryTree");
var BinaryTree_2 = require("./BinaryTree");
exports.ChildLocation = BinaryTree_2.ChildLocation;
var BinarySearchTree = (function () {
    function BinarySearchTree(sortFunction, data) {
        this._sortFunction = sortFunction;
        this._data = data;
    }
    BinarySearchTree.prototype.getNodeData = function () {
        return this._data;
    };
    BinarySearchTree.prototype.setNodeData = function (data) {
        this._data = data;
    };
    BinarySearchTree.prototype.addChild = function (child) {
        var selectedChild;
        if (this._sortFunction(child, this._data) > 0) {
            selectedChild = '_rightChild';
        }
        else if (this._sortFunction(child, this._data) < 0) {
            selectedChild = '_leftChild';
        }
        if (this[selectedChild]) {
            this[selectedChild].addChild(child);
        }
        else {
            this[selectedChild] = new BinarySearchTree(this._sortFunction, child);
        }
    };
    BinarySearchTree.prototype.getChildAt = function (loc) {
        if (loc === BinaryTree_1.ChildLocation.LEFT) {
            return this._leftChild.clone();
        }
        else if (loc === BinaryTree_1.ChildLocation.RIGHT) {
            return this._rightChild.clone();
        }
    };
    BinarySearchTree.prototype.find = function (data) {
        return this._find(data, true);
    };
    BinarySearchTree.prototype.removeChild = function (childData) {
        if (childData !== this._data) {
            var parent_1 = (this._findParent(childData));
            var result = void 0;
            if (parent_1._leftChild && parent_1._leftChild._data === childData) {
                result = parent_1._leftChild._data;
                this._rebuild(parent_1, '_leftChild');
            }
            else if (parent_1._rightChild && parent_1._rightChild._data === childData) {
                result = parent_1._rightChild._data;
                this._rebuild(parent_1, '_rightChild');
            }
            return result;
        }
        else {
            throw new SyntaxError('Attempted to remove the root node');
        }
    };
    ;
    BinarySearchTree.prototype.size = function () {
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
    BinarySearchTree.prototype.height = function () {
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
    BinarySearchTree.prototype.numChildren = function () {
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
    BinarySearchTree.prototype.clone = function () {
        var newTree = new BinarySearchTree(this._sortFunction, this._data);
        newTree._leftChild = this._leftChild ? this._leftChild.clone() : undefined;
        newTree._rightChild = this._rightChild ? this._rightChild.clone() : undefined;
        return newTree;
    };
    BinarySearchTree.prototype._find = function (data, clone) {
        var parent = this._findParent(data);
        if (typeof parent === 'number') {
            return parent;
        }
        else {
            if (parent._leftChild._data === data) {
                return clone ? parent._leftChild.clone() : parent._leftChild;
            }
            else if (parent._rightChild._data === data) {
                return clone ? parent._rightChild.clone() : parent._rightChild;
            }
        }
    };
    BinarySearchTree.prototype._findParent = function (data) {
        if ((this._leftChild && this._leftChild._data === data) || (this._rightChild && this._rightChild._data === data)) {
            return this;
        }
        else if (this._rightChild && this._data < data) {
            return this._rightChild._findParent(data);
        }
        else if (this._leftChild && this._data > data) {
            return this._leftChild._findParent(data);
        }
        else {
            return -1;
        }
    };
    BinarySearchTree.prototype._rebuild = function (parent, loc) {
        if (parent[loc].numChildren() === 0) {
            delete parent[loc];
        }
        else if (parent[loc]._leftChild) {
            parent[loc] = parent[loc]._leftChild;
        }
        else if (parent[loc]._rightChild) {
            parent[loc] = parent[loc]._rightChild;
        }
        else if (parent[loc]._leftChild && parent[loc]._rightChild) {
            parent[loc].setNodeData(this._removeLargestRightLeaf(parent[loc]._leftChild));
        }
    };
    BinarySearchTree.prototype._removeLargestRightLeaf = function (tree) {
        return this.getNodeData();
    };
    return BinarySearchTree;
}());
exports.BinarySearchTree = BinarySearchTree;
