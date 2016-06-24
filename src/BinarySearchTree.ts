import {max} from "lodash";
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
            const parent = <BinarySearchTree<T>>(this._findParent(childData));
            let result;

            if (parent._leftChild && parent._leftChild._data === childData) {
                result = parent._leftChild._data;
                this._rebuild(parent, '_leftChild');
            }
            else if (parent._rightChild && parent._rightChild._data === childData) {
                result = parent._rightChild._data;
                this._rebuild(parent, '_rightChild');
            }

            return result;
        }
        else {
            throw new SyntaxError('Attempted to remove the root node');
        }
    };

    public size(): number {
        if (!this._leftChild && !this._rightChild) {
            return 1;
        }
        else if (!this._leftChild) {
            return 1 + this._rightChild.size();
        }
        else if (!this._rightChild) {
            return 1 + this._leftChild.size();
        }
        else {
            return 1 + this._leftChild.size() + this._rightChild.size();
        }
    }

    public height(): number {
        if (!this._leftChild && !this._rightChild) {
            return 1;
        }
        else if (!this._leftChild) {
            return 1 + this._rightChild.height();
        }
        else if (!this._rightChild) {
            return 1 + this._leftChild.height();
        }
        else {
            return 1 + max([this._leftChild.height(), this._rightChild.height()]);
        }
    }

    public numChildren(): number {
        if (this._leftChild && this._rightChild) {
            return 2;
        }
        else if (this._leftChild || this._rightChild) {
            return 1;
        }
        else {
            return 0;
        }
    }

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

    private _rebuild(parent: BinarySearchTree<T>, loc: string): void {
        if (parent[loc].numChildren() === 0) {
            delete parent[loc];
        }
        else if (parent[loc]._leftChild) {
            parent[loc] = parent[loc]._leftChild;
        }
        else if (parent[loc]._rightChild) {
            parent[loc] = parent[loc]._rightChild;
        }
    }
}
