
// ------ external dependence
import { getToken, removeToken } from '@/utils/auth'

import axios from 'axios'

// axios.defaults.timeout = 300;


/**
 * @description
 * 导出network方法 - 网络库
 * 
 * 
 */
export { axios };

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';

// let cacheRequest = null;

/**
 * @description
 * network简单封装
 * 
 * options.headers
 * options.disableCheckResponse
 * options.delayCheck
 * options.disableErrorToast
 * 
 */
export const request = (api, dataE = {}, options = {}) => {

  let tmp_data = {};

  if (options.headers['yctoken']) {
    tmp_data[options.headers['yctoken']] = `Bearer ${getToken()}`;
    delete options.headers['yctoken'];
  }

  if (options.headers) {
    tmp_data = Object.assign(options.headers, tmp_data);
  }

  let tmp_options = Object.assign({
    method: options.method || 'get',
    timeout: 2,
  }, options, {
    data: dataE,
    headers: tmp_data
  });

  let { data, headers, method, timeout } = tmp_options;

  let data2 = {};
  if(method == 'get') {
    data2 = data;
  }else if(method == 'delete') {
    const key = Object.keys(data)[0];
    api = `${api}?${key}=${data[key]}`
  }else {
    data2 = {
      ...data
    }
  }

  console.log('before-request', {
    url: api,
    data2,
    method,
    headers,
    timeout
  })
  let optionsData = {
    method,
    headers,
    url: api,
    timeout: timeout * 1000
  }
  if(method == 'get') {
    optionsData['params'] = data2
  }else {
    optionsData['data'] = data2
  }

  return axios(optionsData).then(response => {
    if(response.data.code == 401 || response.data.code == 403) {
      removeToken();
      window.location.href = window.location.origin + "/login";
      return Promise.reject(response.data.msg);
    }else if(response.data.code == 10050) {
        ElMessage.error(response.data.msg);
        return Promise.reject(response.data.msg);
    } else {
      let pResolve = Promise.resolve(response);
      return pResolve;
    }
  })
    .catch(error => {
      if (options.disableCheckResponse || !error) {
        return Promise.reject(error);
      } else {

        // 登录校验逻辑
        // const code = error.data.code;
        // if (code === 2) {

        //   // Toast(error.status.message || '未登录');

        //   // window.location.href = login.login();
        //   return Promise.reject(error);
        // }

        return Promise.reject(error);
        // if (!options.delayCheck) {
        //   if (code > 0 && code <= 100) {

        //     // Toast(error.status.message || "服务器开小差");

        //     return Promise.reject(error);
        //   }
        //   if (code < 0 || code > 100) {

        //     // !options.disableErrorToast && Toast(error.status.message || '服务器开小差');

        //     return Promise.reject(error);
        //   }
        // } else {
        //   return Promise.reject(error);
        // }
      }
    });
};


