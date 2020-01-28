
import { curry} from 'ramda';
import Type from 'union-type';
import h from 'snabbdom/h';


// Model

const init= () => ({
});

// Update
const Action = Type({
});

const update = curry((model,action) => Action.case({
},action));

// View
// eslint-disable-next-line no-unused-vars
const view = curry((actions, model) =>h('b','No Pagae'));
  

export default{init,Action,update,view};