import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateFitZoom,clampZoom,parseTranslate,applyDragTranslate} from '../src/viewport.js';

test('fit zoom is based on actual stage width, not entire window',()=>{
 assert.equal(calculateFitZoom('desktop',390,650,{compact:true}),0.29);
 assert.equal(calculateFitZoom('mobile',390,650,{compact:true}),0.94);
 assert.equal(calculateFitZoom('desktop',1550,900),0.97);
});
test('wide boards remain navigable at reduced scale instead of being clipped',()=>{
 assert.ok(calculateFitZoom('desktop',320,500,{compact:true})>=0.15);
 assert.equal(clampZoom(0.01),0.15);
 assert.equal(clampZoom(3),2);
});
test('drag translation preserves flow and existing offsets without introducing absolute positioning',()=>{
 assert.deepEqual(parseTranslate('12px -4px'),[12,-4]);
 assert.equal(applyDragTranslate('12px -4px',8,-3),'20px -7px');
 assert.equal(applyDragTranslate(undefined,-6.8,14.3),'-7px 14px');
});
