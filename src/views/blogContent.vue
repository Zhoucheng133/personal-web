<template>
  <div class="body" ref="body">
    <div class="pagemask" :style="{'transform': 'translateX('+maskX+')'}"></div>
    <topBar class="topBar" :pageIndex="pageIndex" @toPage="toPage" :mobile="mobile" />
    <div class="content">
      <div class="backBar" @click="toblog">
        <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 33C10 25.7011 14.103 19.4168 20 16.5919C22.1347 15.5693 24.5046 15 27 15C36.3888 15 44 23.0589 44 33" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 28L10 33L4 25" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        返回Blog页
      </div>
      <div class="infoBar">

        <div style="display: grid; width: 100%; grid-template-columns:1fr 1fr;">
          <div style="display: grid; align-items: center; grid-template-columns:21px auto;">
            <svg width="16" height="16" style="margin-right: 5px;" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V43" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 5V43" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 24L36 24" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <div style="width: 100%; white-space:nowrap; overflow: hidden; text-overflow: ellipsis;text-align: left;">{{ content['title'] }}</div>
          </div>
          <div style="display: grid; align-items: center; grid-template-columns:21px auto;">
            <svg width="16" height="16" style="margin-right: 5px;" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="none" stroke="#000000" stroke-width="3" stroke-linejoin="round"/><path d="M24.0084 12.0001L24.0072 24.0089L32.4866 32.4883" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <div style="width: 100%; white-space:nowrap; overflow: hidden; text-overflow: ellipsis;text-align: left;">{{ content['date'] }}</div>
          </div>
        </div>

        <div style="display: flex;margin-top: 5px;">
          <svg width="16" height="16" style="margin-right: 5px;" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.1691 29.2451L29.2631 42.1511C28.5879 42.8271 27.6716 43.2069 26.7161 43.2069C25.7606 43.2069 24.8444 42.8271 24.1691 42.1511L8 26V8H26L42.1691 24.1691C43.5649 25.5732 43.5649 27.841 42.1691 29.2451Z" fill="none" stroke="#000000" stroke-width="3" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 21C19.8807 21 21 19.8807 21 18.5C21 17.1193 19.8807 16 18.5 16C17.1193 16 16 17.1193 16 18.5C16 19.8807 17.1193 21 18.5 21Z" fill="#000000"/></svg>
          {{ content['tag'] }}
        </div>
      </div>
      <v-md-preview :text="content.content" class="codeText" style="width: 100%;"></v-md-preview>
    </div>
    <div :class="setBarFix==true?'btBar_Fix':'btBar'">
      <div style="display: flex;">
        <div>Zhouc's website |&nbsp;</div>
        <div class="dashboard" @click="toDashboard">Dashboard</div>
      </div>
      <div class="copyright">2023 ~ now, All Rights Reserved.</div>
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
      maskX: '-100%',

      content: {
        title: "",
        tag: "",
        date: "",
        content: ""
      },
      setBarFix: true,

      mobile: false,
    }
  },
  components: {
    topBar,
  },
  created() {
    document.title="博客";
    axios.get(baseURL+"/api/blog/content/"+this.$route.params.id).then((response)=>{
      this.content=response.data;
      if(this.content.title==''){
        this.$notification.error({
          message: '不存在的文档',
          description: '文档不存在，正在跳转到Blog页',
        });
        this.$router.push("/blog")
      }

      const date = new Date(this.content['date']);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 月份从0开始，所以要加1
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      this.content['date']=`${year}/${month}/${day}, ${hours}:${minutes}`

      document.title="博客 - "+this.content.title;

      this.$nextTick(()=>{
          this.btAreaSet();
        })
    }).catch(()=>{
      this.$notification.error({
        message: '无法查看文档',
        description: '服务器连接错误，稍后重试',
      });
      this.$router.push("/blog")
    })
  },
  methods: {
    btAreaSet(){
      if(this.$refs.body.offsetHeight+80<document.body.offsetHeight){
        this.setBarFix=true;
      }else{
        this.setBarFix=false;
      }
    },
    toDashboard(){
      this.maskX='0';
      var that=this;
      setTimeout(() => {
        that.$router.push("/dashboard");
      }, 800)
    },
    toblog(){
      this.maskX='0';
      var that=this;
      setTimeout(() => {
        that.$router.push("/blog");
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
          that.$router.push("/dashboard");
        }else if(index==3){
          that.$router.push("/about");
        }
      }, 800);
    },
    windowController(){
      if(window.innerWidth<700){
        this.mobile=true;
      }else{
        this.mobile=false;
      }
    }
  },
  mounted() {
    this.windowController();
    window.onresize=()=>{
      this.windowController();
      this.btAreaSet();
    }
  },
}
</script>

<style scoped>
.backBar:hover{
  cursor: pointer;
}
.backBar{
  display: flex;
  width: 100%;
  padding-left: 32px;
  padding-right: 32px;
  align-items: center;
  padding-top: 16px;
  user-select: none;
  opacity: 0;
  animation: opacityAnimation linear forwards .3s;
  animation-delay: .5s;
}
.infoBar{
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
  padding-left: 32px;
  padding-right: 32px;
  width: 100%;
  height: 70px;
  padding-top: 16px;
  opacity: 0;
  animation: opacityAnimation linear .3s forwards;
  animation-delay: .5s;
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
.codeText{
	text-align: left;
  opacity: 0;
  animation: opacityAnimation .3s forwards linear;
  animation-delay: .3s;
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
.copyright{
  font-size: 10px;
  margin-top: 5px;
}
.btBar_Fix{
  position: fixed;
  left: 0;
  bottom: 0;
}
.btBar, .btBar_Fix{
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
  margin-top: 20px;
}
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>