import {remove, max} from "lodash";

export interface ITree<T> {
    getNodeData(): T;
    setNodeData(data: T): void;
    size(): number;
    height(): number;
}

export class Tree<T> implements ITree<T> {
    private _data: T;
    private _children: Tree<T>[];

    constructor(data?: T) {
        this._data = data;
        this._children = [];
    }

    public getNodeData(): T {
        return this._data;
    }

    public setNodeData(data: T): void {
        this._data = data;
    }

    public addChild(node: Tree<T>): void {
        this._children.push(node);
    }

    public getChildAt(index: number): Tree<T> {
        return this._children[index];
    }

    public removeChild(index: number): Tree<T> {
        return remove(this._children, (value, i) => {
            return i === index;
        })[0];
    }

    public size(): number {
        if (this._children.length > 0) {
            return this._children.reduce((acc, i) => { return acc + i.size(); }, 1);
        }
        else {
            return 1;
        }
    }

    public height(): number {
        if (this._children.length > 0) {
            return 1 + max(this._children.map(c => { return c.height(); }));
        }
        else {
            return 1;
        }
    }
}
