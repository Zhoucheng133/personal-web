<template>
  <div>
    <div class="pagemask" :style="{'transform': 'translateX('+maskX+')'}"></div>
    <topBar class="topBar" 
    :pageIndex="pageIndex" 
    :mobile="mobile"
    @toPage="toPage" />
    <div class="content">
      <svg width="50" height="50" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="8" width="40" height="32" rx="2" fill="none" stroke="#000000" stroke-width="3" stroke-linejoin="round"/><path d="M12 18L19 24L12 30" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 32H36" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div class="text">未开发的区域</div>
    </div>
    <div class="btBar">
      <div>Zhouc's website</div>
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
      pageIndex: 2,
      maskX: '-100%',
      mobile: false,
    }
  },
  methods: {
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
    }
  },
  created() {
    document.title="Zhouc's website - 开发";
  },
}
</script>

<style scoped>
.text{
  margin-top: 10px;
  font-size: 22px;
}
.content{
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  width: 100%;
  height: calc(100vh - 61px - 80px);
  background-color: white;
  opacity: 0;
  animation: opacityAnimation linear forwards .3s;
  animation-delay: 1s;
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