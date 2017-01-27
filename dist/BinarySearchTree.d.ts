import { ChildLocation } from "./BinaryTree";
export { ChildLocation } from "./BinaryTree";
export declare class BinarySearchTree<T> {
    private _sortFunction;
    private _data;
    private _leftChild;
    private _rightChild;
    constructor(sortFunction: (a: T, b: T) => number, data: T);
    getNodeData(): T;
    setNodeData(data: T): void;
    addChild(child: T): void;
    getChildAt(loc: ChildLocation): BinarySearchTree<T>;
    find(data: T): BinarySearchTree<T> | number;
    removeChild(childData: T): T;
    size(): number;
    height(): number;
    numChildren(): number;
    clone(): BinarySearchTree<T>;
    private _find(data, clone);
    private _findParent(data);
    private _rebuild(parent, loc);
    private _removeLargestRightLeaf(tree);
}
