import {ITree} from "./Tree";

export class BinarySearchTree<T> {
    private _sortFunction: Function;
    private _data: T;
    private _tree: BinarySearchTree<T>;

    constructor(sortFunction: (a: T, b: T) => number, data?: T) {
        this._sortFunction = sortFunction;
        this._data = data;
    }

    public getNodeData(): T {
        return this._data;
    }
}
