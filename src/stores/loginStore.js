import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('loginStore', () => {
  const username = ref('john_wick')

  return {
    username
  }
})
