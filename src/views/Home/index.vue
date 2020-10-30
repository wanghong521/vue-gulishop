<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    
  </div>
</template>

<script>
import Recommend from './Recommend'
import ListContainer from './ListContainer'
export default {
  name: 'Home',
  components:{
    Recommend,
    ListContainer
  }
}
</script>

<style lang="less" scoped>

</style>
