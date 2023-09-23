<template>
  <div class="body" ref="editMain">
    <div class="barTop">
      <div class="name">{{ item.name }}</div>
      <div class="saveButton" @click="saveEdit">
        <svg width="16" class="icon" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9C6 7.34315 7.34315 6 9 6H34.2814L42 13.2065V39C42 40.6569 40.6569 42 39 42H9C7.34315 42 6 40.6569 6 39V9Z" fill="none" stroke="#ffffff" stroke-width="3" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24.0083 6L24 13.3846C24 13.7245 23.5523 14 23 14H15C14.4477 14 14 13.7245 14 13.3846L14 6" fill="none"/><path d="M24.0083 6L24 13.3846C24 13.7245 23.5523 14 23 14H15C14.4477 14 14 13.7245 14 13.3846L14 6H24.0083Z" stroke="#ffffff" stroke-width="3" stroke-linejoin="round"/><path d="M9 6H34.2814" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 26H34" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 34H24.0083" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        保存
      </div>
      <div class="closeButton" @click="closeEdit">
        <svg width="16" class="icon" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 8L40 40" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40L40 8" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        关闭
      </div>
    </div>

    <v-md-editor v-model="content" height="calc(100vh - 60px)" class="codeText"></v-md-editor>
  </div>
</template>

<script>
import {baseURL} from "@/_paras";
var axios=require("axios")
export default {
  data() {
    return {
      content: "",
    }
  },
  props: {
    item: Object,
    path: String,
  },
  methods: {
    saveEdit(){
      // fileName: this.item.name,
      // path: this.path,
      // content: encodeURIComponent(this.content),
      var params = new URLSearchParams();
      params.append('fileName', this.item.name);
      params.append('path', this.path);
      params.append('content', encodeURIComponent(this.content));

      axios.post(baseURL+"/api/saveEdit", params, {
        headers: {
          token: localStorage.getItem("token"),
          name: localStorage.getItem("name"),
        },
      }).then((response)=>{
        if(response.data.ok){
          this.$notification.success({
            message: '保存成功',
            description: "",
          });
        }else{
          this.$notification.error({
            message: '保存失败',
            description: response.data.reason,
          });
        }
      }).catch(()=>{
        this.$notification.error({
          message: '保存失败',
          description: '服务器连接出错，稍后重试',
        });
      });
    },
    closeEdit(){
      this.$refs.editMain.style.opacity=0;
      setTimeout(() => {
        this.$emit("closeEdit");
      }, 300);
    },
    contentRequest(){
      axios.get(baseURL+"/api/getContentByName", {
        headers: {
          token: localStorage.getItem("token"),
          name: localStorage.getItem("name")
        },
        params: {
          fileName: this.item.name.substring(0, this.item.name.length-3),
        }
      }).then((response)=>{
        // console.log(response.data);
        this.content=response.data.content
      }).catch(()=>{
        this.$notification.error({
          message: '加载失败',
          description: '服务器连接出错，稍后重试',
        });
      });
    }
  },
  mounted() {
    var that=this;
    setTimeout(() => {
      that.$refs.editMain.style.opacity=1;
    }, 20);
  },
  created() {
    this.contentRequest();
  },
}
</script>

<style scoped>
.icon{
  margin-right: 5px;
}
.saveButton:hover{
  cursor: pointer;
  background-color: rgb(17, 128, 0);
}
.saveButton{
  margin-left: auto;
  align-items: center;
  user-select: none;
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  color: white;
  background-color: rgb(27, 200, 0);
  line-height: 30px;
  transition: all linear .3s;
}
.codeText{
  text-align: left !important;
}
.closeButton:hover{
  background-color: rgb(196, 0, 0);
  cursor: pointer;
}
.closeButton{
  margin-left: 10px;
  align-items: center;
  margin-right: 20px;
  user-select: none;
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  color: white;
  background-color: red;
  line-height: 30px;
  transition: all linear .3s;
}
.name{
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
  user-select: none;
}
.barTop{
  width: 100%;
  background-color: white;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgrey;
}
.body{
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  opacity: 0;
  background-color: rgb(255, 255, 255, .8);
  transition: all linear .3s;
}
</style>