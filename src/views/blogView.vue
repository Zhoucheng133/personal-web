<template>
  <div class="body">
    <div class="pagemask" :style="{'transform': 'translateX('+maskX+')'}"></div>
    <topBar class="topBar" 
    :pageIndex="pageIndex" 
    @toPage="toPage" />

    <div class="content">
      <div class="fixBar">
        <div class="text">TAG:</div>
        <div class="tagSelector">
          <div class="tagContent">
            <a-button size="small" class="tagButton" v-for="(item, index) in tags" :key="index" @click="tagSelect(item)" :type="selectTag==item ? 'primary':'default'">{{ item }}</a-button>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in shownList" :key="index" class="blogSelector" :style="{'animation-delay': index*100+'ms'}" @click="toContent(item['id'])">
        <div class="blogTitle">{{ item["title"] }}</div>
        <div class="info">
          <div style="max-width: 100%;">
            {{ item['date'] }}<FieldTimeOutlined class="icon" />
          </div>
          <div style="margin-top: 5px; max-width: 100%; overflow: hidden; text-overflow: ellipsis;">
            {{ item['tag'] }}<TagOutlined class="icon"/>
          </div>
        </div>
      </div>
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
import { FieldTimeOutlined, TagOutlined } from '@ant-design/icons-vue';
import {baseURL} from "@/_paras";
var axios=require("axios")
import topBar from '@/components/topBar.vue';
export default {
  components: {
    topBar,
    FieldTimeOutlined,
    TagOutlined
  },
  data() {
    return {
      pageIndex: 1,
      maskX: '-100%',
      mobile: false,

      blogList: [],
      shownList: [],

      tags: [],

      selectTag: "",

    }
  },
  methods: {
    toContent(id){
      this.maskX='0';
      var that=this;
      setTimeout(() => {
        that.$router.push("/blog/"+id);
      }, 800);
    },
    tagSelect(item){
      if(this.selectTag==item){
        this.selectTag="";
        this.shownList=this.blogList;
      }else{
        this.selectTag=item;
        this.shownList=this.blogList.filter(obj => obj.tag==item);
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
          const date = new Date(this.blogList[i]['date']);
          const year = date.getFullYear();
          const month = date.getMonth() + 1; // 月份从0开始，所以要加1
          const day = date.getDate();
          const hours = date.getHours();
          const minutes = date.getMinutes();
          this.blogList[i]['date']=`${year}/${month}/${day}, ${hours}:${minutes}`

          if(!this.tags.includes(this.blogList[i]['tag'])){
            this.tags.push(this.blogList[i]['tag'])
          }
        }
        // console.log(this.blogList);
        this.shownList=this.blogList;
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
.icon{
  margin-left: 10px;
}
.info{
  color: grey;
  width: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 10px;
  margin-left: auto;
  height: 100%;
  background: linear-gradient(to right, white, rgb(255, 227, 100, .4));
  overflow: hidden;
	white-space:nowrap;
	text-overflow: ellipsis;
}
.blogTitle{
  font-size: 20px;
  overflow: hidden;
	white-space:nowrap;
	text-overflow: ellipsis;
}
.blogSelector:hover{
  cursor: pointer;
  border: 3px solid rgb(255, 227, 100);
}
.blogSelector{
  /* padding-right: 10px; */
  overflow: hidden;
  padding-left: 10px;
  display: flex;
  align-items: center;
  height: 80px;
  margin-top: 10px;
  margin-bottom: 10px;
  user-select: none;
  border-radius: 20px;
  transition: all ease-in-out .3s;
  border: 3px solid rgba(255, 227, 100, 0);
  opacity: 0;
  animation: fadeIn ease-in-out .3s forwards;
}
.tagContent{
  max-height: 100%;
  overflow: scroll;
}
.tagButton{
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.tagSelector{
  /* height: 100%; */
  max-height: 100%;
  margin-left: 30px;
  display: flex;
  overflow: scroll;
}
.text{
  font-size: 30px;
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
  border-bottom: 1px solid lightgrey;
  opacity: 0;
  animation: opacityAnimation linear .3s forwards;
  animation-delay: 1s;
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
  margin-top: 20px;
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