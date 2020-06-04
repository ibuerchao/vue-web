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
    methods: {
      handleScroll(e) {
        const eventDelta = e.wheelDelta || -e.deltaY * 3//wheelDelta:-120;deltaY:-120
        const $container = this.$refs.scrollContainer//外面的container
        const $containerWidth = $container.offsetWidth//外面的container的宽度
        const $wrapper = this.$refs.scrollWrapper//里面
        const $wrapperWidth = $wrapper.offsetWidth//里面的宽度

        if (eventDelta > 0) {
          this.left = Math.min(0, this.left + eventDelta)//min() 方法可返回指定的数字中带有最低值的数字。
        } else {
          if ($containerWidth - padding < $wrapperWidth) {
            if (this.left < -($wrapperWidth - $containerWidth + padding)) {
              this.left = this.left+10
            } else {
              this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding)
            }
          } else {
            this.left = 0
          }
        }
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