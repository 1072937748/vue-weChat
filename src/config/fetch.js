import {
  baseUrl
} from './env'
import qs from 'qs'

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  let isupload = url.indexOf('qiniu/upload') == -1
  if (isupload) {
    url = baseUrl + url;
  }
  if (type == 'GET') {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }

  if (window.fetch && method == 'fetch') {
    let requestConfig = {
      method: type,
    }
    if (isupload) {
      requestConfig.credentials = 'include';
      requestConfig.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    } else {
      requestConfig.headers = {
        'Accept': 'application/json',
      }
    }
    if (type == 'POST' && isupload) {
      Object.defineProperty(requestConfig, 'body', {
        value: qs.stringify(data)
      })
    } else if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: data
      })
    }
    try {
      const response = await fetch(url, requestConfig);
      const responseJson = await response.json();
      return responseJson
    } catch (error) {
      console.log(requestConfig)
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = '';
      if (type == 'POST') {
        sendData = JSON.stringify(data);
      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
