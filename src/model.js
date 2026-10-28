export const SIZES = { mobile:[390,844], tablet:[768,1024], desktop:[1280,800] };
export const ELEMENTS = {
  Structure: [['div','Box'],['section','Section'],['header','Header'],['nav','Navigation'],['main','Main'],['footer','Footer'],['article','Article'],['aside','Aside']],
  Typography: [['h1','Heading 1'],['h2','Heading 2'],['h3','Heading 3'],['p','Paragraph'],['span','Text'],['strong','Bold'],['em','Italic'],['small','Small'],['blockquote','Quote'],['code','Code'],['pre','Preformatted']],
  Interactive: [['button','Button'],['a','Link'],['input','Input'],['textarea','Text area'],['form','Form'],['label','Label'],['select','Select'],['option','Option']],
  Content: [['img','Image'],['hr','Divider'],['ul','List'],['ol','Ordered list'],['li','List item'],['details','Details'],['summary','Summary'],['figure','Figure'],['figcaption','Caption']],
  Advanced: [['table','Table'],['thead','Table head'],['tbody','Table body'],['tr','Table row'],['th','Header cell'],['td','Cell'],['video','Video'],['audio','Audio'],['progress','Progress']]
};
export const CONTAINERS = new Set(['body','div','section','header','nav','main','footer','article','aside','form','ul','ol','details','figure','select','table','thead','tbody','tr']);
export const VOID = new Set(['img','input','hr']);
export const LEAF = new Set(['h1','h2','h3','p','span','strong','em','small','blockquote','code','pre','button','a','label','li','option','summary','figcaption','th','td']);
export const FONT_OPTIONS = ['Inter','¶»§q«^