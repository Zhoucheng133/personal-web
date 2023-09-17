<template>
  <div>
    <div class="pagemask" :style="{'transform': 'translateX('+maskX+')'}"></div>
    <topBar class="topBar" 
    :pageIndex="pageIndex" 
    :mobile="mobile"
    @toPage="toPage" />
    <div class="content">
      <div class="title">本网站的开发离不开开源社区的贡献:</div>
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
      pageIndex: 3,
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
    document.title="Zhouc's Web - 关于";
  },
}
</script>

<style scoped>
.title{
  font-size: 20px;
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