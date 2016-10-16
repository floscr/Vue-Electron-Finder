<template>
<ul class="column">
  <li v-for="(file, index) in files">
    <ul class="filelist">
      <li
        class="filelist__dir"
        v-for="dir in file.dirs"
        value="dir"
        @click="browseDir(file.src, dir, index)"
        tabindex="0">
        <span class="fa fa-folder"></span>
        {{ dir }}
      </li>
      <li class="filelist__file" v-for="file in file.files" value="file" tabindex="0">
        <icon :file="file"></icon>
        {{ file }}
      </li>
    </ul>
  </li>
</ul>
</template>

<script>
  import Icon from './Icon.vue'
  import { ipcRenderer } from 'electron'
  import _ from 'lodash'

  export default {
    data () {
      return {
        files: []
      }
    },

    computed: {
      extension () {
        console.log(this)
      }
    },

    methods: {
      browseDir (path, dir, index) {
        if (this.files.length > index + 1) {
          this.files = _.chunk(this.files, index + 1)[0]
        }
        const src = `${path}/${dir}`
        ipcRenderer.send('READ_DIR', src)
      }
    },

    mounted () {
      if (this.files.length !== 0) return
      ipcRenderer.send('READ_DIR', '~/Downloads')

      ipcRenderer.on('DIR_STAT', (event, files) => {
        this.files.push(files)
      })
    },

    components: {
      Icon
    }
  }
</script>
