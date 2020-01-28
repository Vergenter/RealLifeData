
import { curry,assoc,compose,identity,prop} from 'ramda';
import Type from 'union-type';
import {URLToRoute} from './parser';
import {routeToComponent} from './routeToComponent';

let test=()=>{};
window.addEventListener('hashchange',(event)=>test(event));
const URLToModel = compose(
  (component)=>({
    component: component,
    componentData: component.init()
  }),
  routeToComponent,
  URLToRoute
);
// Model
const init= URLToModel;

// Update
const Action = Type({
  Redirect:[Object],
  ComponentDo:[Object]
});

const update = curry((model,action) => Action.case({
  Redirect: identity,
  ComponentDo: (componentAction)=> assoc('componentData',model.component.update(model.componentData,componentAction),model)
},action));
// View
const view = curry((actions, model) =>{
  test=compose(actions, Action.Redirect,URLToModel,prop('newURL'));
  return model.component.view(compose(actions, Action.ComponentDo),model.componentData);
});

export default{init,Action,update,view};