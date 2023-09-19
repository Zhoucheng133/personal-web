<template>
  <div class="body">
    <sideBar class="sidebar" :selected="selected" @toPage="toPage" />

    <upload v-if="selected==0" class="component" />
    <editView v-else-if="selected==1" class="component" />
    <fileManageView v-else-if="selected==2" class="component" />
  </div>
</template>

<script>
import {baseURL} from "@/_paras";
import sideBar from '@/components/sideBar.vue'
import upload from '@/components/uploadView.vue'
import fileManageView from "@/components/fileManageView.vue";
import editView from "@/components/editView.vue";
var axios=require("axios")

export default {
  components:{
    sideBar,
    upload,
    fileManageView,
    editView
  },
  data() {
    return {
      selected: 0,
    }
  },
  methods: {
    toPage(id){
      this.selected=id;
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
    }
  },
  created() {
    document.title="Zhouc's website - 控制台";
    this.checkLogin();
  },
}
</script>

<style scoped>
.component{
  margin-left: 200px;
}
.sidebar{
  position: fixed;
}
</style>