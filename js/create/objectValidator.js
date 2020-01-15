const util = require('../breadcrumbs/breadcrumbsUtils');

const validateObject = (object)=> {
  const x=object.name.trim();
  return x.length >0 && x.search(util.separator)<0;
};
module.exports={validateObject};