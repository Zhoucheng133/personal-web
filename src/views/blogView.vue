<template>
  <div class="body">
    <div class="pagemask" :style="{'transform': 'translateX('+maskX+')'}"></div>
    <topBar class="topBar" 
    :pageIndex="pageIndex" 
    @toPage="toPage" />

    <div class="content">
      <div class="fixBar">

      </div>
      <!-- <div v-for="(item, index) in blogList" :key="index">
        {{ item["id"]+":"+item["title"] }}
      </div> -->
    </div>

    <div class="btBar">
      <div style="display: flex;">
        <div>Design by Zhouc |&nbsp;</div>
        <div class="dashboard" @click="toDashboard">Dashboard</div>
      </div>
      <div class="copyright">2023 ~ now, All Rights Reserved.</div>
    </div>
  </div>
</template>

<script>
import {baseURL} from "@/_paras";
var axios=require("axios")
import topBar from '@/components/topBar.vue';
export default {
  components: {
    topBar
  },
  data() {
    return {
      pageIndex: 1,
      maskX: '-100%',
      mobile: false,

      blogList: [],

      tags: [],

    }
  },
  methods: {
    toDashboard(){
      this.maskX='0';
      var that=this;
      setTimeout(() => {
        that.$router.push("/dashboard");
      }, 800)
    },
    toPage(index){
      this.maskX='0';
      var that=this;
      setTimeout(() => {
        if(index==0){
          that.$router.push("/");
        }else if(index==1){
          that.$router.push("/blog");
        }else if(index==2){
          that.$router.push("/dev");
        }else if(index==3){
          that.$router.push("/about");
        }
      }, 800);
    },
    windowController(){
      if(window.innerWidth<700 && this.mobile==false){
        this.$router.push('/m/blog');
        this.mobile=true;
      }
    },
    getAllBlogs(){
      axios.get(baseURL+"/api/blog/getAll").then((response)=>{
        this.blogList = response.data;

        for(var i=0; i<this.blogList.length; i++){
          if(!this.tags.includes(this.blogList[i]['tag'])){
            this.tags.push(this.blogList[i]['tag'])
          }
        }
        console.log(this.tags);
      }).catch(()=>{
        this.$notification.error({
          message: '加载失败',
          description: '无法连接到数据库',
        });
      })
    }
  },
  mounted() {
    this.windowController();
    window.onresize=()=>{
      this.windowController();
    }
  },
  created() {
    this.getAllBlogs();
  },
}
</script>

<style scoped>
.fixBar{
  width: 100%;
  height: 100px;
  background-color: rgb(240, 240, 240);
}
.content{
  width: 100%;
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
.codeText{
	text-align: left;
}
.dashboard:hover{
  cursor: pointer;
  color: rgb(230, 188, 0);
}
.dashboard{
  transition: all ease-in-out .3s;
}
@keyframes opacityAnimation {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
.copyright{
  font-size: 10px;
  margin-top: 5px;
}
.btBar{
  height: 80px;
  flex-direction: column;
  background-color: rgb(245, 245, 245);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: opacityAnimation .3s forwards linear;
  animation-delay: 1s;
  user-select: none;
  color: rgb(200, 200, 200);
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
</style>