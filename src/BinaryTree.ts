import {max} from "lodash";

import {ITree} from "./Tree";

export enum CHILD_LOCATION {
    LEFT = 0,
    RIGHT = 1
}

export class BinaryTree<T> implements ITree<T> {
    private _data: T;
    private _leftChild: BinaryTree<T>;
    private _rightChild: BinaryTree<T>;

    constructor(data?: T) {
        this._data = data;
    }

    public getNodeData(): T {
        return this._data;
    }

    public setNodeData(data: T): void {
        this._data = data;
    }

    public addChild(node: T, index?: CHILD_LOCATION) {
        index = index || CHILD_LOCATION.LEFT;
        if (index === CHILD_LOCATION.LEFT) {
            this._leftChild = new BinaryTree<T>(node);
        }
        else {
            this._rightChild = new BinaryTree<T>(node);
        }
    }

    public getChildAt(loc: CHILD_LOCATION): BinaryTree<T> {
        return loc === CHILD_LOCATION.LEFT ? this._leftChild : this._rightChild;
    }

    public removeChild(loc: CHILD_LOCATION): BinaryTree<T> {
        const removedChild = this.getChildAt(loc).clone();
        if (loc === CHILD_LOCATION.LEFT) {
            this._leftChild = undefined;
        }
        else {
            this._rightChild = undefined;
        }
        return removedChild;
    }

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

    public clone(): BinaryTree<T> {
        const newTree = new BinaryTree<T>();

        newTree._data = this._data;
        newTree._leftChild = this._leftChild;
        newTree._rightChild = this._rightChild;

        return newTree;
    }
}
