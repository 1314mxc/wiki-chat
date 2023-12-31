
import { request } from './http';

import { BASEURL } from "./asset";

// get请求
export async function get(data) {
  let res = await request(`${BASEURL}/xxx`, data, {headers: {'yctoken': 'Authorization'}})
  return res.data
}

// post请求
export async function post(data) {
  let res = await request(`${BASEURL}/xxx`, data, {method:'post', headers: {'Content-Type': 'application/json', 'yctoken': 'Authorization'}})
  return res.data;
}

// put请求
export async function put(data) {
  let res = await request(`${BASEURL}/xxx`, data, {method:'put', headers: {'Content-Type': 'application/json', 'yctoken': 'Authorization'}})
  return res.data;
}

// delete请求
export async function deLete(data) {
  let res = await request(`${BASEURL}/xxx`, data, {method: 'delete', headers: {'yctoken': 'Authorization'}})
  return res.data
}
