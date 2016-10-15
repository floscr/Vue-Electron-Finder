<template>
  <div>
    <ul>
      <li class="column" v-for="file in files" @click="open">
        <ul class="filelist">
          <li class="filelist__dir" v-for="dir in file.dirs" value="dir" tabindex="0">
            <i class="material-icons">folder</i>
            {{ dir }}
          </li>
          <li class="filelist__file" v-for="file in file.files" value="file" tabindex="0">
            <i class="material-icons">insert_drive_file</i>
            {{ file }}
          </li>
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
    font-size: 15px;
    font-family: -apple-system, Helvetica, Arial, sans-serif;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body div, body div ul {
    height: 100%;
  }

  body {
    overflow: hidden;
    background-color: #F7F7F7;
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

  .column {
    display: flex;
    height: 100%;
  }

  .filelist {
    background-color: white;
    border-right: 1px solid #DDDDDD;
  }

  .filelist li {
    display: block;
    padding: 0.2em;
    padding-right: 1.5em;
    vertical-align: middle;
  }

  .material-icons {
    font-size: 1.05em;
    color: #c3c6c7;
  }

  .filelist li:focus {
    outline: none;
    color: white;
    background-color: ActiveBorder;
  }

  .filelist__dir i {
    color: #75CEF7;
  }

  i {
    margin-right: 0.1em;
  }
</style>
