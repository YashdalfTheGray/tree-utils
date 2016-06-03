import * as test from "tape";

import {BinaryTree, CHILD_LOCATION} from "./BinaryTree";

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
            treeInstance.addChild(new BinaryTree<Object>({ test: 'foo' }));

            t.deepEquals(treeInstance.getChildAt(CHILD_LOCATION.LEFT).getNodeData(), { test: 'foo' });
            t.end();
        });

        t.test('adds a right child', (t: test.Test) => {
            treeInstance.addChild(new BinaryTree<Object>({ test: 'foo' }), CHILD_LOCATION.RIGHT);

            t.deepEquals(treeInstance.getChildAt(CHILD_LOCATION.RIGHT).getNodeData(), { test: 'foo' });
            t.end();
        });
    });

    t.test('getChildAt', (t: test.Test) => {
        const treeInstance = new BinaryTree<string>('root');

        t.test('gets a child at a valid location', (t: test.Test) => {
            treeInstance.addChild(new BinaryTree<string>('l1c1'));

            t.equals(treeInstance.getChildAt(CHILD_LOCATION.LEFT).getNodeData(), 'l1c1');
            t.end();
        });

        t.test('gracefully handles invalid child locations', (t: test.Test) => {
            t.equals(treeInstance.getChildAt(CHILD_LOCATION.RIGHT), undefined);
            t.end();
        });
    });

    t.test('removeChild', (t: test.Test) => {
        function setup() {
            const t = new BinaryTree<number>(0);

            t.addChild(new BinaryTree<number>(1));
            t.addChild(new BinaryTree<number>(2), CHILD_LOCATION.RIGHT);

            return t;
        }

        t.test('removes and returns the right child', (t: test.Test) => {
            const treeInstance = setup();
            const removedChild = treeInstance.removeChild(CHILD_LOCATION.RIGHT);

            t.assert(removedChild !== undefined, 'exists');
            t.assert(removedChild instanceof BinaryTree, 'is a binary tree');
            t.equal(removedChild.getNodeData(), 2);
            t.end();
        });

        t.test('removes and returns the left child', (t: test.Test) => {
            const treeInstance = setup();
            const removedChild = treeInstance.removeChild(CHILD_LOCATION.LEFT);

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

            treeInstance.addChild(new BinaryTree<number>(1));
            treeInstance.addChild(new BinaryTree<number>(2), CHILD_LOCATION.RIGHT);

            t.equal(treeInstance.size(), 3);
            t.end();
        });

        t.test('handles trees with asymmetric children', (t: test.Test) => {
            const treeInstance = new BinaryTree<number>(0);
            const firstChild = new BinaryTree<number>(1);

            firstChild.addChild(new BinaryTree<number>(3));
            firstChild.addChild(new BinaryTree<number>(4), CHILD_LOCATION.RIGHT);
            treeInstance.addChild(firstChild);
            treeInstance.addChild(new BinaryTree<number>(2), CHILD_LOCATION.RIGHT);

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
            treeInstance.addChild(new BinaryTree<number>(1));
            treeInstance.addChild(new BinaryTree<number>(2), CHILD_LOCATION.RIGHT);

            t.equal(treeInstance.height(), 2);
            t.end();
        });

        t.test('handles trees with asymmetric children', (t: test.Test) => {
            const treeInstance = new BinaryTree<number>(0);
            const firstChild = new BinaryTree<number>(1);
            const secondChild = new BinaryTree<number>(2);
            const fifthChild = new BinaryTree<number>(5);

            fifthChild.addChild(new BinaryTree<number>(7));

            firstChild.addChild(new BinaryTree<number>(3));
            firstChild.addChild(new BinaryTree<number>(4), CHILD_LOCATION.RIGHT);

            secondChild.addChild(fifthChild);
            secondChild.addChild(new BinaryTree<number>(6), CHILD_LOCATION.RIGHT);

            treeInstance.addChild(firstChild);
            treeInstance.addChild(secondChild, CHILD_LOCATION.RIGHT);

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
            treeInstance.addChild(new BinaryTree<number>(1));

            t.equal(treeInstance.numChildren(), 1);
            t.end();
        });

        t.test('handles a tree with multiple children', (t: test.Test) => {
            const treeInstance = new BinaryTree<number>(0);
            treeInstance.addChild(new BinaryTree<number>(1));
            treeInstance.addChild(new BinaryTree<number>(2), CHILD_LOCATION.RIGHT);

            t.equal(treeInstance.numChildren(), 2);
            t.end();
        });
    });
});
