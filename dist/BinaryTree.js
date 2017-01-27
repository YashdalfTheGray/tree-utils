"use strict";
var lodash_1 = require("lodash");
var ChildLocation;
(function (ChildLocation) {
    ChildLocation[ChildLocation["LEFT"] = 0] = "LEFT";
    ChildLocation[ChildLocation["RIGHT"] = 1] = "RIGHT";
})(ChildLocation = exports.ChildLocation || (exports.ChildLocation = {}));
var BinaryTree = (function () {
    /**
     * Creates a new BinaryTree instance
     * @param  {T}      data the data to store at the root node.
     */
    function BinaryTree(data) {
        this._data = data;
    }
    /**
     * Returns the data stored at the node
     * @return {T} the data
     */
    BinaryTree.prototype.getNodeData = function () {
        return this._data;
    };
    /**
     * Set the data at the node
     * @param {T} data the data to store at the node
     */
    BinaryTree.prototype.setNodeData = function (data) {
        this._data = data;
    };
    /**
     * Add a child tree to the node
     * @param {T} node the data to store at the new child location
     */
    BinaryTree.prototype.addChild = function (node, index) {
        index = index || ChildLocation.LEFT;
        if (index === ChildLocation.LEFT) {
            this._leftChild = new BinaryTree(node);
        }
        else {
            this._rightChild = new BinaryTree(node);
        }
    };
    /**
     * Returns the child at the given location
     * @param  {number}        index the index of the child to get
     * @return {BinaryTree<T>}       the child at the requested position
     */
    BinaryTree.prototype.getChildAt = function (loc) {
        return loc === ChildLocation.LEFT ? this._leftChild : this._rightChild;
    };
    /**
     * Removes the child at a given location and returns it
     * @param  {number}        index the index of the child to remove
     * @return {BinaryTree<T>}       the removed child tree
     */
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
    /**
     * Returns the size, i.e. the number of nodes in the tree
     * @return {number} the size of the tree
     */
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
    /**
     * Returns how many levels of nodes the tree has
     * @return {number} the height of the tree
     */
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
    /**
     * Returns the number of direct children the tree has
     * @return {number} the number of direct children
     */
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
    /**
     * Creates a new tree with the same data
     * @return {BinaryTree<T>} a new tree that is a clone of this one
     */
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
