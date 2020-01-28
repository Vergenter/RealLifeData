import { cond,T,equals,always} from 'ramda';
import signin from './signin';
import signup from './signup';
import error404 from './error404';

export const routeToComponent=cond([
  [equals('/'),always(signin)],
  [equals('/signin'),always(signin)],
  [equals('/signup'),always(signup)],
  [T,always(error404)]
]);