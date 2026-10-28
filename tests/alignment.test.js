import {test} from 'node:test';
import assert from 'node:assert/strict';
import {alignRect} from '../src/alignment.js';
const rect={left:20,top:30,width:80,height:40};
const parent={width:400,height:800};
test('smart alignment snaps element center to page center',()=>{
 const got=alignRect({rect,parent,dx:140,dy:0,settings:{autoAlign:true}});
 assert.equal(got.dx,140);assert.equal(got.guideX,200);
});
test('disabling all snapping preserves exact drag delta',()=>{
 const got=alignRect({rect,parent,dx:142,dy:9,settings:{autoAlign:false,snapElements:false,snapGrid:false}});
 assert.deepEqual([got.dx,got.dy,got.guideX,got.guideY],[142,9,null,null]);
});
test('sibling snapping aligns selected element to nearby sibling edge',()=>{
 const got=alignRect({rect,parent,dx:102,dy:0,peers:[{left:120,top:140,width:90,height:60}],settings:{autoAlign:false,snapElements:true},threshold:8});
 assert.equal(got.dx,100);assert.equal(got.guideX,120);
});
test('move constraints can keep an item within parent',()=>{
 const got=alignRect({rect,parent,dx:1000,dy:-1000,settings:{keepInBounds:true}});
 assert.equal(got.dx,300);assert.equal(got.dy,-30);
});
test('grid snapping can be toggled independently',()=>{
 const got=alignRect({rect,parent,dx:7,dy:7,settings:{snapGrid:true},threshold:8});
 assert.equal(got.dx,4);assert.equal(got.dy,10);
});
