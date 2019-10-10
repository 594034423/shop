import axios from 'axios'

//Mock 模拟封装接口函数

//登录完成后的所有的请求必须在请求的 headers 中添加 token

let axiosIns = axios.interceptors.request.use(
  function(config) {
    let  LoginToken = sessionStorage.getItem("LoginToken");
    //Brarer 是指 后台给的 token
    if(LoginToken){
      config.headers.Authorization = `Bearer ${LoginToken}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default {
  //这里的 http://api/mock 是使用了 mock 的数据拦截，在开发中根据后台给的接口而改变
  login(data) {
    return axios.post('http://api/mock', data)
  },

  getUserProgress() {
    return axios.get('http://api/mock')
  },

  logout(){
    //当退出登录，取消全局注册的钩子
    axios.interceptors.request.ejext(axiosIns);
  }
}
