import test from 'node:test';
import assert from 'node:assert/strict';
import {nextSelection,selectionForMode} from '../src/selection.js';

test('first normal click selects a single element',()=>{
 assert.deepEqual(nextSelection({id:'a',selected:'body'}),{keys:['a'],focus:'a'});
});
test('desktop Shift + right click extends selection while preserving the first element',()=>{
 const first=nextSelection({id:'a',selected:'body'});
 const second=nextSelection({id:'b',selected:first.focus,selectedKeys:first.keys,extend:true});
 const third=nextSelection({id:'c',selected:second.focus,selectedKeys:second.keys,extend:true});
 assert.deepEqual(third.keys,['a','b','c']);
 assert.equal(third.focus,'c');
});
test('multiple-clicking a selected element toggles it off, without dropping other selections',()=>{
 assert.deepEqual(nextSelection({id:'b',selected:'c',selectedKeys:['a','b','c'],extend:true}),{keys:['a','c'],focus:'c'});
 assert.deepEqual(nextSelection({id:'a',selected:'a',selectedKeys:['a'],extend:true}),{keys:[],focus:'body'});
});
test('normal click exits multi-range selection for just the clicked element',()=>{
 assert.deepEqual(nextSelection({id:'d',selected:'c',selectedKeys:['a','b','c']}),{keys:['d'],focus:'d'});
});
test('mobile enters multi-select retaining initial tapped element, and exits retaining focus',()=>{
 const activated=selectionForMode({selected:'a',selectedKeys:['a'],enabled:true});
 const b=nextSelection({id:'b',selected:activated.focus,selectedKeys:activated.keys,extend:true});
 const done=selectionForMode({selected:b.focus,selectedKeys:b.keys,enabled:false});
 assert.deepEqual(b.keys,['a','b']);assert.deepEqual(done,{keys:['b'],focus:'b'});
});
test('body selection clears range, multi-select starting from body starts empty',()=>{
 assert.deepEqual(nextSelection({id:'body',selected:'a',selectedKeys:['a'],extend:false}),{keys:[],focus:'body'});
 assert.deepEqual(selectionForMode({selected:'body',selectedKeys:[],enabled:true}),{keys:[],focus:'body'});
});
