import {ITree} from "./Tree";
import {ChildLocation} from "./BinaryTree";

export {ChildLocation} from "./BinaryTree";

export class BinarySearchTree<T> {
    private _sortFunction: (a: T, b: T) => number;
    private _data: T;
    private _leftChild: BinarySearchTree<T>;
    private _rightChild: BinarySearchTree<T>;

    constructor(sortFunction: (a: T, b: T) => number, data?: T) {
        this._sortFunction = sortFunction;
        this._data = data;
    }

    public getNodeData(): T {
        return this._data;
    }

    public setNodeData(data: T): void {
        this._data = data;
    }

    public addChild(child: T): void {
        var selectedChild: string;

        if (this._sortFunction(child, this._data) > 0) {
            selectedChild = '_rightChild';
        }
        else if (this._sortFunction(child, this._data) < 0) {
            selectedChild = '_leftChild';
        }

        if (this[selectedChild]) {
            this[selectedChild].addChild(child);
        }
        else {
            this[selectedChild] = new BinarySearchTree<T>(this._sortFunction, child);
        }
    }

    public getChildAt(loc: ChildLocation): BinarySearchTree<T> {
        return loc === ChildLocation.LEFT ? this._leftChild.clone() : this._rightChild.clone();
    }

    public clone(): BinarySearchTree<T> {
        const newTree = new BinarySearchTree(this._sortFunction, this._data);

        newTree._leftChild = this._leftChild;
        newTree._rightChild = this._rightChild;

        return newTree;
    }
}
