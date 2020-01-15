/* jshint esnext: true */
const R = require('ramda');
const Type = require('union-type');
const h = require('snabbdom/h').default;
const util = require('./breadcrumbsUtils');

const Home="Home"
// Model
const init= () => {
    const x= util.breadcrumbsFromParams()
    return x?x:[Home]
};


const getListElement =(elementName,whole)=>{
    return h('il',elementName);
    //window.location=end
}
// View
const view = R.curry((action,model) =>{
    
    return h('div', [
        h('ul',R.map((x)=>x!==Home?[h('b',' > '),getListElement(x)]:getListElement(x),model))
      ]);
});

module.exports={init,view}