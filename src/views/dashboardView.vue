<template>
  <div class="body">
    <sideBar class="sidebar" :selected="selected" @toPage="toPage" />
  </div>
</template>

<script>
import {baseURL} from "@/_paras";
import sideBar from '@/components/sideBar.vue'
var axios=require("axios")

export default {
  components:{
    sideBar
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
.sidebar{
  position: fixed;
}
</style>