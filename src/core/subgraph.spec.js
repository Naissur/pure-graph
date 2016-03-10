import {test} from 'tap';

import {
  addNode
} from './nodes.js';

import {
  addEdge
} from './edges.js';

import {EMPTY_GRAPH} from './empty';
import is from 'is';
import { compose, difference } from 'ramda';

import {
  getNodesOfSubgraphTo
} from './subgraph';


test('subgraph getNodesOfSubgraphTo exists', t => {
  t.assert(is.fn(getNodesOfSubgraphTo ))
  t.end();
});

test('subgraph getNodesOfSubgraphTo gets the nodes of subgraph of a simple graph', t => {
  const testGraph = compose(
    addEdge('0-1', '0', '1'),
    addEdge('1-2', '1', '2'),
    addNode('2'),
    addNode('1'),
    addNode('0')
  )(EMPTY_GRAPH);

  const testNodeId = '1';
  const expected = ['1', '0'];

  const result = getNodesOfSubgraphTo (testNodeId, testGraph);

  t.deepEqual(difference(result, expected), [])
  t.end();
});

test('subgraph getNodesOfSubgraphTo gets the nodes of subgraph of a complex graph', t => {
  const testGraph = compose(
    addEdge('0-1', '0', '1'),
    addEdge('2-1', '2', '1'),
    addEdge('3-2', '3', '2'),
    addNode('3'),
    addNode('2'),
    addNode('1'),
    addNode('0')
  )(EMPTY_GRAPH);
  const expected = ['3', '2', '1', '0'];
  const testNodeId = '1';


  const result = getNodesOfSubgraphTo(testNodeId, testGraph);


  t.deepEqual(difference(result, expected), [])
  t.end();
});

test('subgraph getNodesOfSubgraphTo gets the nodes of subgraph of a cyclic graph', t => {
  const testGraph = compose(
    addEdge('0-1', '0', '1'),
    addEdge('1-0', '1', '0'),
    addNode('1'),
    addNode('0')
  )(EMPTY_GRAPH);
  const expected = ['1', '0'];
  const testNodeId = '0';


  const result = getNodesOfSubgraphTo(testNodeId, testGraph);


  t.deepEqual(difference(result, expected), [])
  t.end();
});
