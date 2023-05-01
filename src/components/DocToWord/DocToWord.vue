<template>
  <div class="word">
      <v-icon class="mr-3" large color="green darken-2" @click.self='exportProfileClientToWord'>
        mdi-printer
      </v-icon>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils'
import Docxtemplater from 'docxtemplater'
import ImageModule from 'docxtemplater-image-module-free'

export default {
  name: 'ProfileClientToWord',
  data () {
    return {
      reportData: {
        author: 'Роман Бойчук',
        content: '2020-05-10-report-0096'
      },
      base64DataURL: '',
      chartExtend: {
        // 设置关闭图表生成的动态效果，否则导出的图片只有坐标图，没有柱和线
        animation: false
      }
    }
  },
  props: {
    generalData: {}
  },
  methods: {
    afterSetOption: function (chartObj) {
      this.base64DataURL = chartObj.getDataURL()
    },
    base64DataURLToArrayBuffer: function (dataURL) {
      const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/
      if (!base64Regex.test(dataURL)) {
        return false
      }
      const stringBase64 = dataURL.replace(base64Regex, '')
      let binaryString
      if (typeof window !== 'undefined') {
        binaryString = window.atob(stringBase64)
      } else {
        binaryString = Buffer.alloc(stringBase64, 'base64').toString('binary')
      }
      const len = binaryString.length
      const bytes = new Uint8Array(len)
      for (let i = 0; i < len; i++) {
        const ascii = binaryString.charCodeAt(i)
        bytes[i] = ascii
      }
      return bytes.buffer
    },
    exportProfileClientToWord: function () {
      const passport = this.generalData.PASSPORT
      // const address = this.client.address
      const anketaName = 'Anketa' + ' ' + this.generalData.client_secondName + '.' + 'docx'
      //
      const ___this = this
      // 读取模板，如果要读取静态图片，方式一样
      // 模板必须放在public文件夹下，如果有图片，也一样
      PizZipUtils.getBinaryContent('../../shablonDocToWord/Anketa.docx', function (error, content) {
        if (error) {
          throw error
        }
        // 图表导出，本质还是图片的导出
        const opts = {}
        opts.centered = true
        // 图片居中
        opts.getImage = function (chartURL) {
          return ___this.base64DataURLToArrayBuffer(chartURL)
        }
        /**
         *  三个参数，第一个是图片对象，第二个在这里是base64DataURL，第三个是名称, 如果多个图表可根据第三个判断，
         *  给定相应的大小，或者修改docxtemplater-image-module-free官网的，方法，动态的给定大小值
         */
        opts.getSize = function () {
          return [600, 300]
        }
        const imageModule = new ImageModule(opts)
        // 创建一个PizZip实例，内容为模板的内容
        const zip = new PizZip(content)
        // 创建并加载docxtemplater实例对象
        const doc = new Docxtemplater()
        doc.attachModule(imageModule)
        doc.loadZip(zip)
        // 设置模板变量的值
        doc.setData({
          'chart-pic': ___this.base64DataURL, // v-chart图表数据
          ...___this.generalData,
          ...passport
        })
        try {
          doc.render()
        } catch (error) {
          console.log(error)
        }
        // 生成导出文件，这些都是docxtemplater-image-module-free官网的方法
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        })
        console.log(___this.generalData.client_firstName, 333333)
        saveAs(out, anketaName)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.word {
  display: flex;
  justify-content: center;
}
</style>
