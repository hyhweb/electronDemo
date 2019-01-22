<template>
  <webview>
  <div id='bd'>
    打印的内容
  </div>
  </webview>
</template>

<script>
  import { ipcRenderer } from 'electron'
  export default {
    data () {
      return {

      }
    },
    mounted () {
      ipcRenderer.on('webview-print-render', (event, deviceInfo) => {
        alert('finish')
        let html = ''
        html = `<img src="${deviceInfo.imgSource}"
        width="${deviceInfo.imgWidth}px"
        height="${deviceInfo.imgHeight}px">`
        document.getElementById('bd').innerHTML = html
        ipcRenderer.sendToHost('webview-print-do')
      })
    }
  }
</script>

<style scoped>

</style>
