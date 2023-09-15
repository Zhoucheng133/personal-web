<template>
  <div class="body">
    <div class="pagemask" :style="{'transform': 'translateX('+maskX+')'}"></div>
    <div class="panel">
      <div class="backButton" @click="back">
        <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31 36L19 24L31 12" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="inputItem">
        <div class="inputText">标题</div>
        <a-input class="inputArea" v-model:value="inputTitle"></a-input>
      </div>
      <div class="inputItem" style="margin-top: 30px;">
        <div class="inputText">Tag</div>
        <a-input class="inputArea" v-model:value="inputTag"></a-input>
      </div>
      <div class="inputItem2" style="margin-top: 30px;">
        <div class="inputText">文件</div>
        <div class="inputText">置顶</div>
        <div class="uploadArea">
          <a-upload :file-list="fileList" @remove="handleRemove" :before-upload="beforeUpload" @change="handleChange">
            <a-button type="primary"> 
              选择文件
            </a-button>
          </a-upload>
        </div>
        <div style="padding-top: 5px;"><a-switch v-model:checked="top" /></div>
      </div>
      <div class="uploadButton" @click="handleUpload"><svg width="27" height="27" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 12L31 24L19 36" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    </div>
  </div>
</template>

<script>
import {baseURL} from "@/_paras";
var axios=require("axios")
export default {
  data() {
    return {
      maskX: '-100%',
      fileList: [],
      inputTitle: '',
      inputTag: '',
      top: false,
    }
  },
  methods: {
    handleChange(){
      this.fileList=this.fileList.slice(-1);
    },
    handleUpload() {
      const { fileList } = this;
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('file', file);
      });

      // You can use any AJAX library you like
      axios.post(baseURL+"/api/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.getItem("token"),
          name: localStorage.getItem("name")
        },
        params: {
          title: this.inputTitle
        }
      }).then((response)=>{
        if(response.data.ok==true){
          this.$notification.success({
            message: '上传成功',
            description: '',
          });
          this.inputTitle="";
          this.fileList=[];
        }else{
          this.$notification.error({
            message: '上传失败',
            description: response.data.reason,
          });
        }
      }).catch(()=>{
        this.$notification.error({
          message: '登录失败',
          description: '服务器连接出错，稍后重试',
        });
      })
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
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
    if(localStorage.getItem("token")==null || localStorage.getItem("name")==null){
      this.$router.push("/dashboard/login")
    }else{
      axios.get(baseURL+"/api/checkLogin", {
        headers:{
          token: localStorage.getItem("token"),
          name: localStorage.getItem("name")
        }
      }).then((response)=>{
        if(response.data==false){
          this.$notification.error({
            message: '登录失败',
            description:
              'Token过期或有误',
          });
          localStorage.clear();
          this.$router.push("/dashboard/login")
        }
      }).catch(()=>{
        this.$notification.error({
          message: '登录失败',
          description:
            '服务器连接出错，稍后重试',
        });
        this.$router.push("/dashboard/login")
      })
    }
  },
}
</script>

<style scoped>
.uploadButton:hover{
  background-color: rgb(255, 166, 0);
  cursor: pointer;
}
.uploadButton{
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
.uploadArea{
  width: 100%;
  text-align: left;
  display: flex;
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
.inputText{
  font-size: 16px;
  margin-bottom: 5px;
}
.inputItem2{
  display: grid;
  width: 250px;
  grid-template-columns: 125px 125px;
  grid-template-rows: 30px auto;
  text-align: left;
}
.inputItem{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 250px;
}
.inputArea{
  width: 250px;
}
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
.panel{
  width: 400px;
  height: 500px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  /* justify-content: center; */
  padding-top: 130px;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn ease-in-out .5s forwards;
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