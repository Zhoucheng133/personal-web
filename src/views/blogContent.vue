<template>
  <div class="body" ref="body">
    <div class="pagemask" :style="{'transform': 'translateX('+maskX+')'}"></div>
    <topBar class="topBar" :pageIndex="pageIndex" @toPage="toPage" />
    <div class="content">
      <v-md-preview :text="content" class="codeText" style="width: 100%;"></v-md-preview>
    </div>
    <div :class="setBarFix==true?'btBar_Fix':'btBar'">
      <div style="display: flex;">
        <div>Design by Zhouc |&nbsp;</div>
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

      content: '',
      setBarFix: true,
    }
  },
  components: {
    topBar
  },
  created() {
    axios.get(baseURL+"/api/blog/content/"+this.$route.params.id).then((response)=>{
      this.content=response.data;
      this.$nextTick(()=>{
          this.btAreaSet();
        })
    })
  },
  methods: {
    btAreaSet(){
      if(this.$refs.body.offsetHeight<document.body.offsetHeight){
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
  },
  mounted() {
    window.onresize=()=>{
      this.btAreaSet();
    }
  },
}
</script>

<style scoped>
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