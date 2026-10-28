import test from 'node:test';
import assert from 'node:assert/strict';
import {resizeFromHandle} from '../src/viewport.js';
import {createBlank,addItem,resizeElement,generatedCSS,cssEffective} from '../src/model.js';

test('bottom right grows width and height',()=>{
 assert.deepEqual(resizeFromHandle({width:100,height:60,dx:35,dy:25,handle:'se'}),{width:135,height:85,offsetX:0,offsetY:0});
});
test('left and top resizing keeps the opposite visual edge anchored',()=>{
 assert.deepEqual(resizeFromHandle({width:100,height:60,dx:30,dy:14,handle:'nw'}),{width:70,height:46,offsetX:30,offsetY:14});
});
test('minimum bounds stop negative sizes',()=>{
 assert.deepEqual(resizeFromHandle({width:80,height:40,dx:-200,dy:-200,handle:'se'}),{width:20,height:20,offsetX:0,offsetY:0});
});
test('shift lock maintains aspect ratio when resizing corners',()=>{
 const v=resizeFromHandle({width:200,height:100,dx:80,dy:0,handle:'se',lockAspect:true});
 assert.deepEqual(v,{width:280,height:140,offsetX:0,offsetY:0});
});
test('resizing stores actual CSS width and height, not editor-only fields',()=>{
 const {doc,key}=addItem(createBlank(),'img','body');
 const updated=resizeElement(doc,key,'desktop',{width:244,height:180,offsetX:0,offsetY:0});
 assert.equal(updated.nodes[key].styles.width,'244px');
 assert.equal(updated.nodes[key].styles.height,'180px');
 assert.match(generatedCSS(updated),/width: 244px;/);
 assert.notEqual(doc.nodes[key].styles.width,updated.nodes[key].styles.width);
});
test('mobile resizing saves breakpoint overrides without changing desktop dimensions',()=>{
 const {doc,key}=addItem(createBlank(),'button','body');
 const updated=resizeElement(doc,key,'mobile',{width:160,height:45,offsetX:0,offsetY:0});
 assert.equal(updated.nodes[key].styles.width,undefined);
 assert.equal(updated.nodes[key].responsive.mobile.width,'160px');
 assert.equal(cssEffective(updated.nodes[key],'mobile').width,'160px');
 assert.match(generatedCSS(updated),/@media \(max-width: 767px\)/);
});
test('left resize retains prior translation and exports CSS translate',()=>{
 const {doc,key}=addItem(createBlank(),'div','body');
 doc.nodes[key].styles.translate='6px -2px';
 const updated=resizeElement(doc,key,'desktop',{width:80,height:66,offsetX:20,offsetY:13});
 assert.equal(updated.nodes[key].styles.translate,'26px 11px');
 assert.match(generatedCSS(updated),/translate: 26px 11px;/);
});
