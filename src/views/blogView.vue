<template>
  <div>
    <div class="pagemask" :style="{'transform': 'translateX('+maskX+')'}"></div>
    <topBar class="topBar" 
    :pageIndex="pageIndex" 
    @toPage="toPage" />
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

      testArea: ""
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
    }
  },
  mounted() {
    this.windowController();
    window.onresize=()=>{
      this.windowController();
    }
  },
  created() {
  },
}
</script>

<style scoped>
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