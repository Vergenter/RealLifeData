import {getFuture} from './common';
import { compose,always,ifElse,prop} from 'ramda';
import {backendURL} from './config';
import { encaseP, reject,mapRej,chain } from 'fluture';

const tokenPath='/Token';
const getRequestForGettingToken=({username,password})=>
  ({ 
    method: 'GET',
    headers:{   
      'Accept': 'application/json',
      'username': username,
      'password': password
    },
  });
 
export const GETToken=compose(
  chain(ifElse(prop('ok'),encaseP(x=>x.json()),(x)=>reject(x.status))),
  mapRej(always(-1)),
  getFuture(backendURL+tokenPath),
  getRequestForGettingToken,
);