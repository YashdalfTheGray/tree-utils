import { ITree } from "./Tree";
export declare enum CHILD_LOCATION {
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
    addChild(node: BinaryTree<T>, index?: CHILD_LOCATION): void;
    getChildAt(loc: CHILD_LOCATION): BinaryTree<T>;
    removeChild(loc: CHILD_LOCATION): BinaryTree<T>;
    size(): number;
    height(): number;
    numChildren(): number;
    private _clone();
}
