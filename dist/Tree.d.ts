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
export declare class Tree<T> implements ITree<T> {
    private _data;
    private _children;
    /**
     * Creates a new Tree instance
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
    addChild(node: T): void;
    /**
     * Returns the child at the given location
     * @param  {number}  index the index of the child to get
     * @return {Tree<T>}       the child at the requested position
     */
    getChildAt(index: number): Tree<T>;
    /**
     * Removes the child at a given location and returns it
     * @param  {number}  index the index of the child to remove
     * @return {Tree<T>}       the removed child tree
     */
    removeChild(index: number): Tree<T>;
    /**
     * Creates a new tree with the same data
     * @return {Tree<T>} a new tree that is a clone of this one
     */
    clone(): Tree<T>;
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
}
