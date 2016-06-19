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
        const testTree = new BinarySearchTree<number>((a, b) => a - b, 0);

        t.equal(testTree.getNodeData(), 0);
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

    t.test('getChildAt', (t: test.Test): void => {
        const testTree = new BinarySearchTree<number>((a, b) => a - b, 5);
        testTree.addChild(3);
        testTree.addChild(7);

        const leftChild = testTree.getChildAt(ChildLocation.LEFT);
        const rightChild = testTree.getChildAt(ChildLocation.RIGHT);

        t.test('returns the requested child', (t: test.Test): void => {
            t.equal(leftChild.getNodeData(), 3);
            t.equal(rightChild.getNodeData(), 7);
            t.end();
        });

        t.test('children are clones, not references', (t: test.Test) => {
            t.same(testTree.getChildAt(ChildLocation.LEFT), leftChild);
            t.same(testTree.getChildAt(ChildLocation.RIGHT), rightChild);
            t.notEqual(testTree.getChildAt(ChildLocation.LEFT), leftChild);
            t.notEqual(testTree.getChildAt(ChildLocation.RIGHT), rightChild);
            t.end();
        });
    });

    t.test('find', (t: test.Test): void => {
        const testTree = new BinarySearchTree<number>((a, b) => a - b, 5);
        testTree.addChild(3);
        testTree.addChild(4);
        testTree.addChild(6);
        testTree.addChild(7);
        testTree.addChild(2);

        t.test('finds the correct data', (t: test.Test): void => {
            t.same(testTree.find(3),testTree.getChildAt(ChildLocation.LEFT));
            t.same(testTree.find(6),testTree.getChildAt(ChildLocation.RIGHT));
            t.end();
        });

        t.test('returns -1 for data not found', (t: test.Test): void => {
            t.equal(testTree.find(10), -1);
            t.end();
        });
    });

    t.test('removeChild', (t: test.Test): void => {
        const testTree = new BinarySearchTree<number>((a, b) => a - b, 5);
        testTree.addChild(3);
        testTree.addChild(4);
        testTree.addChild(6);
        testTree.addChild(7);
        testTree.addChild(2);
        testTree.addChild(9);
        testTree.addChild(1);
        testTree.addChild(10);

        t.test('removes a leaf', (t: test.Test): void => {
            t.equal(testTree.removeChild(2), 2);
            t.equal(testTree.find(2), -1);
            t.end();
        });

        t.test('errors when tried to remove the root node', (t: test.Test): void => {
            t.throws(() => testTree.removeChild(5));
            t.end();
        });
    });

    t.test('clone', (t: test.Test): void => {
        const testTree = new BinarySearchTree<number>((a, b) => a - b, 5);

        t.test('clones a single node tree', (t: test.Test): void => {
            const anotherTree = testTree.clone();

            t.equal(anotherTree.getNodeData(), testTree.getNodeData());
            t.end();
        });

        t.test('clones a tree with two children', (t: test.Test): void => {
            testTree.addChild(3);
            testTree.addChild(7);

            const anotherTree = testTree.clone();
            t.equal(anotherTree.getNodeData(), testTree.getNodeData());
            t.same(anotherTree.getChildAt(ChildLocation.LEFT), testTree.getChildAt(ChildLocation.LEFT));
            t.same(anotherTree.getChildAt(ChildLocation.RIGHT), testTree.getChildAt(ChildLocation.RIGHT));
            t.end();
        });
    });
});
