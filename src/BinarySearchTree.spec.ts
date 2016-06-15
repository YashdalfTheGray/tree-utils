import * as test from "tape";

import {BinarySearchTree, CHILD_LOCATION} from "./BinarySearchTree";

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

            t.equal(testTree.getChildAt(CHILD_LOCATION.LEFT), 3);
            t.end();
        });

        t.test('adds a child to the right when the test result is > 0', (t: test.Test): void => {
            testTree.addChild(7);

            t.equal(testTree.getChildAt(CHILD_LOCATION.RIGHT), 7);
            t.end();
        });

        t.test('does not add a child when equal to the node data', (t: test.Test): void => {
            testTree.addChild(5);

            t.notEqual(testTree.getChildAt(CHILD_LOCATION.LEFT), 5);
            t.notEqual(testTree.getChildAt(CHILD_LOCATION.RIGHT), 5);
            t.end();
        });
    });
});
