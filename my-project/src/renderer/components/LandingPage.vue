<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <span class="title">
          Welcome to my new project!
        </span>
        <el-button type="primary" @click="showPrint">获取打印机</el-button>
        <el-button type="primary" icon="el-icon-search" @click="print">打印页面</el-button>
        <webview ref="SystemInformation" src="https://www.baidu.com/">
          <system-information></system-information>
        </webview>

      </div>
    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import { ipcRenderer } from 'electron'
  var name = ''
  export default {
    name: 'landing-page',
    components: { SystemInformation },
    data: function () {
      return {

      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      showPrint () {
        ipcRenderer.send('getPrinterList')
        ipcRenderer.once('getPrinterList', (event, data) => {
          name = data[0].name
          const webview = this.$refs.SystemInformation
          alert(webview)
          webview.print(
            {
              silent: true,
              printBackground: true,
              deviceName: name
            },
            (data) => {
              console.log('webview success', data)
            }
          )
        })
      },
      print () {
        alert(name)
      }
    },
    mounted () {
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: #ffffff;
  }

  #wrapper {
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }
  .left-side{
    /*background-color: red;*/
  }
</style>
