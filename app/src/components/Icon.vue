<template>
  <span class="fa" v-bind:class="fileType"></span>
</template>

<script>
  export default {

    props: [
      'file'
    ],

    computed: {
      fileType () {
        const extension = this.file.split('.').pop()
        if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg'].includes(extension)) {
          return 'fa-file-photo-o'
        } else if (['zip', 'rar'].includes(extension)) {
          return 'fa-file-zip-o'
        } else {
          return 'fa-file'
        }
      },
    },

  }
</script>
