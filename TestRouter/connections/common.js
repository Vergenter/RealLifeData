import unfetch from 'unfetch';
import { encaseP } from 'fluture';

//export const fetch = (url)=>(content)=>unfetch(url,content);
export const getFuture=(url) => encaseP((content) => unfetch(url, content));