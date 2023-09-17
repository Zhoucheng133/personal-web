<template>
  <div class="body">
    <div class="pagemask" :style="{'transform': 'translateX('+maskX+')'}"></div>
    <div class="panel">
      <div class="backButton" @click="back">
        <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31 36L19 24L31 12" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="inputItem">
        <div class="inputText">用户名</div>
        <a-input class="inputArea" v-model:value="inputName"></a-input>
      </div>
      <div class="inputItem" style="margin-top: 30px;">
        <div class="inputText">密码</div>
        <a-input-password class="inputArea" v-model:value="inputPass"></a-input-password>
      </div>
      <div class="loginButton" @click="login">
        <svg width="27" height="27" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 12L31 24L19 36" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
    </div>
  </div>
</template>

<script>
import {baseURL} from "@/_paras";
var axios=require("axios")
var cryptoJS=require("crypto-js");
export default {
  data() {
    return {
      maskX: '-100%',

      inputName: "",
      inputPass: "",
    }
  },
  methods: {
    login(){
      if(this.inputName=="" || this.inputPass==""){
        this.$notification.error({
          message: '登录失败',
          description:
            '存在没有填写的用户数据',
        });
        return;
      }

      var sha256Pass=cryptoJS.SHA256(this.inputPass);

      axios.get(baseURL+"/api/login?name="+this.inputName+"&pass="+sha256Pass).then((response)=>{
        if(response.data.ok==false){
          this.$notification.error({
            message: '登录失败',
            description: '用户名或密码错误',
          });
        }else{
          this.$notification.success({
            message: '登录成功',
            description: '正在跳转到控制台',
          });
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", this.inputName);
          this.maskX='0';
          var that=this;
          setTimeout(() => {
            that.$router.push("/dashboard");
          }, 800)
        }
      }).catch(()=>{
        this.$notification.error({
            message: '登录失败',
            description: '服务器连接出错，稍后重试',
          });
      })
    },
    back(){
      this.maskX='0';
      var that=this;
      setTimeout(() => {
        that.$router.push("/blog");
      }, 800)
    }
  },
  created() {
    document.title="Zhouc's website - 登录";
  },
}
</script>

<style scoped>
@keyframes fadeIn {
  0%{
    transform: translateY(20px);
    opacity: 0;
  }
  100%{
    transform: translateY(0);
    opacity: 1;
  }
}
.loginButton:hover{
  background-color: rgb(255, 166, 0);
  cursor: pointer;
}
.loginButton{
  transition: all ease-in-out .3s;
  position: absolute;
  height: 80px;
  width: 80px;
  background-color: rgb(255, 208, 0);
  border-top-left-radius: 10px;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  font-size: 30px;
}
.inputText{
  font-size: 16px;
  margin-bottom: 5px;
}
.inputItem{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.inputArea{
  width: 250px;
}
.backButton:hover{
  background-color: rgb(255, 166, 0);
  cursor: pointer;
}
.backButton{
  position: absolute;
  left: 0;
  top: 0;
  height: 50px;
  width: 50px;
  background-color: rgb(255, 208, 0);
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  transition: all ease-in-out .3s;
}
.panel{
  width: 400px;
  height: 500px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn ease-in-out .5s forwards;
}
.pagemask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 200;
  transition: all ease-in-out .8s;
}
body{
  margin: 0;
}
.body{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 100vh;
}
</style>