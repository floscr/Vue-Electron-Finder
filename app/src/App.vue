<template>
  <div>
    <router-view></router-view>
    {{ files }}
  </div>
</template>

<script>
  import store from 'src/vuex/store'
  import { ipcRenderer } from 'electron'

  export default {
    data () {
      return {
        files: []
      }
    },

    store,

    mounted () {
      ipcRenderer.send('signal', ['/tmp'])
      ipcRenderer.on('signal-answer', (event, files) => {
        this.files = files
      })
    }
  }
</script>
