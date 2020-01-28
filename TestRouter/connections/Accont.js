import {backendURL} from './config';
import {getFuture} from './common';
import { compose,always, ifElse, prop,chain} from 'ramda';
import { mapRej,reject,resolve} from 'fluture';

const accountPath='/Account';

const getRequestForPostingAccount=(json)=>
  ({ 
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: json
  });
const getRequestForCheckingIfUsernameExist=(username)=>new Request(backendURL+accountPath+'/'+username, { method: 'HEAD'});
export const HEADaccount=compose(
  getFuture,
  getRequestForCheckingIfUsernameExist,
);
export const POSTaccount=compose(
  chain(ifElse(prop('ok'),resolve,(x)=>reject(x.status))),
  mapRej(always(-1)),
  getFuture(backendURL+accountPath),
  getRequestForPostingAccount,
  JSON.stringify
);
