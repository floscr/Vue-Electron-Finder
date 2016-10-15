<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'src/vuex/store'
  import { ipcRenderer } from 'electron'

  export default {
    store,
    mounted () {
      ipcRenderer.send('signal', ['/tmp'])
      console.log('hey')
    }
  }
</script>
