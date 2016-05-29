export interface ITree<T> {
    getNodeData(): T;
    setNodeData(data: T): void;
    addChild(node: ITree<T>): void;
    getChildAt(index: number): ITree<T>;
    removeChild(index: number): ITree<T>;
    size(): number;
    height(): number;
}
export declare class Tree<T> implements ITree<T> {
    private _data;
    private _children;
    constructor(data?: T);
    getNodeData(): T;
    setNodeData(data: T): void;
    addChild(node: Tree<T>): void;
    getChildAt(index: number): Tree<T>;
    removeChild(index: number): Tree<T>;
    size(): number;
    height(): number;
}
