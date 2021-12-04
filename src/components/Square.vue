<template>
  <div
    class="square"
    @click="handleChange"
    v-bind:class="{ 'shot-complete': shotComplete, 'shot-fail': shotFail }"
  >
    <i class="fas fa-cloud" style="font-size: 24px"></i>
    <span class="coordinates">{{ coordinates.x }}{{ coordinates.y }}</span>
    <div v-bind:class="{ 'target-solid icon': shotComplete, 'flag icon': shotFail  }"></div>
  </div>
</template>

<script>
export default {
  name: "Square",
  props: {
    coordinates: {},
    shot: {},
  },
  data() {
    return {
      shotComplete: false,
      shotFail: false,
    };
  },
  watch: {
    shot: {
      handler: function (shot) {
        if (
          shot.coordinates &&
          shot.coordinates.x == this.coordinates.x &&
          shot.coordinates.y == this.coordinates.y
        ) {
          shot.status == 3
            ? (this.shotFail = true)
            : (this.shotComplete = true);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    handleChange() {
      this.$emit("squareHandleChange", this.coordinates);
    },
  },
};
</script>

<style lang="scss">
.square {
  width: 50px;
  height: 50px;
  background: #078ce4;
  border: 1px solid #ccc !important;
  opacity: 0.8;
  cursor: pointer;
  .coordinates {
    font-size: 8px;
  }
}
.square:hover {
  opacity: 1;
}
.shot-complete {
  background: red;
  border-radius: 2px;
  transition: 0.2s linear;
  transform: scale(0.85);
}
.shot-fail {
  background: white;
  border-radius: 2px;
  transition: 0.3s linear;
  transform: scale(0.85);
}

.target-solid.icon {
  color: #000;
  position: absolute;
  margin-left: 38%;
  margin-top: -26%;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: solid 1px currentColor;
  background-color: currentColor;
}

.target-solid.icon:before {
  content: "";
  position: absolute;
  left: -1px;
  top: 7px;
  width: 13px;
  height: 1px;
  color: white;
  border-left: solid 2px currentColor;
  border-right: solid 2px currentColor;
}

.target-solid.icon:after {
  content: "";
  position: absolute;
  left: 7px;
  top: -1px;
  width: 1px;
  height: 13px;
  color: white;
  border-top: solid 2px currentColor;
  border-bottom: solid 2px currentColor;
}

.flag.icon {
  color: #000;
  position: absolute;
  margin-left: 6px;
  margin-top: 4px;
  width: 9px;
  height: 6px;
  border-radius: 1px;
  border: solid 1px currentColor;
}

.flag.icon:before {
  content: "";
  position: absolute;
  left: -3px;
  top: -2px;
  width: 1px;
  height: 15px;
  background-color: currentColor;
}
</style>