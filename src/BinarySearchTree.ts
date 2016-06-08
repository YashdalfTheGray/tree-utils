import {ITree} from "./Tree";

export class BinarySearchTree<T> implements ITree<T> {
    private _sortFunction: Function;
    private _data: T;

    constructor(sortFunction: Function, data?: T) {
        this._sortFunction = sortFunction;
        this._data = data;
    }
}
