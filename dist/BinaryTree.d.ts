import { ITree } from "./Tree";
export declare enum ChildLocation {
    LEFT = 0,
    RIGHT = 1,
}
export declare class BinaryTree<T> implements ITree<T> {
    private _data;
    private _leftChild;
    private _rightChild;
    /**
     * Creates a new BinaryTree instance
     * @param  {T}      data the data to store at the root node.
     */
    constructor(data?: T);
    /**
     * Returns the data stored at the node
     * @return {T} the data
     */
    getNodeData(): T;
    /**
     * Set the data at the node
     * @param {T} data the data to store at the node
     */
    setNodeData(data: T): void;
    /**
     * Add a child tree to the node
     * @param {T} node the data to store at the new child location
     */
    addChild(node: T, index?: ChildLocation): void;
    /**
     * Returns the child at the given location
     * @param  {number}        index the index of the child to get
     * @return {BinaryTree<T>}       the child at the requested position
     */
    getChildAt(loc: ChildLocation): BinaryTree<T>;
    /**
     * Removes the child at a given location and returns it
     * @param  {number}        index the index of the child to remove
     * @return {BinaryTree<T>}       the removed child tree
     */
    removeChild(loc: ChildLocation): BinaryTree<T>;
    /**
     * Returns the size, i.e. the number of nodes in the tree
     * @return {number} the size of the tree
     */
    size(): number;
    /**
     * Returns how many levels of nodes the tree has
     * @return {number} the height of the tree
     */
    height(): number;
    /**
     * Returns the number of direct children the tree has
     * @return {number} the number of direct children
     */
    numChildren(): number;
    /**
     * Creates a new tree with the same data
     * @return {BinaryTree<T>} a new tree that is a clone of this one
     */
    clone(): BinaryTree<T>;
}
