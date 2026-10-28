import React from 'react';

// Inlined SVG paths are device-independent and do not require icon fonts, CDNs or emoji fonts.
const paths={
 plus:<path d="M12 5v14M5 12h14"/>,
 copy:<><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
 download:<><path d="M12 3v12m-5-5 5 5 5-5"/><path d="M5 17v3h14v-3"/></>,
 eye:<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
 edit:<><path d="M12 20h9M4 16l-.8 4.8L8 20l11-11-4-4L4 16Z"/><path d="m13.5 6.5 4 4"/></>,
 trash:<><path d="M4 7h16m-2 0-.7 13H6.7L6 7M9 7V4h6v3M10 11v6m4-6v6"/></>,
 layers:<><rect x="4" y="3" width="16" height="17" rx="3" fill="currentColor" fillOpacity=".12"/><path d="M4 9h16M4 15h16"/></>,
 chevron:<path d="m9 18 6-6-6-6"/>,
 chevdown:<path d="m6 9 6 6 6-6"/>,
 undo:<><path d="m9 14-5-5 5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-2"/></>,
 redo:<><path d="m15 14 5-5-5-5"/><path d="M20 9H10a6 6 0 0 0 0 12h2"/></>,
 code:<><path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-12-2 16"/></>,
 monitor:<><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8m-4-3v3"/></>,
 tablet:<><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M11 19h2"/></>,
 phone:<><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 19h2"/></>,
 check:<path d="m5 12 4 4L19 6"/>,
 expand:<><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/></>,
 settings:<><path d="M12 2.5v2m0 15v2M2.5 12h2m15 0h2M5.3 5.3l1.4 1.4m10.6 10.6 1.4 1.4m0-13.4-1.4 1.4M6.7 17.3l-1.4 1.4"/><circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="2.2"/></>,
 grip:<><circle cx="9" cy="5" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="19" r="1"/></>,
 close:<path d="M5 5l14 14M19 5 5 19"/>,
 wrap:<><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/></>,
 hand:<><path d="M8 13V7a1.5 1.5 0 0 1 3 0v5-7a1.5 1.5 0 0 1 3 0v7-5a1.5 1.5 0 0 1 3 0v6-3a1.5 1.5 0 0 1 3 0v5c0 4-3 6-7 6H9c-2 0-3-2-4-4l-2-3a1.5 1.5 0 0 1 2.5-1.8L8 15"/></>,
 reset:<><path d="M4 10a8 8 0 1 1 2 7"/><path d="M4 4v6h6"/></>,
 move:<><path d="m12 2-3 3m3-3 3 3M12 2v20m0 0-3-3m3 3 3-3M2 12l3-3m-3 3 3 3M2 12h20m0 0-3-3m3 3-3 3"/></>,
 grid:<><path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18m6-18v18"/></>,
 'arrow-up':<path d="M12 19V5m-5 5 5-5 5 5"/>,
 'arrow-down':<path d="M12 5v14m-5-5 5 5 5-5"/>,
 search:<><circle cx="10.5" cy="10.5" r="6.5" fill="currentColor" fillOpacity=".1"/><path d="m15.5 15.5 5 5"/></>,
 cursor:<path d="m4 3 6.5 18 2.4-7.5 7.5-2.5Z" fill="currentColor" fillOpacity=".14"/>,
 multi:<><rect x="2" y="4" width="8" height="8" rx="2" fill="currentColor" fillOpacity=".16"/><rect x="14" y="4" width="8" height="8" rx="2" fill="currentColor" fillOpacity=".16"/><rect x="8" y="13" width="8" height="8" rx="2" fill="currentColor" fillOpacity=".16"/></>,
 group:<><g className="ui-group-left"><rect x="2.5" y="3" width="8.5" height="8.5" rx="2" fill="currentColor" fillOpacity=".14"/></g><g className="ui-group-right"><rect x="13" y="3" width="8.5" height="8.5" rx="2" fill="currentColor" fillOpacity=".14"/></g><path d="M10 16h4m-7.5-2.5v5h11v-5"/></>,
 ungroup:<><rect x="2" y="3" width="9" height="9" rx="2" fill="currentColor" fillOpacity=".12"/><rect x="13" y="12" width="9" height="9" rx="2" fill="currentColor" fillOpacity=".12"/><path d="M14 4h6v6M4 14v6h6" strokeDasharray="2 2"/></>,
 sliders:<><path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="currentColor" stroke="none"/><circle cx="16" cy="17" r="2" fill="currentColor" stroke="none"/></>,
};
export default function Icon({name,size=16}){
 return <svg className={"ui-icon ui-icon-"+name} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" role="presentation" aria-hidden="true" focusable="false">{paths[name]||paths.wrap}</svg>;
}
