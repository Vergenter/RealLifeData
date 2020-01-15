const R = require('ramda');
const separator=">"
const breadcrumbsToString=(breadcrumbs)=>breadcrumbs.join(separator);
const breadcrumbsFromString=(text)=>text?text.split(separator):text;
const breadcrumbsAlias="breadcrumbs"
const fromParams= ()=>new URLSearchParams(location.search).get(breadcrumbsAlias)
const breadcrumbsFromParams= () => breadcrumbsFromString(fromParams())
module.exports={breadcrumbsToString,breadcrumbsFromString,breadcrumbsFromParams,separator}