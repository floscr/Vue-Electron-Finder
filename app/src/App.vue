<template>
  <div>
    <ul>
      <li v-for="file in files">
        {{ file }}
      </li>
    </ul>
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
      ipcRenderer.send('signal', ['~/Downloads'])
      ipcRenderer.on('signal-answer', (event, files) => {
        this.files = files
      })
    }
  }
</script>
