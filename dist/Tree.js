"use strict";
var lodash_1 = require("lodash");
var Tree = (function () {
    /**
     * Creates a new Tree instance
     * @param  {T}      data the data to store at the root node.
     */
    function Tree(data) {
        this._data = data;
        this._children = [];
    }
    /**
     * Returns the data stored at the node
     * @return {T} the data
     */
    Tree.prototype.getNodeData = function () {
        return this._data;
    };
    /**
     * Set the data at the node
     * @param {T} data the data to store at the node
     */
    Tree.prototype.setNodeData = function (data) {
        this._data = data;
    };
    /**
     * Add a child tree to the node
     * @param {T} node the data to store at the new child location
     */
    Tree.prototype.addChild = function (node) {
        this._children.push(new Tree(node));
    };
    /**
     * Returns the child at the given location
     * @param  {number}  index the index of the child to get
     * @return {Tree<T>}       the child at the requested position
     */
    Tree.prototype.getChildAt = function (index) {
        return this._children[index];
    };
    /**
     * Removes the child at a given location and returns it
     * @param  {number}  index the index of the child to remove
     * @return {Tree<T>}       the removed child tree
     */
    Tree.prototype.removeChild = function (index) {
        return lodash_1.remove(this._children, function (value, i) {
            return i === index;
        })[0];
    };
    /**
     * Creates a new tree with the same data
     * @return {Tree<T>} a new tree that is a clone of this one
     */
    Tree.prototype.clone = function () {
        var newTree = new Tree(this.getNodeData());
        newTree._children = lodash_1.clone(this._children);
        return newTree;
    };
    /**
     * Returns the size, i.e. the number of nodes in the tree
     * @return {number} the size of the tree
     */
    Tree.prototype.size = function () {
        if (this._children.length > 0) {
            return this._children.reduce(function (acc, i) { return acc + i.size(); }, 1);
        }
        else {
            return 1;
        }
    };
    /**
     * Returns how many levels of nodes the tree has
     * @return {number} the height of the tree
     */
    Tree.prototype.height = function () {
        if (this._children.length > 0) {
            return 1 + lodash_1.max(this._children.map(function (c) { return c.height(); }));
        }
        else {
            return 1;
        }
    };
    /**
     * Returns the number of direct children the tree has
     * @return {number} the number of direct children
     */
    Tree.prototype.numChildren = function () {
        return this._children.length;
    };
    return Tree;
}());
exports.Tree = Tree;
