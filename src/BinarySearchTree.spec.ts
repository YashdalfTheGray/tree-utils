import * as test from "tape";

import {BinarySearchTree, ChildLocation} from "./BinarySearchTree";

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

    t.test('addChild', (t: test.Test): void => {
        const testTree = new BinarySearchTree<number>((a, b) => a - b, 5);

        t.test('adds a child to the left when the test result is < 0', (t: test.Test): void => {
            testTree.addChild(3);

            t.equal(testTree.getChildAt(ChildLocation.LEFT).getNodeData(), 3);
            t.end();
        });

        t.test('adds a child to the right when the test result is > 0', (t: test.Test): void => {
            testTree.addChild(7);

            t.equal(testTree.getChildAt(ChildLocation.RIGHT).getNodeData(), 7);
            t.end();
        });

        t.test('does not add a child when equal to the node data', (t: test.Test): void => {
            testTree.addChild(5);

            t.notEqual(testTree.getChildAt(ChildLocation.LEFT).getNodeData(), 5);
            t.notEqual(testTree.getChildAt(ChildLocation.RIGHT).getNodeData(), 5);
            t.end();
        });

        t.test('appends to child when a child exists', (t: test.Test): void => {
            testTree.addChild(4);

            t.equal(testTree.getChildAt(ChildLocation.LEFT).getChildAt(ChildLocation.RIGHT).getNodeData(), 4);
            t.end();
        });
    });
});
