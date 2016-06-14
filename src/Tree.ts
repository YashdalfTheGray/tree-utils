import {remove, max, clone} from "lodash";

export interface ITree<T> {
    getNodeData(): T;
    setNodeData(data: T): void;
    addChild(node: T, index?: number): void;
    getChildAt(index: number): ITree<T>;
    removeChild(index: number): ITree<T>;
    clone(): ITree<T>;
    size(): number;
    height(): number;
    numChildren(): number;
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

    public addChild(node: T): void {
        this._children.push(new Tree<T>(node));
    }

    public getChildAt(index: number): Tree<T> {
        return this._children[index];
    }

    public removeChild(index: number): Tree<T> {
        return remove(this._children, (value, i) => {
            return i === index;
        })[0];
    }

    public clone(): Tree<T> {
        const newTree = new Tree<T>(this.getNodeData());
        newTree._children = clone(this._children);

        return newTree;
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

    public numChildren(): number {
        return this._children.length;
    }
}
