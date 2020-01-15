/* jshint esnext: true */
const R = require('ramda');
const h = require('snabbdom/h').default;

// View
const view = R.curry((content) => 
  h('div', [
    h('button', {on: {click: content.back}}, 'back'),
    h('button', {on: {click: content.startSearch}}, 'search'),
    h('b','ICON PLACEHOLDER'),
    h('b','REGISTER / LOG IN'),
    h('button', {on: {click: content.add}}, 'add'),
  ])

);

module.exports={view};