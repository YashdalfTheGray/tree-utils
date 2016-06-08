import * as test from "tape";

import {BinarySearchTree} from "./BinarySearchTree";

test('BinarySearchTree', (t: test.Test): void => {
    t.test('getNodeData', (t: test.Test): void => {
        const testTree = new BinarySearchTree<number>((a, b) => {
            return a - b;
        }, 1);

        t.equal(testTree.getNodeData(), 1);
        t.end();
    });
});
