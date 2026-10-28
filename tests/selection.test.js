import test from 'node:test';import assert from 'node:assert/strict';import {nextSelection,selectionForMode} from '../src/selection.js';
test('desktop Shift right-click accumulates selections',()=>{const a=nextSelection({id:'a',selected:'body'});assert.deepEqual(nextSelection({id:'b',selected:a.focus,selectedKeys:a.keys,extend:true}).keys,['a','b'])});
test('mobile retains first selected element',()=>{const a=selectionForMode({selected:'a',selectedKeys:['a'],enabled:true});assert.deepEqual(nextSelection({id:'b',selected:a.focus,selectedKeys:a.keys,extend:true}).keys,['a','b'])});
