<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>

    <Like></Like>
    <Brand></Brand>
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
import Like from "./Like";
import Brand from "./Brand";
import Rank from "./Rank";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
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

<style lang="less" scoped></style>
