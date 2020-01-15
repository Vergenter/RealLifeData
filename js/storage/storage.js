const name= "Home"
const saveItem = (text)=>localStorage.setItem(name,text);
const readItem = ()=>localStorage[name];

module.exports={saveItem,readItem}