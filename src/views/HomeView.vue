<template>
  <div class="body">
    <div class="pagemask" :style="{'transform': 'translateX('+maskX+')'}"></div>
    <topBar class="topBar" 
    :pageIndex="pageIndex" 
    @toPage="toPage" />
    <div class="cover">
      <img src="@/assets/logo.png" alt="logo" class="logo">
      <div class="welcText">
        <div class="mask"></div>
        <div class="textContent">欢迎来到Zhouc's Web!</div>
      </div>
    </div>
    <div class="btBar">
      <div>Design by Zhouc</div>
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
      pageIndex: 0,
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
      if(window.innerWidth<700 && this.mobile==false){
        this.$router.push('/m');
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
}
</script>

<style scoped>
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

@keyframes maskAnimation {
  0%{
    transform: translateX(-110%);
  }
  50%{
    transform: translateX(0);
  }
  100%{
    transform: translate(110%);
  }
}
@keyframes opacityAnimation {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
@keyframes textAnimation {
  0%{
    opacity: 0;
  }
  50%{
    opacity: 0;
  }
  51%{
    opacity: 1;
  }
  100%{
    opacity: 1;
  }
}
body{
  margin: 0;
}
.copyright{
  font-size: 10px;
  margin-top: 5px;
}
.btBar{
  height: 80px;
  background-color: rgb(245, 245, 245);
  width: 100%;
  display: flex;
  user-select: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: opacityAnimation .3s forwards linear;
  animation-delay: 1s;
  color: rgb(200, 200, 200);
}
.welcText{
  position: relative;
  overflow: hidden;
  margin-top: 30px;
}
.mask{
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateX(-110%);
  background-color: black;
  animation: maskAnimation .8s ease-in-out forwards;
  /* animation-delay: 1s; */
}
.textContent{
  position: relative;
  overflow: hidden;
  font-size: 30px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: 300;
  user-select: none;
  opacity: 0;
  animation: textAnimation ease-in-out .8s forwards;
}
.logo{
  width: 160px;
  opacity: 0;
  animation: opacityAnimation .8s ease-in-out forwards;
}
.cover{
  height: calc(100vh - 61px - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.topBar{
  z-index: 100;
}
.body{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}
</style>