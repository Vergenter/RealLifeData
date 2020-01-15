/* jshint esnext: true */
const R = require('ramda');
const Type = require('union-type');
const h = require('snabbdom/h').default;

// Utils

const targetValue = R.path(['target', 'value'])

// Model
const init= () => ({
  text:''
});

const textLens = R.lensProp('text')

// Update
const Action = Type({Search:[String],Clear:[]});

const update = R.curry((model,action) => Action.case({
    Search: (text) => R.assoc('text',text,model),
    Clear: () => R.assoc('text',"",model),
  },action));


// View
const view = R.curry((content, model) =>{
    
    return   h('div', [
        h('button', {on: {click: content.back}}, 'back'),
        h('input', {
            props: {placeholder: 'Input', value: model.text},
            on: {input: R.compose(content.actions, Action.Search, targetValue)}
        }),
        h('b',"showfilters"),
        h('button',{on: {click: ()=>content.actions(Action.Clear)}}, 'clear'),
      ]);
});

module.exports={init,Action,update,view}