<template>
  <div id="app">
    <transition>
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* import 'element-ui/lib/theme-chalk/index.css' // 默认主题 */
@import '../static/css/theme-green/index.css'; /*浅绿色主题*/
@import '../static/css/icon.css';
@import '../static/css/main.css';
@import '../static/css/color-dark.css'; /*深色主题*/

</style>
