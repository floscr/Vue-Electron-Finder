<template>
  <div>
    <ul>
      <li v-for="file in files" @click="open">
        <ul class="filelist">
          <li v-for="dir in file.dirs" value="dir" tabindex="0">{{ dir }}</li>
          <li v-for="file in file.files" value="file" tabindex="0">{{ file }}</li>
        </ul>
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

    methods: {
      open () {

      }
    },

    store,

    mounted () {
      ipcRenderer.send('READ_DIR', '~/Downloads')
      ipcRenderer.on('DIR_STAT', (event, files) => {
        this.files.push(files)
      })
    }
  }
</script>

<style>
  html {
    font-family: -apple-system, Helvetica, Arial, sans-serif;
  }
  html, body {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    margin-top: 0;
    bottom: 0;
  }

  select {
    height: 100%;
  }

  .filelist li {
    display: block;
    padding: 0.2em;
  }

  .filelist li:focus {
    outline: none;
    color: white;
    background-color: ActiveBorder;
  }
</style>
