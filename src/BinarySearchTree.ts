import {ITree} from "./Tree";
import {ChildLocation} from "./BinaryTree";

export {ChildLocation} from "./BinaryTree";

export class BinarySearchTree<T> {
    private _sortFunction: (a: T, b: T) => number;
    private _data: T;
    private _leftChild: BinarySearchTree<T>;
    private _rightChild: BinarySearchTree<T>;

    constructor(sortFunction: (a: T, b: T) => number, data: T) {
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
        if (loc === ChildLocation.LEFT) {
            return this._leftChild.clone();
        }
        else if (loc === ChildLocation.RIGHT) {
            return this._rightChild.clone();
        }
    }

    public find(data: T): BinarySearchTree<T>|number {
        return this._find(data, true);
    }

    public removeChild(childData: T): T {
        if (childData !== this._data) {
            return childData;
        }
        else {
            throw new SyntaxError('Attempted to remove the root node');
        }
    };

    public clone(): BinarySearchTree<T> {
        const newTree = new BinarySearchTree(this._sortFunction, this._data);

        newTree._leftChild = this._leftChild ? this._leftChild.clone() : undefined;
        newTree._rightChild = this._rightChild ? this._rightChild.clone() : undefined;

        return newTree;
    }

    private _find(data: T, clone: boolean): BinarySearchTree<T>|number {
        const parent = this._findParent(data);

        if (typeof parent === 'number') {
            return parent;
        }
        else {
            if (parent._leftChild._data === data) {
                return clone ? parent._leftChild.clone() : parent._leftChild;
            }
            else if (parent._rightChild._data === data) {
                return clone ? parent._rightChild.clone() : parent._rightChild;
            }
        }
    }

    private _findParent(data: T): BinarySearchTree<T>|number {
        if ((this._leftChild && this._leftChild._data === data) || (this._rightChild && this._rightChild._data === data)) {
            return this;
        }
        else if (this._rightChild && this._data < data) {
            return this._rightChild._findParent(data);
        }
        else if (this._leftChild && this._data > data) {
            return this._leftChild._findParent(data);
        }
        else {
            return -1;
        }
    }
}
