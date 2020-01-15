/* jshint esnext: true */
const R = require('ramda');
const h = require('snabbdom/h').default;
const util = require('./breadcrumbsUtils');

const Home='Home';
// Model
const init= () => {
  const x= util.breadcrumbsFromParams();
  return x?x:[Home];
};


const getListElement =(elementName)=>
  h('il',elementName)
  //window.location=end
;
// View
const view = R.curry((action,model) =>h('div', [
  h('ul',R.map((x)=>x!==Home?[h('b',' > '),getListElement(x)]:getListElement(x),model))
]));

module.exports={init,view};