import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const username = ref('john_wick')

  return {
    username
  }
})
