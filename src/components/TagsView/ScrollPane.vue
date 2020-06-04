<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script>
  const padding = 15 // tag's padding

  export default {
    name: 'scrollPane',
    data() {
      return {
        left: 0
      }
    },
    computed: {
      scrollWrapper() {
        return this.$refs.scrollContainer.$refs.wrap
      }
    },
    methods: {
      handleScroll(e) {
        const eventDelta = e.wheelDelta || -e.deltaY * 40
        const $scrollWrapper = this.scrollWrapper
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
      },
      moveToTarget($target) {
        const $container = this.$refs.scrollContainer
        const $containerWidth = $container.offsetWidth
        const $targetLeft = $target.offsetLeft
        const $targetWidth = $target.offsetWidth

        if ($targetLeft < -this.left) {
          // tag in the left
          this.left = -$targetLeft + padding
        } else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + $containerWidth - padding) {
          // tag in the current view
          // eslint-disable-line
        } else {
          // tag in the right
          this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    height: 100%;
    /deep/ {
      .el-scrollbar__bar {
        bottom: 0;
      }
      .el-scrollbar__wrap {
        height: 49px;
      }
    }
  }
</style>