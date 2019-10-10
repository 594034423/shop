<template>
  <div class="login">
    <h1>VUE登录页面</h1>
    <div class="top_hat"></div>
    <div class="login-box">
      <!-- logo -->
      <div class="logo-wrap">
        <div class="logo-box"></div>
      </div>
      <!-- 登录表单 -->
      <div class="input-group" :class="{active: act_index === 1, error: errors.has('cno')}">
        <label for="cm_code">公司编号：</label>
        <input name="cno" v-validate="{required: true, max: 6, min: 4}" @focus="act_index = 1" type="number" id="cm_code" v-model="cm_code">
      </div>
      <div class="input-group" :class="{active: act_index === 2, error: errors.has('pno')}">
        <label for="PNO">员工编号：</label>
        <input name="pno" v-validate="{required: true, max: 12, min: 4}" @focus="act_index = 2" type="number" id="PNO" v-model="PNO">
      </div>
      <div class="input-group" :class="{active: act_index === 3, error: errors.has('pwd')}">
        <label for="Passwd">用户密码：</label>
        <input name="pwd" v-validate="{required: true, max: 8, min: 6}" @focus="act_index = 3" type="number" id="Passwd" v-model="Passwd">
      </div>
      <div class="ck-row">
        <div class="ckbox_wrap" @click="rememberSet" :class="{active: remember}">
          <i class="iconfont" :class="{'icon-check-square' : remember,  'icon-border' : !remember}"></i>
          <span>记住密码</span>
        </div>
        <div class="ckbox_wrap"  :class="{active: autologin}" @click="autologinSet">
          <i class="iconfont" :class="{'icon-check-square' : autologin,  'icon-border' : !autologin}"></i>
          <span>自动登录</span>
        </div>
      </div>
    </div>
    <div class="btn-wrap" @click="loginBtnClick">
      <p>登录</p>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import axios from 'axios'
  import '../mock/mock.js'
  import api from '../aixos/api.js'  //封装有问题暂时去除
  import { Indicator, Toast } from "mint-ui";
  import "../assets/font/iconfont.css";
  import services from "../service"
  export default {
    name: "login",
    data() {
      //选项  / 数据
      return {
        cm_code: "",
        act_index: 1,
        PNO: "",
        Passwd: "",
        remember: false,
        autologin: false
      }
    },
    mounted() {
      //执行强行校验
      let data = JSON.parse(localStorage.getItem("login_data"));
      if(data){
        this.cm_code = data.cm_code;
        this.Passwd = data.Passwd;
        this.PNO = data.PNO;
        this.autologin = data.autologin;
        this.remember = data.remember;
        this.$validator.validate();
      }

      if(this.autologin) {
        this.loginBtnClick(); //方法就是登录
      }
    },
    methods: {
      ...mapMutations(["initUser"]),
      //事件处理
      autologinSet() {
        //设置当前的autologin为true或者false
        this.autologin = !this.autologin;
        //另外设置remember的值
        this.autologin && (this.remember = true)
      },
      rememberSet() {
        this.remember = !this.remember;
        this.remember || (this.autologin = false)
      },
      loginBtnClick() {
        // 判断当前是否检验全部通过
        this.errors.any(); //boolean 如果有错误那么返回 true，否则返回 false
        if(this.errors.any()) {
          console.log("errors");
          return;
        }
          //弹出等待的遮罩层，防止二次点击

          //发送 ajax / axios 请求
          // setTimeout( ()=> {
          //   Indicator.close();
          // },2000)
          services.login({
            cm_code: this.cm_code,
            PNO: this.PNO,
            Passwd: this.Passwd
          })
            .then(res => {
              console.log(res.data.token);
            if(res.data.code == 1){
              //登录成功
            localStorage.setItem("login_data", JSON.stringify({
              remember: this.remember,
              autologin: this.autologin,
              PNO: this.remember ? this.PNO : "",
              cm_code: this.remember ? this.cm_code : "",
              Passwd: this.remember ? this.Passwd : "",
            })
          );
            Indicator.open('正在登陆...');
            setTimeout( ()=> {
              //当登录的用户信息放到 sessionStorage 里面
              sessionStorage.setItem("LoginUser", JSON.stringify(res.data.user));
              //当登录的用户的 token 信息放到 sessionStorage 里面
              sessionStorage.setItem("LoginToken", JSON.stringify(res.data.token));
              Indicator.close();
              //当前用户的登录信息放到 vuex
              // this.$store.commit('initUser', res.data.user);
              this.initUser(res.data.user)
              console.log(res.data.user);
              //跳转到 home 页面
              this.$router.push('/home');
            },1000)}
            else{
              Toast({
                message: "用户名密码不正确，登录失败",
                duration: 2000
              })
            }
            Indicator.close();
          })
           .catch(error => {
             console.log(error);
             Toast({
               message: "用户名密码不正确，登录失败",
               duration: 2000
             })
             Indicator.close();
           })
      }
    },
    components: {
      //定义组件

    }
  }
</script>
<style lang="scss">
  @import '../../src/assets/style/main.scss';
  html,
  body,
  #app {
    height: 100%;
  }
</style>

<style lang="scss" scoped>
  @import '../../src/assets/style/main.scss';
  h1 {
    text-align: center;
    font-size:  px2rem(50);
    height: px2rem(100);
    padding: px2rem(68) 0 px2rem(44);
    line-height: px2rem(100);
    color: #fff
  }
  @mixin login_wrap {
    width: px2rem(600);
    margin: 0 auto;
    background: #fff;
    border-radius: px2rem(20);
  }
  .login {
    background-color: #407cd6;
    height: 100%;
  }
  .top_hat {
    width: px2rem(537);
    height: px2rem(18);
    background: #eee;
    margin: 0 auto;
    border-radius: px2rem(18) px2rem(18) 0 0
  }
  .login-box {
    @include login_wrap;
    height: px2rem(836);
      .logo-wrap {
        padding: px2rem(80) 0;
        .logo-box {
          width: px2rem(190);
          height: px2rem(190);
          margin: 0 auto;
          background: url(../assets/logo.png);
          background-size: cover;
        }
      }
      @mixin rowStyle(){
        padding: 0 px2rem(36);
        color:$text-color;
        width: px2rem(400);
      }
      .input-group {
        border: 2px solid #e2e2e2;
        // border-radius: px2rem(10);
        font-size: $text-size-mid;
        line-height: px2rem(90);
        font-size: px2rem(28);
        @include rowStyle();
        margin: 0 auto px2rem(30);
        input {
          border: 0 none;
          font-size: $text-size-mid;
          line-height: px2rem(90);
          width: px2rem(200);
          padding-left: 1em;
        }
      }
      .input-group.active {
        color: $act-color;
        border: 2px solid $act-color;
      }
      .input-group.error {
        color: red;
        border: 2px solid red;
      }
      .ck-row{
        @include rowStyle();
        font-size: $text-size;
        display: flex;
        justify-content: space-around;
          .ckbox_wrap {
            padding-left: px2rem(36);
            i::before {
              padding-top: px2rem(8);
              display: inline-block;
              height: px2rem(30);
              width: px2rem(30);
              font-size: px2rem(30);
            }
          }
          .ckbox_wrap.active {
            color: $act-color;
          }
          .ckbox_wrap.error {
            color: red;
          }
      }

  }
  .btn-wrap {
    @include login_wrap;
    font-weight: 700;
    letter-spacing: px2rem(10);
    height: px2rem(100);
    text-align: center;
    line-height: px2rem(100);
    margin-top: px2rem(30);
    font-size: $text-size-imp;
    color: $act-color;
  }
</style>
