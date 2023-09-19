<template>
  <div class="body">
    <div :class="selected==0 ? 'item_selected' : 'item'" @click="toPage(0)"><CloudUploadOutlined class="icon" />上传</div>
    <div :class="selected==1 ? 'item_selected' : 'item'" @click="toPage(1)"><EditOutlined class="icon" />编辑</div>
    <div :class="selected==2 ? 'item_selected' : 'item'" @click="toPage(2)"><FileSyncOutlined class="icon" />文件管理</div>
  </div>
</template>

<script>
import { CloudUploadOutlined, EditOutlined, FileSyncOutlined } from '@ant-design/icons-vue';
export default {
  components: {
    CloudUploadOutlined,
    EditOutlined,
    FileSyncOutlined
  },
  props:{
    selected: Number
  },
  data() {
    return {
      
    }
  },
  methods: {
    toPage(id){
      if(id==this.selected){
        return;
      }else{
        this.$emit("toPage", id);
      }
    }
  }
}
</script>

<style scoped>
.icon{
  margin-right: 10px;
}
.item_selected{
  font-weight: bolder;
  color: #FFA600;
}
.item:hover{
  background-color: rgb(234, 234, 234);
  cursor: pointer;
}
.item, .item_selected{
  user-select: none;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  margin-top: 10px;
  border-radius: 10px;
  transition: all ease-in-out .3s;
}
.body{
  height: 100vh;
  width: 200px;
  border-right: 1px solid lightgrey;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>