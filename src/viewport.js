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
