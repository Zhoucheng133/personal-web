<template>
  <div class="body" ref="body">
    <div class="pagemask" :style="{'transform': 'translateX('+maskX+')'}"></div>
    <topBar class="topBar" 
    :pageIndex="pageIndex" 
    :mobile="mobile"
    @toPage="toPage" />

    <div class="blogMian" :style="{ 'grid-template-columns': mobile==false ? '1fr 1fr 1fr 1fr':'1fr 1fr 1fr' }">
      <div class="gridItem" v-for="(item, index) in cata" :key="index" :style="{'animation-delay': index*100+'ms'}" @click="toCata(item)">
        <div class="itemInside">
          {{ item }}
        </div>
      </div>
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
import {baseURL} from "@/_paras";
var axios=require("axios")
import topBar from '@/components/topBar.vue';
export default {
  components: {
    topBar,
  },
  data() {
    return {
      pageIndex: 1,
      maskX: '-100%',
      mobile: false,

      setBarFix: undefined,

      cata: [],
    }
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
    },
    toCata(item){
      this.$router.push("/blog/cata/"+item);
    },
    getAllCata(){
      axios.get(baseURL+"/api/getAllCata").then((response)=>{
        this.cata=response.data;
      })
    }
  },
  mounted() {
    this.windowController();
    this.btAreaSet();
    this.getAllCata();
    window.onresize=()=>{
      this.windowController();
      this.btAreaSet();
    }
  },
  created() {
    document.title="Zhouc's website - Blog";
  },
}
</script>

<style scoped>
@keyframes opacityAnimation {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
@keyframes fadeIn {
  0%{
    opacity: 0;
    transform: translateY(10px);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}
.itemInside {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  height: 100%;
  line-height: 94px;
  text-align: center;
}
.gridItem:hover{
  cursor: pointer;
  border: 3px solid rgb(255, 227, 100);
}
.gridItem{
  padding-left: 5px;
  padding-right: 5px;
  border: 3px solid white;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100px;
  background: linear-gradient(to right, white, rgb(255, 227, 100, .4));
  animation: fadeIn ease-in-out .3s forwards;
  opacity: 0;
  user-select: none;
  border-radius: 20px;
  transition: all ease-in-out .3s;
}
.blogMian{
  margin-top: 30px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  max-width: 1000px;
  display: grid;
  gap: 5px;
  background-color: white;
  overflow: hidden;
	white-space:nowrap;
	text-overflow: ellipsis;
}
.body{
  display: flex;
  flex-direction: column;
  align-items: center;
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
@keyframes fadeIn {
  0%{
    opacity: 0;
    transform: translateY(10px);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}
.fixBar{
  width: 100%;
  height: 100px;
  user-select: none;
  display: flex;
  align-items: center;
  opacity: 0;
  animation: opacityAnimation linear .3s forwards;
  animation-delay: 1s;
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
  transition: all linear .3s;
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