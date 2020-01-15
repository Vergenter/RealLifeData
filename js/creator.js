/* jshint esnext: true */
const R = require('ramda');
const Type = require('union-type');
const h = require('snabbdom/h').default;

// Utils
//const standardBar = require('./topBar/standardBar')
const breadcrumbs = require('./breadcrumbs/breadcrumbs').default;
const util = require('./breadcrumbs/breadcrumbsUtils');

// Model
const objectCreator = require('./create/objectCreator');

const init= () => ({
  breadcrumbs:breadcrumbs.init(),
  object: objectCreator.init()
});


// Update
const Action = Type({
  Modify:[objectCreator.Action],
  RedirectTo:[String,String],
  Create:[]
});

const update = R.curry((model,action) => Action.case({
  Modify: (objAction) => R.assoc('object',objectCreator.update(model.object,objAction),model),
  Create: ()=>model,
  RedirectTo: (end,breadcrumbs)=>window.location=end+'?'+breadcrumbs,
},action));

// View
const view = R.curry((actions$, model) =>h('div',[
  breadcrumbs.view(actions$,model.breadcrumbs),
  objectCreator.view(
    {
      actions:  R.compose(actions$, Action.Modify), 
      create:   () => actions$(Action.Create),
      cancel:   R.compose(actions$, R.always(Action.RedirectTo('view.html',util.breadcrumbsToString(model.breadcrumbs))))
    }, model.object
  )
]));

module.exports={init,Action,update,view};
