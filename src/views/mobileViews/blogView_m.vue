<template>
  <div>
    移动端页面: Blog
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDesktop: false,
    }
  },
  methods: {
    windowController(){
      if(window.innerWidth>=700 && this.isDesktop==false){
        this.$router.push('/blog');
        this.isDesktop=true;
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