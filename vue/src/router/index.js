import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Types from '@/views/Types.vue'
import BlockExplorer from '@/views/BlockExplorer.vue'
import GovProposal from '@/views/GovProposal.vue'
import Listing from '@/views/Listing.vue'
import MyNFT from '@/views/MyNFT.vue'
import TestNet from '@/views/TestNet.vue'
import Relayers from '@/views/Relayers.vue'

const routerHistory = createWebHistory()
const routes = [
  {
    path: '/',
    component: Index,
  },
  { path: '/types', component: Types },
  { path: '/relayers', component: Relayers },
  { path: '/block-explorer', component: BlockExplorer },
  { path: '/gov-proposal', component: GovProposal },
  { path: '/my-nft', component: MyNFT },
  { path: '/listing', component: Listing },
  { path: '/test-net', component: Listing },
  { path: '/relayers', component: TestNet },
]

const router = createRouter({
  history: routerHistory,
  routes,
})

export default router
