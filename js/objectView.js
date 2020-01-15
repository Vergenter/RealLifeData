/* jshint esnext: true */
const R = require('ramda');
const Type = require('union-type');
const h = require('snabbdom/h').default;

// Utils
const searchBar = require('./topBar/searchBar');
const standardBar = require('./topBar/standardBar');
const breadcrumbs = require('./breadcrumbs/breadcrumbs');
const util = require('./breadcrumbs/breadcrumbsUtils');

// Model

const init= () => ({
  searchMode: false,
  search:searchBar.init(),
  breadcrumbs:breadcrumbs.init()
});


// Update
const Action = Type({
  Filter: [searchBar.Action], 
  SwitchSearchMode: [Boolean],
  RedirectTo:[String,String],
  None:[]
});

const update = R.curry((model,action) => Action.case({
  Filter: (barAct) => R.assoc('search',searchBar.update(model.search,barAct),model),
  SwitchSearchMode: (state) => R.assoc('searchMode',state,model),
  RedirectTo: (end,breadcrumbs)=>window.location=end+'?'+breadcrumbs,
  None: ()=> model
},action));

// View
const view = R.curry((actions$, model) =>h('div',[model.searchMode ? 
  searchBar.view({
    actions:    R.compose(actions$, Action.Filter),
    back:   R.compose(actions$, R.always(Action.SwitchSearchMode(false)))
  },model.search)    :
  standardBar.view({
    back: R.compose(actions$, R.always(Action.None)),
    startSearch: R.compose(actions$, R.always(Action.SwitchSearchMode(true))),
    add: R.compose(actions$, R.always(Action.RedirectTo('creator.html',util.breadcrumbsToString(model.breadcrumbs))))
  }),
breadcrumbs.view(actions$,model.breadcrumbs)
]));

module.exports={init,Action,update,view};
