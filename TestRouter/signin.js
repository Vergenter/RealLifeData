
import { curry,tap,path,assoc,compose,always,evolve,cond,equals,T} from 'ramda';
import Type from 'union-type';
import h from 'snabbdom/h';
import {GETToken} from './connections/Token';
import { fork} from 'fluture/index.js';
import {setCookie} from '..//cookies//cookies';

import jwt_decode from 'jwt-decode';
const targetValue = path(['target', 'value']);

// Model

const init= () => ({
  userEmail:'',
  userPassword:'',
  errorCode:''
});

// Update
const Action = Type({
  EmailChanged:[String],
  PasswordChanged:[String],
  AccountWrong:[Number]
});

const update = curry((model,action) => Action.case({
  EmailChanged: (change)=>evolve({userEmail:always(change),errorCode:always(0)})(model),
  PasswordChanged: (change)=>evolve({userPassword:always(change),errorCode:always(0)})(model),
  // eslint-disable-next-line no-unused-vars
  AccountWrong: (errorCode)=>assoc('errorCode',errorCode,model),
},action));
// View
// eslint-disable-next-line arrow-body-style
const view = curry((actions, model) =>{ 
  return h('form',[
    h('input', {
      props: {placeholder: 'Email', value: model.userEmail, type:'email'},
      on: {input: compose(actions, Action.EmailChanged, targetValue)}
    }),
    h('br'),
    h('input', {
      props: {placeholder: 'Password', value: model.userPassword,type:'password'},
      on: {input: compose(actions, Action.PasswordChanged, targetValue)}
    }),
    h('div',errorCodeMessage(model.errorCode)),
    h('button', {
      props: {type:'button',disabled: !validation(model)},
      on: {click: ()=>
        fork(
          compose(actions,Action.AccountWrong)
        )(
          processToken
        )(
          GETToken({ username:model.userEmail, password: model.userPassword }))
      }
    },'signIn'),
    h('br'),
    h('button',{props: {type:'button'}},'as guest'),
    h('div','Need an Account?'),
    h('button',{
      props: {type:'button',disabled: false},
      on: {click:()=>{window.location.hash='#/signup';}}
    },'sign Up'),
  ]);
}
);
const errorCodeMessage=cond([
  [equals(-1),always('no server connection')],
  [equals(400),always('wrong username or password')],
  [T,always('')]]);

const validation= (model)=> !!(model.userEmail&&model.userPassword);
const processToken=(Token)=>compose(
  x=>redirect(x.userId),
  tap(x=>setCookie('username',x.username,x.nbf-x.iat)),
  tap(x=>setCookie('entry',x.entry,x.nbf-x.iat)),
  tap(x=>setCookie('userId',x.userId,x.nbf-x.iat)),
  tap(x=>setCookie('Token',Token,x.nbf-x.iat)),
  jwt_decode
)(Token);
const redirect=(userId)=>{window.location.hash='#/view/'+userId;};
export default{init,Action,update,view};