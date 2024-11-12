<script setup>
import { useGeneralStore } from '@/stores'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router';

const axios = inject('axios')
const generalStore = useGeneralStore()
const username = ref('')
const password = ref('')
const router = useRouter();

function getFormData() {
  const formData = new FormData()
  formData.append('username', username.value)
  formData.append('password', password.value)

  return formData
}

function login() {
  const endPoint = '/login'
  const formData = getFormData()
  axios
    .post(endPoint, formData)
    .then((response) => {
      console.log(response)
      generalStore.setSnackbarMessage(response.data.message)
      generalStore.setSnackbarColor('success')
      router.push('/')
    })
    .catch((error) => {
      console.error(error)
      generalStore.setSnackbarMessage(error.response.data.message)
      generalStore.setSnackbarColor('error')
    })
    .finally(() => {
      generalStore.showSnackbar()
    })
}
</script>
<template>
  <v-container class="card-container">
    <v-row>
      <v-col>
        <v-card class="pa-4">
          <v-card-title class="text-center">Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field density="compact" v-model="username" type="text" label="Username" />
              <v-text-field density="compact" v-model="password" type="password" label="Password" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="elevated" color="primary" block @click="login">Login</v-btn>
          </v-card-actions>
          <v-card-text>
            <p class="text-center">Don't have an account? <router-link to="/signup">Sign up</router-link></p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.card-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
