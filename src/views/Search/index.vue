<template>
  <div>Search d df <br><br>
  params参数---{{$route.params.keyword}}
  <br>
  <br>
  params参数: {{keyword}} ------ query参数：{{keyword1}}
  </div>
</template>

<script>
export default {
  name: 'Search',
  props:['keyword','keyword1']
}
</script>

<style lang="less" scoped>

</style>
