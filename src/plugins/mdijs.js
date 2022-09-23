import Vue from 'vue'
import VueMdijs from 'vue-mdijs'
import {
  mdiMagnify,
  mdiFileDownload,
  mdiWhatsapp,
  mdiCompareHorizontal,
  mdiOctagram,
  mdiClipboardListOutline

} from '@mdi/js'

VueMdijs.add({ mdiMagnify, mdiFileDownload, mdiWhatsapp, mdiCompareHorizontal, mdiOctagram, mdiClipboardListOutline })
Vue.use(VueMdijs)
