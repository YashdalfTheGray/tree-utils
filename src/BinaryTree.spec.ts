import * as test from "tape";

import {BinaryTree, ChildLocation} from "./BinaryTree";

test('Binary Tree', (t: test.Test) => {

    t.test('creates a new Tree instance', (t: test.Test) => {
        const treeInstance = new BinaryTree<string>();

        t.assert(treeInstance !== undefined, 'instance exists');
        t.end();
    });

    t.test('creates a new Tree instance with the passed in data', (t: test.Test) => {
        const treeInstance = new BinaryTree<string>('test');

        t.assert(treeInstance !== undefined, 'instance exists');
        t.equal(treeInstance.getNodeData(), 'test');
        t.end();
    });

    t.test('getNodeData', (t: test.Test) => {
        const treeInstance = new BinaryTree<number>(10);

        t.test('retrieves the current value of node data', (t: test.Test) => {
            t.equal(treeInstance.getNodeData(), 10);
            t.end();
        });
    });

    t.test('setNodeData', (t: test.Test) => {
        const treeInstance = new BinaryTree<number>();

        t.test('sets the node data', (t: test.Test) => {
            treeInstance.setNodeData(1);

            t.equal(treeInstance.getNodeData(), 1);
            t.end();
        });
    });

    t.test('addChild', (t: test.Test) => {
        const treeInstance = new BinaryTree<Object>();

        t.test('adds a left child', (t: test.Test) => {
            treeInstance.addChild({ test: 'foo' });

            t.deepEquals(treeInstance.getChildAt(ChildLocation.LEFT).getNodeData(), { test: 'foo' });
            t.end();
        });

        t.test('adds a right child', (t: test.Test) => {
            treeInstance.addChild({ test: 'foo' }, ChildLocation.RIGHT);

            t.deepEquals(treeInstance.getChildAt(ChildLocation.RIGHT).getNodeData(), { test: 'foo' });
            t.end();
        });
    });

    t.test('getChildAt', (t: test.Test) => {
        const treeInstance = new BinaryTree<string>('root');

        t.test('gets a child at a valid location', (t: test.Test) => {
            treeInstance.addChild('l1c1');

            t.equals(treeInstance.getChildAt(ChildLocation.LEFT).getNodeData(), 'l1c1');
            t.end();
        });

        t.test('gracefully handles invalid child locations', (t: test.Test) => {
            t.equals(treeInstance.getChildAt(ChildLocation.RIGHT), undefined);
            t.end();
        });
    });

    t.test('removeChild', (t: test.Test) => {
        function setup() {
            const t = new BinaryTree<number>(0);

            t.addChild(1);
            t.addChild(2, ChildLocation.RIGHT);

            return t;
        }

        t.test('removes and returns the right child', (t: test.Test) => {
            const treeInstance = setup();
            const removedChild = treeInstance.removeChild(ChildLocation.RIGHT);

            t.assert(removedChild !== undefined, 'exists');
            t.assert(removedChild instanceof BinaryTree, 'is a binary tree');
            t.equal(removedChild.getNodeData(), 2);
            t.end();
        });

        t.test('removes and returns the left child', (t: test.Test) => {
            const treeInstance = setup();
            const removedChild = treeInstance.removeChild(ChildLocation.LEFT);

            t.assert(removedChild !== undefined, 'exists');
            t.assert(removedChild instanceof BinaryTree, 'is a binary tree');
            t.equal(removedChild.getNodeData(), 1);
            t.end();
        });
    });

    t.test('size', (t: test.Test) => {
        t.test('returns 1 for a tree with one node', (t: test.Test) => {
            const treeInstance = new BinaryTree<number>(0);

            t.equal(treeInstance.size(), 1);
            t.end();
        });

        t.test('returns 3 for a tree with one node and two children', (t: test.Test) => {
            const treeInstance = new BinaryTree<number>(0);

            treeInstance.addChild(1);
            treeInstance.addChild(2, ChildLocation.RIGHT);

            t.equal(treeInstance.size(), 3);
            t.end();
        });

        t.test('handles trees with asymmetric children', (t: test.Test) => {
            const treeInstance = new BinaryTree<number>(0);
            treeInstance.addChild(1);
            treeInstance.addChild(2, ChildLocation.RIGHT);

            const firstChild = treeInstance.getChildAt(ChildLocation.LEFT);
            firstChild.addChild(3);
            firstChild.addChild(4, ChildLocation.RIGHT);

            t.equal(treeInstance.size(), 5);
            t.end();
        });
    });

    t.test('height', (t: test.Test) => {
        t.test('handles a tree with a single node correctly', (t: test.Test) => {
            const treeInstance = new BinaryTree<number>(0);

            t.equal(treeInstance.height(), 1);
            t.end();
        });

        t.test('handles a tree with multiple children', (t: test.Test) => {
            const treeInstance = new BinaryTree<number>(0);
            treeInstance.addChild(1);
            treeInstance.addChild(2, ChildLocation.RIGHT);

            t.equal(treeInstance.height(), 2);
            t.end();
        });

        t.test('handles trees with asymmetric children', (t: test.Test) => {
            const treeInstance = new BinaryTree<number>(0);
            treeInstance.addChild(1);
            treeInstance.addChild(2, ChildLocation.RIGHT);

            const firstChild = treeInstance.getChildAt(ChildLocation.LEFT);
            firstChild.addChild(3);
            firstChild.addChild(4, ChildLocation.RIGHT);

            const secondChild = treeInstance.getChildAt(ChildLocation.RIGHT);
            secondChild.addChild(5);
            secondChild.addChild(6, ChildLocation.RIGHT);

            const fifthChild = secondChild.getChildAt(ChildLocation.LEFT);
            fifthChild.addChild(7);

            t.equal(treeInstance.height(), 4);
            t.end();
        });
    });

    t.test('height', (t: test.Test) => {
        t.test('handles a tree with a single node correctly', (t: test.Test) => {
            const treeInstance = new BinaryTree<number>(0);

            t.equal(treeInstance.numChildren(), 0);
            t.end();
        });

        t.test('handles a tree with one child correctly', (t: test.Test) => {
            const treeInstance = new BinaryTree<number>(0);
            treeInstance.addChild(1);

            t.equal(treeInstance.numChildren(), 1);
            t.end();
        });

        t.test('handles a tree with multiple children', (t: test.Test) => {
            const treeInstance = new BinaryTree<number>(0);
            treeInstance.addChild(1);
            treeInstance.addChild(2, ChildLocation.RIGHT);

            t.equal(treeInstance.numChildren(), 2);
            t.end();
        });
    });
});
