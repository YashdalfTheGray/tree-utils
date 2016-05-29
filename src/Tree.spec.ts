import * as test from "tape";

import {Tree} from "./Tree";

test('Tree', (t: test.Test) => {

    t.test('creates a new Tree instance', (t: test.Test) => {
        const treeInstance = new Tree<string>();

        t.assert(treeInstance !== undefined, 'instance exists');
        t.end();
    });

    t.test('creates a new Tree instance with the passed in data', (t: test.Test) => {
        const treeInstance = new Tree<string>('test');

        t.assert(treeInstance !== undefined, 'instance exists');
        t.equal(treeInstance.getNodeData(), 'test');
        t.end();
    });

    t.test('getNodeData', (t: test.Test) => {
        const treeInstance = new Tree<number>(10);

        t.test('retrieves the current value of node data', (t: test.Test) => {
            t.equal(treeInstance.getNodeData(), 10);
            t.end();
        });
    });

    t.test('setNodeData', (t: test.Test) => {
        const treeInstance = new Tree<number>();

        t.test('sets the node data', (t: test.Test) => {
            treeInstance.setNodeData(1);

            t.equal(treeInstance.getNodeData(), 1);
            t.end();
        });
    });

    t.test('addChild', (t: test.Test) => {
        const treeInstance = new Tree<Object>();

        t.test('adds a child to the children list', (t: test.Test) => {
            treeInstance.addChild(new Tree<Object>({ test: 'foo' }));

            t.deepEquals(treeInstance.getChildAt(0).getNodeData(), { test: 'foo' });
            t.end();
        });
    });

    t.test('getChildAt', (t: test.Test) => {
        const treeInstance = new Tree<string>('root');

        t.test('gets a child at a valid location', (t: test.Test) => {
            treeInstance.addChild(new Tree<string>('l1c1'));

            t.equals(treeInstance.getChildAt(0).getNodeData(), 'l1c1');
            t.end();
        });

        t.test('gracefully handles invalid indices', (t: test.Test) => {
            t.equals(treeInstance.getChildAt(1), undefined);
            t.end();
        });
    });

    t.test('removeChild', (t: test.Test) => {
        function setup() {
            const t = new Tree<number>(0);

            t.addChild(new Tree<number>(1));
            t.addChild(new Tree<number>(2));
            t.addChild(new Tree<number>(3));

            return t;
        }

        t.test('removes and returns child at given index', (t: test.Test) => {
            const treeInstance = setup();
            const removedChild = treeInstance.removeChild(1);

            t.assert(removedChild !== undefined, 'exists');
            t.assert(removedChild instanceof Tree, 'is a tree');
            t.equal(removedChild.getNodeData(), 2);
            t.end();
        });

        t.test('handles invalid indices gracefully', (t: test.Test) => {
            const treeInstance = setup();
            const removedChild = treeInstance.removeChild(45);

            t.equal(removedChild, undefined);
            t.end();
        });
    });
});
