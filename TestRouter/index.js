import { path} from 'ramda';

import classModule from 'snabbdom/modules/class';
import propsModule from 'snabbdom/modules/props';
import eventListenersModule from 'snabbdom/modules/eventlisteners';
import styleModule from 'snabbdom/modules/style';
import router from './router';
import { init as _init } from 'snabbdom';
const patch =_init([classModule,propsModule,eventListenersModule,styleModule]);
const URLfromEvent = path(['path',0,'URL']);

const main = (oldState, oldVnode, view, update) => {
  const newVnode = view((action) => {
    const newState = update(oldState,action);
    main(newState, newVnode, view, update);
  }, oldState);
  patch(oldVnode, newVnode);
};

// Begin rendering when the DOM is ready
window.addEventListener('DOMContentLoaded', (event) => {
  const vnode = document.getElementById('container');
  main(router.init(URLfromEvent(event)), vnode, router.view, router.update);
});
