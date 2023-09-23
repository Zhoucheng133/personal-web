<template>
  <div class="body" ref="editMain">
    <div class="barTop">
      <div class="name">{{ item.name }}</div>
      <div class="closeButton" @click="closeEdit">
        <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 8L40 40" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40L40 8" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        关闭
      </div>
    </div>

    <v-md-editor v-model="content" height="100%" width="100%" class="codeText"></v-md-editor>
  </div>
</template>

<script>
import {baseURL} from "@/_paras";
var axios=require("axios")
export default {
  data() {
    return {
      content: "",
    }
  },
  props: {
    item: Object
  },
  methods: {
    closeEdit(){
      this.$refs.editMain.style.opacity=0;
      setTimeout(() => {
        this.$emit("closeEdit");
      }, 300);
    },
    contentRequest(){
      axios.get(baseURL+"/api/getContentByName", {
        headers: {
          token: localStorage.getItem("token"),
          name: localStorage.getItem("name")
        },
        params: {
          fileName: this.item.name.substring(0, this.item.name.length-3),
        }
      }).then((response)=>{
        // console.log(response.data);
        this.content=response.data.content
      });
    }
  },
  mounted() {
    var that=this;
    setTimeout(() => {
      that.$refs.editMain.style.opacity=1;
    }, 20);
  },
  created() {
    this.contentRequest();
  },
}
</script>

<style scoped>
.codeText{
  text-align: left !important;
}
.closeButton:hover{
  background-color: rgb(196, 0, 0);
  cursor: pointer;
}
.closeButton{
  margin-left: auto;
  align-items: center;
  margin-right: 20px;
  user-select: none;
  width: 70px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  color: white;
  background-color: red;
  line-height: 30px;
  transition: all linear .3s;
}
.name{
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
  user-select: none;
}
.barTop{
  width: 100%;
  background-color: white;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgrey;
}
.body{
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  opacity: 0;
  background-color: rgb(255, 255, 255, .8);
  transition: all linear .3s;
}
</style>