<template>
  <div class="body">
    <div class="pagemask" :style="{'transform': 'translateX('+maskX+')'}"></div>
    <topBar :pageIndex="pageIndex" @toPage="toPage" />
    <div class="content">
      <div class="toolbar">
        <a-button v-if="path==''" type="text" style="margin-right: 10px;" disabled>上一层</a-button>
        <a-button v-else type="text" style="margin-right: 10px;" @click="backdir">上一层</a-button>
        <a-button type='primary' @click="showUpload" style="margin-right: 10px;">上传</a-button>
        <a-button type="text" @click="newFolder">新建文件夹</a-button>
      </div>
      <div class="main" ref="main">
        <div class="item" v-for="(item, index) in fileShown" :key="index" @click="clickItem(item)">
            <div class="itemContent">
              <svg v-if="item.isFile==true" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 4H11C9.89543 4 9 4.89543 9 6V42C9 43.1046 9.89543 44 11 44H39C40.1046 44 41 43.1046 41 42V6C41 4.89543 40.1046 4 39 4Z" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 30L31 30" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 36H24" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="17" y="12" width="14" height="10" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <svg v-else width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 8C5 6.89543 5.89543 6 7 6H19L24 12H41C42.1046 12 43 12.8954 43 14V40C43 41.1046 42.1046 42 41 42H7C5.89543 42 5 41.1046 5 40V8Z" fill="none" stroke="#000000" stroke-width="3" stroke-linejoin="round"/><path d="M43 22H5" stroke="#000000" stroke-width="3" stroke-linejoin="round"/><path d="M5 16V28" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M43 16V28" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="itemContent">{{ item.name }}</div>
            <div class="itemContent" @click.stop="delFile(item)" v-if="item.isFile==true">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 10V44H39V10H9Z" fill="none" stroke="#000000" stroke-width="3" stroke-linejoin="round"/><path d="M20 20V33" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 20V33" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 10H44" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 10L19.289 4H28.7771L32 10H16Z" fill="none" stroke="#000000" stroke-width="3" stroke-linejoin="round"/></svg>
            </div>
        </div>
      </div>
    </div>
  </div>

  <a-modal v-model:open="openNewFolder" title="新建文件夹" @ok="newFolderHandler" @cancel="cancelNewFolder" centered style="user-select: none;" ok-Text="新建文件夹" cancel-Text="取消">
    <div class="modalbody">
      <div class="inputItem">
        <div class="inputText">新文件夹名称</div>
        <a-input class="inputArea" v-model:value="inputNewFolderName"></a-input>
      </div>
    </div>
  </a-modal>

  <editView class="editView" v-if="showEdit" ref="editPanel" :path="path" :item="selectedItem" @closeEdit="closeEdit" />

  <a-modal v-model:open="openUpload" title="上传"  @ok="handleUpload" @cancel="cancelUpload" centered style="user-select: none;" ok-Text="上传" cancel-Text="取消">
    <div class="modalbody">
      <div class="inputItem">
        <div class="inputText">标题</div>
        <a-input class="inputArea" v-model:value="inputTitle"></a-input>
      </div>
      <div class="inputItem" style="margin-top: 30px;">
        <div class="inputText">Tag</div>
        <a-input class="inputArea" v-model:value="inputTag"></a-input>
      </div>
      <div class="inputItem2" style="margin-top: 30px;">
        <div class="inputText">文件</div>
        <div class="inputText">置顶</div>
        <div>
          <a-upload :file-list="fileList" @remove="handleRemove" :before-upload="beforeUpload" @change="handleChange">
            <a-button type="primary"> 
              选择文件
            </a-button>
          </a-upload>
        </div>
        <div style="padding-top: 5px;"><a-switch v-model:checked="top" disabled /></div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import topBar from '@/components/topBar.vue';
import {baseURL} from "@/_paras";
var axios=require("axios");
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import editView from '@/components/editView.vue';
export default {
  data() {
    return {
      pageIndex: 9,
      path: "",

      maskX: '-100%',

      fileShown: [],

      selectedItem: null,

      openUpload: false,
      openNewFolder: false,

      inputTitle: "",
      inputTag: "",
      top: false,
      fileList: [],

      inputNewFolderName: "",

      showEdit: false,
    }
  },
  components:{
    topBar,
    editView,
  },
  methods: {
    closeEdit(){
      this.showEdit=false;
    },
    cancelUpload(){
      this.inputTitle="";
      this.fileList=[];
      this.inputTag="";
      this.top=false;
    },
    cancelNewFolder(){
      this.inputNewFolderName="";
    },
    newFolderHandler(){
      if(this.inputNewFolderName==""){
        this.$notification.error({
          message: '新建文件夹失败',
          description: '没有输入文件夹名称',
        });
        return;
      }

      axios.get(baseURL+"/api/newFolder", {
        headers: {
          token: localStorage.getItem("token"),
          name: localStorage.getItem("name")
        },
        params: {
          folderName: this.inputNewFolderName,
          path: this.path
        }
      }).then((response)=>{
        if(response.data.ok){
          this.$notification.success({
            message: '新建文件夹成功',
            description: '',
          });
          this.openNewFolder=false;
          this.getFile();
        }else{
          this.$notification.error({
            message: '新建文件夹失败',
            description: '已存在的文件夹',
          });
        }
      });
    },
    newFolder(){
      this.openNewFolder=true;
    },
    delFile(item){
      var that=this;
      Modal.confirm({
        content: '删除文件',
        centered: true,
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
          axios.get(baseURL+"/api/delFile", {
            headers: {
              token: localStorage.getItem("token"),
              name: localStorage.getItem("name")
            },
            params: {
              fileName: item.name.substring(0,item.name.length-3),
              path: that.path
            }
          }).then((response)=>{
            if(response.data.ok){
              that.$notification.success({
                message: '删除成功',
                description: '',
              });
              that.getFile();
            }else{
              that.$notification.error({
                message: '删除失败',
                description: response.data.reason,
              });
            }
          });
        },
        cancelText: '取消',
        onCancel() {
          Modal.destroyAll();
        },
      });
    },
    handleChange(){
      this.fileList=this.fileList.slice(-1);
    },
    handleUpload() {
      if(this.inputTitle==""){
        this.$notification.error({
          message: '上传失败',
          description: '没有输入标题',
        });
        return;
      }else if(this.fileList.length==0){
        this.$notification.error({
          message: '上传失败',
          description: '没有上传文件',
        });
        return;
      }

      const { fileList } = this;
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('file', file);
      });

      axios.post(baseURL+"/api/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.getItem("token"),
          name: localStorage.getItem("name")
        },
        params: {
          title: this.inputTitle,
          tag: this.inputTag,
          top: this.top,
          path: this.path
        }
      }).then((response)=>{
        if(response.data.ok==true){
          this.$notification.success({
            message: '上传成功',
            description: '',
          });
          this.inputTitle="";
          this.fileList=[];
          this.inputTag="";
          this.top=false;
          this.openUpload=false;
          this.getFile();
        }else{
          this.$notification.error({
            message: '上传失败',
            description: response.data.reason,
          });
        }
      }).catch(()=>{
        this.$notification.error({
          message: '登录失败',
          description: '服务器连接出错，稍后重试',
        });
      })
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    showUpload(){
      this.openUpload=true;
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
    backdir(){
      this.$refs.main.style.opacity=0;
      const lastIndex = this.path.lastIndexOf("/");
      if (lastIndex === -1) {
        this.path = "";
      } else {
        this.path = this.path.substring(0, lastIndex);
      }
      setTimeout(() => {
        this.getFile();
        this.$refs.main.style.opacity=1;
      }, 300);
    },
    clickItem(item){
      this.selectedItem=item;
      // console.log(item);
      if(item.isFile==false){
        this.$refs.main.style.opacity=0;
        this.path+="/"+item.name;
        setTimeout(() => {
          this.getFile();
          this.$refs.main.style.opacity=1;
        }, 300);
      }else{
        this.showEdit=true;
      }
    },
    checkLogin(){
      if(localStorage.getItem("token")==null || localStorage.getItem("name")==null){
        this.$router.push("/dashboard/login")
      }else{
        axios.get(baseURL+"/api/checkLogin", {
          headers:{
            token: localStorage.getItem("token"),
            name: localStorage.getItem("name")
          }
        }).then((response)=>{
          if(response.data==false){
            this.$notification.error({
              message: '登录失败',
              description:
                'Token过期或有误',
            });
            localStorage.clear();
            this.$router.push("/dashboard/login")
          }
        }).catch(()=>{
          this.$notification.error({
            message: '登录失败',
            description:
              '服务器连接出错，稍后重试',
          });
          this.$router.push("/dashboard/login")
        })
      }
    },
    getFile(){
      axios.get(baseURL+"/api/fileManage", {
        params:{
          path: this.path
        },
        headers:{
          token: localStorage.getItem("token"),
          name: localStorage.getItem("name")
        }
      }).then((response)=>{
        if(response.data.ok){
          this.fileShown=response.data.files;
          this.fileShown=this.fileShown.filter(item => item.name!='.DS_Store');
          this.fileShown.sort(function(a, b) {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          })
        }else{
          this.$notification.error({
            message: '登录失败',
            description:
              'Token过期或有误',
          });
          localStorage.clear();
          this.$router.push("/dashboard/login")
        }
      }).catch(()=>{
        this.$notification.error({
            message: '服务器连接失败',
            description:
              '检查服务器运行状态!',
          });
      });
    }
  },
  created() {
    document.title="控制台";
    this.checkLogin();
    this.getFile();
  },
}
</script>

<style scoped>
.editView{
  position: fixed;
  top: 0;
  left: 0;
  transition: all linear .3s;
}
.inputText{
  margin-bottom: 5px;
}
.modalbody{
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.inputItem2{
  display: grid;
  width: 250px;
  grid-template-columns: 125px 125px;
  grid-template-rows: 30px auto;
  text-align: left;
}
.inputItem{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 250px;
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

@keyframes opacityAnimation {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
.main{
  transition: all linear .3s;
}
.toolbar{
  height: 60px;
  display: flex;
  align-items: center;
}
.itemContent{
  display: flex;
  align-items: center;
}
.item:hover{
  background-color: rgb(240, 240, 240);
  cursor: pointer;
}
.item{
  user-select: none;
  width: 100%;
  display: grid;
  padding-left: 20px;
  padding-right: 20px;
  grid-template-columns: 30px auto 30px;
  text-align: left;
  height: 50px;
  border-radius: 15px;
  transition: all ease-in-out .3s;
}
.content{
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  background-color: white;
  opacity: 0;
  animation: opacityAnimation linear .3s forwards;
}
.body{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>