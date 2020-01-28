import { compose,split, toLower} from 'ramda';
function toResource(resourceText){
  return '/'+(resourceText?resourceText:'');
}
function toId(idText){
  return idText?'/:id':'';
}
function toRoute(text){
  return toResource(text[1])+toId(text[2]);
}
function getPartAfterHashOrEmpty(text){
  return text.split(/#(.+)/)[1]||'';
}
export const URLToRoute=compose(
  toRoute,
  split('/'),
  getPartAfterHashOrEmpty,
  toLower
);