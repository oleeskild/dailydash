// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '~/assets/dashstyles.css'

import DefaultLayout from '~/layouts/Default.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheckSquare)
library.add(faSquare)

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('font-awesome-icon', FontAwesomeIcon)
}
