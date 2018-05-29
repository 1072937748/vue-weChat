//获取图片地址
let imgurl = '/images/';
let uploadImg = 'http://dev.keepao.com/index/qiniu/upload';
let baseUrl = '';

if (process.env.NODE_ENV == 'development') {
  // baseUrl = '/api'
  baseUrl = 'http://www.changez.top:8003'
  imgurl = baseUrl + '/images/'
  // baseUrl = 'http://cangdu.org:8003'
} else {
  baseUrl = 'http://www.changez.top:8003'
  imgurl = baseUrl + '/images/'
}
export {
  baseUrl,
  uploadImg,
  imgurl
}
