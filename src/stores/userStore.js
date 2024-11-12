import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const username = ref('')

  function setUser(newUsername) {
    username.value = newUsername
  }

  return {
    username,
    setUser,
  }
})
