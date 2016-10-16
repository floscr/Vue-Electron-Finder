<template>
  <div>
    <file-list></file-list>
  </div>
</template>

<script>
  import fileList from './components/fileList.vue'
  import store from 'src/vuex/store'

  export default {
    store,
    components: {
      fileList
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
    background-color: #F7F7F7;
    overflow: hidden;
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
    flex-flow: row;
    min-height: 100%;
    overflow-x: scroll;
    overflow-y: scroll;
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

  .material-icons, .fa {
    font-size: 1.05em;
    color: #9ea6a9;
  }

  .filelist__dir {
    position: relative;
  }

  .filelist__dir__arrow {
    position: absolute;
    margin-top: 1px;
    right: 0.34em;
  }

  .filelist li:focus {
    outline: none;
    color: white;
    background-color: ActiveBorder;
  }

  .filelist li:focus i {
    color: white;
  }

  .fa-folder {
    color: #75CEF7;
  }

  i {
    margin-right: 0.1em;
  }
</style>
