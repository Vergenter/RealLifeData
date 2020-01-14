/* jshint esnext: true */
const R = require('ramda');
const Type = require('union-type');
const patch = require('snabbdom').init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/eventlisteners').default,
  require('snabbdom/modules/style').default,
]);
const h = require('snabbdom/h').default;

// Utils

const targetValue = R.path(['target', 'value'])

// Model

const init= () => ({
    text:''
});

const textLens = R.lensProp('text')

// Update
const Action = Type({ChangeText: [String]});

const update = (model,action) => Action.case({
    ChangeText: (text) => R.set(textLens,text,model),
  },action);

// View
const view = R.curry((actions$, model) =>{
    const field = h('input', {
        props: {placeholder: 'Input', value: model.text},
        on: {input: R.compose(actions$, Action.ChangeText, targetValue)}
    })
    return h('div',field);
});


const main = (oldState, oldVnode, view, update) => {
    const newVnode = view((action) => {
      const newState = update(oldState,action);
      main(newState, newVnode, view, update);
    }, oldState);
    patch(oldVnode, newVnode);
  };
  
  // Begin rendering when the DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    main(init(), container, view, update);
  });