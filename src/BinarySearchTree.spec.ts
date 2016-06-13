import * as test from "tape";

import {BinarySearchTree} from "./BinarySearchTree";

test('BinarySearchTree', (t: test.Test): void => {

    t.test('creates a new Tree instance with the passed in data', (t: test.Test) => {
        const treeInstance = new BinarySearchTree<string>((a, b) => a.length - b.length, 'test');

        t.assert(treeInstance !== undefined, 'instance exists');
        t.equal(treeInstance.getNodeData(), 'test');
        t.end();
    });

    t.test('getNodeData', (t: test.Test): void => {
        const testTree = new BinarySearchTree<number>((a, b) => a - b, 1);

        t.equal(testTree.getNodeData(), 1);
        t.end();
    });

    t.test('setNodeData', (t: test.Test): void => {
        const testTree = new BinarySearchTree<number>((a, b) => a - b);

        t.equal(testTree.getNodeData(), undefined);
        testTree.setNodeData(2);
        t.equal(testTree.getNodeData(), 2);
        t.end();
    });
});
