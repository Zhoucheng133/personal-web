<template>
  <div class="body">
    <topBar :pageIndex="pageIndex" />
    <div class="content">
      <div class="toolbar">
        <a-button v-if="path==''" type="text" style="margin-right: 10px;" disabled>上一层</a-button>
        <a-button v-else type="text" style="margin-right: 10px;" @click="backdir">上一层</a-button>
        <a-button type='primary'>上传</a-button>
      </div>
      <div class="main">
        <div class="item" v-for="(item, index) in fileShown" :key="index" @click="clickItem(item)">
            <div class="itemContent">
              <svg v-if="item.isFile==true" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 4H11C9.89543 4 9 4.89543 9 6V42C9 43.1046 9.89543 44 11 44H39C40.1046 44 41 43.1046 41 42V6C41 4.89543 40.1046 4 39 4Z" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 30L31 30" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 36H24" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="17" y="12" width="14" height="10" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <svg v-else width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 8C5 6.89543 5.89543 6 7 6H19L24 12H41C42.1046 12 43 12.8954 43 14V40C43 41.1046 42.1046 42 41 42H7C5.89543 42 5 41.1046 5 40V8Z" fill="none" stroke="#000000" stroke-width="3" stroke-linejoin="round"/><path d="M43 22H5" stroke="#000000" stroke-width="3" stroke-linejoin="round"/><path d="M5 16V28" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M43 16V28" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="itemContent">{{ item.name }}</div>
            <div class="itemContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topBar from '@/components/topBar.vue';
import {baseURL} from "@/_paras";
var axios=require("axios")
export default {
  data() {
    return {
      pageIndex: 9,
      path: "",

      fileShown: [],
    }
  },
  components:{
    topBar
  },
  methods: {
    backdir(){
      const lastIndex = this.path.lastIndexOf("/");
      if (lastIndex === -1) {
        this.path = "";
      } else {
        this.path = this.path.substring(0, lastIndex);
      }
      this.getFile();
    },
    clickItem(item){
      console.log(item);
      if(item.isFile==false){
        this.path+=item.name;
        this.getFile();
      }
    },
    checkLogin(){
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
    getFile(){
      axios.get(baseURL+"/api/fileManage", {
          params:{
            path: this.path
          },
          headers:{
            token: localStorage.getItem("token"),
            name: localStorage.getItem("name")
          }
        }).then((response)=>{
          if(response.data.ok){
            this.fileShown=response.data.files;
            this.fileShown=this.fileShown.filter(item => item.name!='.DS_Store');
            // console.log(this.fileShown);
          }else{
            this.$notification.error({
              message: '登录失败',
              description:
                'Token过期或有误',
            });
            localStorage.clear();
            this.$router.push("/dashboard/login")
          }
        });
    }
  },
  created() {
    document.title="控制台";
    this.checkLogin();
    this.getFile();
  },
}
</script>

<style scoped>
.toolbar{
  height: 60px;
  display: flex;
  align-items: center;
}
.itemContent{
  display: flex;
  align-items: center;
}
.item:hover{
  background-color: rgb(240, 240, 240);
  cursor: pointer;
}
.item{
  user-select: none;
  width: 100%;
  display: grid;
  padding-left: 20px;
  padding-right: 20px;
  grid-template-columns: 30px auto 20px;
  text-align: left;
  height: 50px;
  border-radius: 15px;
  transition: all ease-in-out .3s;
}
.content{
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  background-color: white;
}
.body{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>