import {ITree} from "./Tree";
import {CHILD_LOCATION} from "./BinaryTree";

export {CHILD_LOCATION} from "./BinaryTree";

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
        var selectedChild: BinarySearchTree<T>;

        console.log(this._sortFunction(child, this._data) > 0);

        if (this._sortFunction(child, this._data) > 0) {
            selectedChild = this._rightChild;
        }
        else if (this._sortFunction(child, this._data) < 0) {
            selectedChild = this._leftChild;
        }

        if (selectedChild) {
            selectedChild.addChild(child);
        }
        else {
            console.log(selectedChild);
            selectedChild = new BinarySearchTree<T>(this._sortFunction, child);
            console.log(selectedChild);
            console.log(this._leftChild);
            console.log(this._rightChild);
        }
    }

    public getChildAt(loc: CHILD_LOCATION): BinarySearchTree<T> {
        return loc === CHILD_LOCATION.LEFT ? this._leftChild : this._rightChild;
    }
}
