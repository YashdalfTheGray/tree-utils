import { ITree } from "./Tree";
export declare enum ChildLocation {
    LEFT = 0,
    RIGHT = 1,
}
export declare class BinaryTree<T> implements ITree<T> {
    private _data;
    private _leftChild;
    private _rightChild;
    constructor(data?: T);
    getNodeData(): T;
    setNodeData(data: T): void;
    addChild(node: T, index?: ChildLocation): void;
    getChildAt(loc: ChildLocation): BinaryTree<T>;
    removeChild(loc: ChildLocation): BinaryTree<T>;
    size(): number;
    height(): number;
    numChildren(): number;
    clone(): BinaryTree<T>;
}
