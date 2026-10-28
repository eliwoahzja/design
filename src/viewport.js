import {SIZES} from './model.js';
/** Fit is computed from the real canvas panel, never from the browser window. */
export const clampZoom=value=>Math.max(0.15,Math.min(2,Math.round(value*100)/100));
export function calculateFitZoom(device,availableWidth,availableHeight,{compact=false}={}){
 const size=SIZES[device]||SIZES.mobile;
 if(!Number.isFinite(availableWidth)||availableWidth<=0)return 1;
 const xPadding=compact?24:80;
 const yPadding=compact?36:126;
 const byWidth=Math.max(1,availableWidth-xPadding)/size[0];
 // On phones fit to width so the user can scroll inside the page vertically.
 const byHeight=compact?Infinity:Math.max(1,availableHeight-yPadding)/size[1];
 return clampZoom(Math.min(1,byWidth,byHeight));
}
export function parseTranslate(value){
 if(typeof value!=='string'||!value.trim())return [0,0];
 const parts=value.trim().split(/\s+/);
 const parse=part=>part&&/^-?\d+(?:\.\d+)?px$/.test(part)?Number.parseFloat(part):0;
 return [parse(parts[0]),parse(parts[1])];
}
/** CSS translate keeps the original element's layout footprint intact. */
export function applyDragTranslate(current,deltaX,deltaY){
 const [x,y]=parseTranslate(current);
 return `${Math.round(x+deltaX)}px ${Math.round(y+deltaY)}px`;
}

/** Resize a box in canvas pixels. West/north edges keep the opposite visual edge anchored. */
export function resizeFromHandle({width,height,dx,dy,handle,minWidth=20,minHeight=20,lockAspect=false}){
 const w0=Math.max(minWidth,Number(width)||minWidth),h0=Math.max(minHeight,Number(height)||minHeight);
 const west=handle.includes('w'),east=handle.includes('e'),north=handle.includes('n'),south=handle.includes('s');
 const horizontal=west||east,vertical=north||south;
 const proposedW=horizontal?w0+(west?-dx:dx):w0;
 const proposedH=vertical?h0+(north?-dy:dy):h0;
 let w=Math.max(minWidth,proposedW),h=Math.max(minHeight,proposedH);
 if(lockAspect&&horizontal&&vertical){
  const ratio=w0/h0;
  // Choose the axis with the larger proportional change; clamp both axes together.
  const scale=Math.max(Math.abs((proposedW-w0)/w0),Math.abs((proposedH-h0)/h0));
  const drivingW=Math.abs((proposedW-w0)/w0)>=Math.abs((proposedH-h0)/h0);
  const sign=drivingW?Math.sign(proposedW-w0):Math.sign(proposedH-h0);
  const requested=1+sign*scale;
  const fitted=Math.max(minWidth/w0,minHeight/h0,requested);
  w=w0*fitted;h=h0*fitted;
 }
 w=Math.round(w);h=Math.round(h);
 return {width:w,height:h,offsetX:west?w0-w:0,offsetY:north?h0-h:0};
}
