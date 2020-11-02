<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Floor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :floor="floor"
    ></Floor>
  </div>
</template>

<script>
import Recommend from "./Recommend";
import ListContainer from "./ListContainer";
import Floor from "./Floor";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Recommend,
    ListContainer,
    Floor,
  },
  mounted() {
    this.getFloorList();
  },
  methods: {
    getFloorList() {
      this.$store.dispatch("getFloorList");
    },
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style lang="less" scoped>
</style>
