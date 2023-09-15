<template>
  <div class="main">
    <div class="content">
      <div class="leftSide">
        <img src="@/assets/logo.png" alt="logo" class="logo" style="margin-right: 10px;">
        Zhouc's Web
      </div>
      
      <div :class="pageIndex==0?'itemSelected':'item'" style="margin-right: 5px;margin-left: auto;" @click="toPage(0)">
        <div style="overflow: hidden;display: flex;align-items: center;justify-self: center;">
          <svg class="itemIcon" width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18V42H39V18L24 6L9 18Z" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 29V42H29V29H19Z" fill="none" stroke="#000000" stroke-width="3" stroke-linejoin="round"/><path d="M9 42H39" stroke="#000000" stroke-width="3" stroke-linecap="round"/></svg>
        </div>
        <div class="itemText">
          <div class="mask"></div>
          <div class="textContent">主页</div>
        </div>
      </div>

      <div :class="pageIndex==1?'itemSelected':'item'" style="margin-right: 5px;"  @click="toPage(1)">
        <div style="overflow: hidden;display: flex;align-items: center;justify-self: center;">
          <svg class="itemIcon" style="animation-delay: 1.1s;" width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="13" y="10" width="28" height="34" fill="none" stroke="#000000" stroke-width="3" stroke-linejoin="round"/><path d="M35 10V4H8C7.44772 4 7 4.44772 7 5V38H13" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 22H33" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 30H33" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="itemText">
          <div class="mask"></div>
          <div class="textContent">Blog</div>
        </div>
      </div>

      <div :class="pageIndex==2?'itemSelected':'item'" style="margin-right: 5px;"  @click="toPage(2)">
        <div style="overflow: hidden;display: flex;align-items: center;justify-self: center;">
          <svg class="itemIcon" style="animation-delay: 1.4s;" width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 13L4 25.4322L16 37" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 13L44 25.4322L32 37" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 4L21 44" stroke="#000000" stroke-width="3" stroke-linecap="round"/></svg>
        </div>
        <div class="itemText">
          <div class="mask"></div>
          <div class="textContent">开发</div>
        </div>
      </div>

      <div :class="pageIndex==3?'itemSelected':'item'"  @click="toPage(3)">
        <div style="overflow: hidden;display: flex;align-items: center;justify-self: center;">
          <svg class="itemIcon" style="animation-delay: 1.7s;" width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="none" stroke="#000000" stroke-width="3" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 11C25.3807 11 26.5 12.1193 26.5 13.5C26.5 14.8807 25.3807 16 24 16C22.6193 16 21.5 14.8807 21.5 13.5C21.5 12.1193 22.6193 11 24 11Z" fill="#000000"/><path d="M24.5 34V20H23.5H22.5" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 34H28" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="itemText">
          <div class="mask"></div>
          <div class="textContent">关于</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    pageIndex: Number,
  },
  methods: {
    toPage(index){
      if(index==this.pageIndex){
        return;
      }else{
        this.$emit("toPage", index);
      }
    }
  },
}
</script>

<style scoped>
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
@keyframes selectAnimation {
  0%{
    background-color: rgba(254, 242, 190, 0);
  }
  100%{
    background-color: rgba(254, 242, 190, 1);
  }
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
@keyframes iconAnimation {
  0%{
    transform: translateY(120%);
  }
  100%{
    transform: translateY(0);
  }
}
@keyframes logoAnimation {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
.leftSide{
  user-select: none;
  font-size: 20px;
  display: flex;
  align-items: center;
  opacity: 0;
  animation: logoAnimation .3s ease-in-out forwards;
  animation-delay: 1s;
}
.logo{
  height: 40px;
}
.itemIcon{
  margin-right: 5px;
  transform: translateY(120%);
  animation: iconAnimation .5s ease-in-out forwards;
  animation-delay: .8s;
}
.textContent{
  opacity: 0;
  animation: textAnimation 1s forwards;
}
.mask{
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateX(-110%);
  animation: maskAnimation .8s forwards ease-in-out;
  background-color: black;
}
.itemText{
  overflow: hidden;
  position: relative;
  font-size: 17px;
}
.content{
  display: flex;
  width: 1000px;
  padding-right: 10px;
  padding-left: 10px;
  /* background-color: red; */
  align-items: center;
}
.item:hover{
  cursor: pointer;
}
.itemSelected{
  animation: selectAnimation 1s forwards;
  animation-delay: .8s;
}
.item:hover{
  border: 3px solid rgba(254, 242, 190, 1);
}
.item{
  border: 3px solid rgba(254, 242, 190, 0);
}
.item, .itemSelected{
  user-select: none;
  height: 40px;
  padding-right: 20px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  transition: all ease-in-out .3s;
}
@keyframes borderAnimation {
  0%{
    border-bottom: 1px solid rgba(211, 211, 211, 0);
  }
  100%{
    border-bottom: 1px solid rgba(211, 211, 211, 1);
  }
}
.main{
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, .6);
  backdrop-filter: blur(15px);
  animation: borderAnimation .3s forwards;
  animation-delay: 1s;
}
</style>