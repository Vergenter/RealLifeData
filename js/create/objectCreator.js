/* jshint esnext: true */
const R = require('ramda');
const Type = require('union-type');
const h = require('snabbdom/h').default;
const validator = require('./objectValidator')
const targetValue = R.path(['target', 'value'])


// Model
const init= () => ({
  name:'',
  description:''
});

// Update
const Action = Type({
    NameChange:[String],
    DescriptionChange:[String]});

const update = R.curry((model,action) => Action.case({
    NameChange: (text) => R.assoc('name',text,model),
    DescriptionChange: (text) => R.assoc('description',text,model),
  },action));


// View
const view = R.curry((content, model) =>{
    
    return   h('div', [
        h('input', {
            props: {placeholder: 'Name', value: model.name},
            on: {input: R.compose(content.actions, Action.NameChange, targetValue)}
        }),
        h('input', {
            props: {placeholder: 'Description', value: model.description},
            on: {input: R.compose(content.actions, Action.DescriptionChange, targetValue)}
        }),
        validator.validateObject(model)?
            h('button', {on: {click: content.create}}, 'create'):
            h('button', {attrs: {disabled: true}}, 'create'),
        h('button', {on: {click: content.cancel}}, 'cancel'),

      ]);
});

module.exports={init,Action,update,view}