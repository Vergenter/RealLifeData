import { curry,path,assoc,compose,always,evolve,ifElse,equals} from 'ramda';
import Type from 'union-type';
import h from 'snabbdom/h';
import {POSTaccount} from './connections/Accont';
import { fork} from 'fluture/index.js';


const targetValue = path(['target', 'value']);

// Model

const init= () => ({
  email:'',
  errorCode: 0,
  password:'',
  repeatedPassword:'',
  date:'',
  agrement:null,

});

// Update
const Action = Type({
  EmailChanged:[String],
  POST:[Number],
  PasswordChanged:[String],
  RepeatedPasswordChanged:[String],
  DateChanged:[String],
  AgrementChanged:[Boolean],
});

const update = curry((model,action) => Action.case({
  POST: (code)=>assoc('errorCode',code,model),
  EmailChanged: (change)=>evolve({email:always(change),errorCode:always(0)})(model),
  PasswordChanged: (change)=>assoc('password',change,model),
  RepeatedPasswordChanged: (change)=>assoc('repeatedPassword',change,model),
  DateChanged: (change)=>assoc('date',change,model),
  AgrementChanged: (change)=>assoc('agrement',change,model)
},action));

// View
// eslint-disable-next-line no-unused-vars
const view = curry((actions, model) =>{
  const validationResult=validation(model);
  return h('form',[
    h('input', {
      props: {placeholder: 'Email', value: model.email, type:'email'},
      on: {input: compose(actions, Action.EmailChanged, targetValue)}
    }),
    h('div',emailAlreadyUsedMessage(model.errorCode)),
    h('input', {
      props: {placeholder: 'Password', value: model.password,type:'password'},
      on: {input: compose(actions, Action.PasswordChanged, targetValue)}
    }),
    h('br'),
    h('input', {
      props: {placeholder: 'Repeat password', value: model.repeatedPassword,type:'password'},
      on: {input: compose(actions, Action.RepeatedPasswordChanged, targetValue)}
    }),
    h('div',model.password===model.repeatedPassword?'':'password missmatch'),
    h('input', {
      props: {placeholder: 'Date of birth', value: model.date,type:'date'},
      on: {input: compose(actions, Action.DateChanged, targetValue)}
    }),
    h('br'),
    h('input', {
      props: {type: 'checkbox'},
      on: {input: compose(actions, Action.AgrementChanged, always(!validationResult.agreed))}
    }),
    { text: 'license agreement ' },
    h('a','hyperlink'),
    { text: ' and ' },
    h('a','hyperlink'),
    h('div',model.agrement===false?'You must agree to licence':''),
    h('button', {
      props: {disabled: !validationResult.OK,type:'button'},
      on: {
        click: ()=>
          fork(
            compose(actions,Action.POST)
          )(
            ()=>{window.location.hash='#/signin';}
          )(
            POSTaccount({name: model.email,password:model.password,date:model.date}))
      }
    }, 'signUP'),
    h('div',connectionMessage(model.errorCode)),
  ]);
});
const emailAlreadyUsedCode=403;
const emailAlreadyUsedMessage=ifElse(equals(emailAlreadyUsedCode),always('This email is already used'),always(''));
const noConnectionCode=-1;
const connectionMessage=ifElse(equals(noConnectionCode),always('No connection to the server'),always(''));
// eslint-disable-next-line no-unused-vars

const validation= (model)=>({
  emailNotTaken:model.errorCode!==emailAlreadyUsedCode,
  passwordMatch:model.password===model.repeatedPassword,
  agreed:model.agrement===true,
  fieldsNotEmpty: !!(model.email&&
    model.password&&
    model.repeatedPassword&&
    model.date&&
    model.agrement),
  get OK(){
    return this.emailNotTaken&&
    this.passwordMatch&&
    this.agreed&&
    this.fieldsNotEmpty;
  },
});

export default{init,Action,update,view};