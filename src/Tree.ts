import {remove, max, clone} from "lodash";

export interface ITree<T> {
    getNodeData(): T;
    setNodeData(data: T): void;
    addChild(node: T, index?: number): void;
    getChildAt(index: number): ITree<T>;
    removeChild(index: number): ITree<T>;
    clone(): ITree<T>;
    size(): number;
    height(): number;
    numChildren(): number;
}

export class Tree<T> implements ITree<T> {
    private _data: T;
    private _children: Tree<T>[];

    /**
     * Creates a new Tree instance
     * @param  {T}      data the data to store at the root node.
     */
    constructor(data?: T) {
        this._data = data;
        this._children = [];
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
    public addChild(node: T): void {
        this._children.push(new Tree<T>(node));
    }

    /**
     * Returns the child at the given location
     * @param  {number}  index the index of the child to get
     * @return {Tree<T>}       the child at the requested position
     */
    public getChildAt(index: number): Tree<T> {
        return this._children[index];
    }

    /**
     * Removes the child at a given location and returns it
     * @param  {number}  index the index of the child to remove
     * @return {Tree<T>}       the removed child tree
     */
    public removeChild(index: number): Tree<T> {
        return remove(this._children, (value, i) => {
            return i === index;
        })[0];
    }

    /**
     * Creates a new tree with the same data
     * @return {Tree<T>} a new tree that is a clone of this one
     */
    public clone(): Tree<T> {
        const newTree = new Tree<T>(this.getNodeData());
        newTree._children = clone(this._children);

        return newTree;
    }

    /**
     * Returns the size, i.e. the number of nodes in the tree
     * @return {number} the size of the tree
     */
    public size(): number {
        if (this._children.length > 0) {
            return this._children.reduce((acc, i) => { return acc + i.size(); }, 1);
        }
        else {
            return 1;
        }
    }

    /**
     * Returns how many levels of nodes the tree has
     * @return {number} the height of the tree
     */
    public height(): number {
        if (this._children.length > 0) {
            return 1 + max(this._children.map(c => { return c.height(); }));
        }
        else {
            return 1;
        }
    }

    /**
     * Returns the number of direct children the tree has
     * @return {number} the number of direct children
     */
    public numChildren(): number {
        return this._children.length;
    }
}
