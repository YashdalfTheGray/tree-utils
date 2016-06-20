import {max} from "lodash";

import {ITree} from "./Tree";

export enum ChildLocation {
    LEFT = 0,
    RIGHT = 1
}

export class BinaryTree<T> implements ITree<T> {
    private _data: T;
    private _leftChild: BinaryTree<T>;
    private _rightChild: BinaryTree<T>;

    /**
     * Creates a new BinaryTree instance
     * @param  {T}      data the data to store at the root node.
     */
    constructor(data?: T) {
        this._data = data;
    }

    /**
     * Returns the data stored at the node
     * @return {T} the data
     */
    public getNodeData(): T {
        return this._data;
    }

    /**
     * Set the data at the node
     * @param {T} data the data to store at the node
     */
    public setNodeData(data: T): void {
        this._data = data;
    }

    /**
     * Add a child tree to the node
     * @param {T} node the data to store at the new child location
     */
    public addChild(node: T, index?: ChildLocation) {
        index = index || ChildLocation.LEFT;
        if (index === ChildLocation.LEFT) {
            this._leftChild = new BinaryTree<T>(node);
        }
        else {
            this._rightChild = new BinaryTree<T>(node);
        }
    }

    /**
     * Returns the child at the given location
     * @param  {number}        index the index of the child to get
     * @return {BinaryTree<T>}       the child at the requested position
     */
    public getChildAt(loc: ChildLocation): BinaryTree<T> {
        return loc === ChildLocation.LEFT ? this._leftChild : this._rightChild;
    }

    /**
     * Removes the child at a given location and returns it
     * @param  {number}        index the index of the child to remove
     * @return {BinaryTree<T>}       the removed child tree
     */
    public removeChild(loc: ChildLocation): BinaryTree<T> {
        const removedChild = this.getChildAt(loc).clone();
        if (loc === ChildLocation.LEFT) {
            this._leftChild = undefined;
        }
        else {
            this._rightChild = undefined;
        }
        return removedChild;
    }

    /**
     * Returns the size, i.e. the number of nodes in the tree
     * @return {number} the size of the tree
     */
    public size(): number {
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
    }

    /**
     * Returns how many levels of nodes the tree has
     * @return {number} the height of the tree
     */
    public height(): number {
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
            return 1 + max([this._leftChild.height(), this._rightChild.height()]);
        }
    }

    /**
     * Returns the number of direct children the tree has
     * @return {number} the number of direct children
     */
    public numChildren(): number {
        if (this._leftChild && this._rightChild) {
            return 2;
        }
        else if (this._leftChild || this._rightChild) {
            return 1;
        }
        else {
            return 0;
        }
    }

    /**
     * Creates a new tree with the same data
     * @return {BinaryTree<T>} a new tree that is a clone of this one
     */
    public clone(): BinaryTree<T> {
        const newTree = new BinaryTree<T>();

        newTree._data = this._data;
        newTree._leftChild = this._leftChild;
        newTree._rightChild = this._rightChild;

        return newTree;
    }
}
