const patch = require('snabbdom').init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/eventlisteners').default,
  require('snabbdom/modules/style').default,
]);

const init= (component)=>{
  const main = (oldState, oldVnode, view, update) => {
    const newVnode = view((action) => {
      const newState = update(oldState,action);
      main(newState, newVnode, view, update);
    }, oldState);
    patch(oldVnode, newVnode);
  };
  
  // Begin rendering when the DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    const vnode = document.getElementById('container');
    main(component.init(), vnode, component.view, component.update);
  });
};
module.exports={init};
